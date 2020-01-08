import { uuid } from 'uuidv4'

const tasksService = (storage) => {
  const create = async (parent, text) => {
    if (!parent) {
      throw Error('Missing required field: parent')
    }
    if (text === undefined || text === null) {
      throw Error('Missing required field: text')
    }

    const parentTask = await storage.models.Task.getById(parent)
    if (!parentTask) {
      const parentGoal = await storage.models.Goal.getById(parent)
      if (!parentGoal) {
        throw Error(`Parent '${parent}' does not exist`)
      }
    }

    const task = {
      created: (new Date()).toISOString(),
      id: uuid(),
      parent,
      status: 'not-started',
      text
    }
    await storage.models.Task.create(task)
    return task
  }

  const _delete = async (id) => {
    if (!id) {
      throw Error('Missing required field: id')
    }

    const task = await storage.models.Task.getById(id)
    if (!task) {
      throw Error(`Task '${id}' does not exist`)
    }

    const all = await storage.models.Task.getAll()
    const tasksToDelete = getAllSubtasks(id, all).concat([id])

    // eslint-disable-next-line no-unused-vars
    for (const taskId of tasksToDelete) {
      await storage.models.Task.delete(taskId)
    }

    return tasksToDelete
  }

  const getAllSubtasks = (id, all) => {
    const mapParentToChildren = {}
    // eslint-disable-next-line no-unused-vars
    for (const t of all) {
      if (t.parent in mapParentToChildren) {
        mapParentToChildren[t.parent].push(t.id)
      } else {
        mapParentToChildren[t.parent] = [t.id]
      }
    }
    return _getAllSubtasks(id, mapParentToChildren)
  }

  const _getAllSubtasks = (id, mapParentToChildren) => {
    if (!(id in mapParentToChildren)) {
      return []
    }

    let ret = []
    // eslint-disable-next-line no-unused-vars
    for (const subtaskId of mapParentToChildren[id]) {
      ret = _getAllSubtasks(subtaskId, mapParentToChildren).concat([subtaskId]).concat(ret)
    }
    return ret
  }

  const getAll = async () => {
    return storage.models.Task.getAll()
  }

  const update = async (id, fields) => {
    const task = await storage.models.Task.getById(id)
    if (!task) {
      throw Error(`Task '${id}' does not exist`)
    }

    return storage.models.Task.update({ ...task, ...fields })
  }

  return {
    create,
    delete: _delete,
    getAll,
    getAllSubtasks,
    update
  }
}

export default tasksService

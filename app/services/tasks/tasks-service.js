import { uuid } from 'uuidv4'

const tasksService = (storage) => {
  const create = async (parent, text) => {
    if (!parent) {
      throw Error('Missing required field: parent')
    }
    if (text === undefined || text === null) {
      throw Error('Missing required field: text')
    }

    const parentTask = _getParent(parent)
    if (!parentTask) {
      throw Error(`Parent '${parent}' does not exist`)
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

  const _getParent = async (parentId) => {
    const parentTask = await storage.models.Task.getById(parentId)
    if (!parentTask) {
      const parentGoal = await storage.models.Goal.getById(parentId)
      return parentGoal
    }
    return parentTask
  }

  const _getSubtasks = async (id) => {
    const all = await storage.models.Task.getAll()
    return all.filter(t => t.parent === id)
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

  const setStatus = async (id, statusNext) => {
    const task = await storage.models.Task.getById(id)

    if (!task) {
      return
    }

    task.status = statusNext
    await storage.models.Task.update(task)
    const taskParent = await _getParent(task.parent)

    if (!taskParent) {
      return
    }

    const siblings = await _getSubtasks(taskParent.id)

    // siblings including the task itself
    if (siblings.map(s => s.status).some(status => status === 'in-progress')) {
      await setStatus(taskParent.id, 'in-progress')
    } else if (siblings.map(s => s.status).every(status => status === 'completed')) {
      await setStatus(taskParent.id, 'completed')
    } else if (siblings.map(s => s.status).every(status => status === 'not-started')) {
      await setStatus(taskParent.id, 'not-started')
    }

    return task
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
    setStatus,
    update
  }
}

export default tasksService

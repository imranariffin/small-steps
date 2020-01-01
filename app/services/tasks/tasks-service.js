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
    getAll,
    update
  }
}

export default tasksService

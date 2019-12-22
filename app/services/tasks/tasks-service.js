import storage from 'ss/services/storage'

export const tasksService = (storage) => {
  const getAll = () => {
    return storage.models.Task.getAll()
  }

  const update = async (id, newValues) => {
    const currentTask = await storage.models.Task.getById(id)
    const text = newValues.text
    currentTask.text = text
    return save(currentTask)
  }

  const save = (task) => {
    return storage.models.Task.save(task)
  }

  return {
    getAll,
    update,
    save
  }
}

export default tasksService(storage)

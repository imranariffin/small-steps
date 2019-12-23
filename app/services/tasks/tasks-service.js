import storage from 'ss/services/storage'

export const tasksService = (storage) => {
  const getAll = () => {
    return storage.models.Task.getAll()
  }

  const update = async (id, newValues) => {
    const currentTask = await storage.models.Task.getById(id)
    const newTask = { ...currentTask, ...newValues }
    return storage.models.Task.update(newTask)
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

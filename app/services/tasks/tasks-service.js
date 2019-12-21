import storage from 'ss/services/storage'

export const tasksService = (storage) => {
  const getAll = () => {
    return storage.models.Task.getAll()
  }

  return {
    getAll
  }
}

export default tasksService(storage)

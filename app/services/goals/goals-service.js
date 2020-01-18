import { uuid } from 'uuidv4'

const goalsService = storage => {
  const create = async goal => {
    if (!goal.text) {
      throw Error('Missing required field: text')
    }

    goal.created = (new Date()).toISOString()
    goal.id = uuid()
    goal.status = 'not-started'
    await storage.models.Goal.create(goal)
    return goal
  }

  const getAll = async () => {
    return storage.models.Goal.getAll()
  }

  const update = async (goalToBeUpdated) => {
    const { id, status } = goalToBeUpdated
    const goal = await storage.models.Goal.getById(id)

    if (!goal) {
      throw Error(`Goal '${id}' does not exist`)
    }

    Object.keys(goalToBeUpdated).forEach((key) => {
      if (!['status', 'text'].includes(key) && goalToBeUpdated[key] !== goal[key]) {
        throw Error(`Goal field '${key}' is not valid`)
      }
    })

    goal.status = status
    await storage.models.Goal.update(goal)
  }

  return {
    create,
    getAll,
    update
  }
}

export default goalsService

import { uuid } from 'uuidv4'

const goalsService = storage => {
  const create = async goal => {
    if (!goal.text) {
      throw Error('Missing required field: text')
    }

    goal.created = (new Date()).toISOString()
    goal.id = uuid()
    goal.status = 'not-started'
    await storage.models.Goal.save(goal)
    return goal
  }

  return {
    create
  }
}

export default goalsService

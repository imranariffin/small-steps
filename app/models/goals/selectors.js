const getGoals = state => {
  const goals = state.goals.allIds
    .map(id => state.goals.byId[id])

  goals.sort((a, b) => {
    return a.created - b.created
  })

  return goals
}

const getByTaskId = (state, taskId) => {
  const task = state.tasks.byId[taskId]
  if (!task) {
    return undefined
  }
  return state.goals.byId[task.parent]
}

export default {
  getByTaskId,
  getGoals
}

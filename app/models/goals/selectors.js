const getGoals = state => {
  const goals = state.goals.allIds
    .map(id => state.goals.byId[id])

  goals.sort((a, b) => {
    return a.created - b.created
  })

  return goals
}

export default {
  getGoals
}

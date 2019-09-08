const getGoals = state => state.goals.allIds
  .map(id => state.goals.byId[id])

export default {
  getGoals
}

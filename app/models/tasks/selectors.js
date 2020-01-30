const getByParentId = goalId => state => {
  const selectedTasks = state.tasks.allIds
    .map(taskId => state.tasks.byId[taskId])
    .filter(task => task.parent === goalId)

  selectedTasks.sort((a, b) => {
    return a.created - b.created
  })

  return selectedTasks
}

const getParentId = taskId => state => (
  (
    state.tasks.byId[taskId] &&
    state.tasks.byId[taskId].parent
  ) ||
  undefined
)

const getById = taskId => state => state.tasks.byId[taskId]

const isInnermost = (state, id) => state.tasks.allIds
  .every(_id => state.tasks.byId[_id].parent !== id)

export default {
  getByParentId,
  getById,
  getParentId,
  isInnermost
}

const getByParentId = goalId => state => {
  const selectedTasks = state.tasks.allIds
    .map(taskId => state.tasks.byId[taskId])
    .filter(task => task.parent === goalId)

  selectedTasks.sort((a, b) => {
    return a.created - b.created
  })

  return selectedTasks
}

export default {
  getByParentId
}

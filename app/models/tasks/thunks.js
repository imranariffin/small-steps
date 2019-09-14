import tasksActions from 'mg/models/tasks/actions'

const fetchTasks = () => (getState, dispatch, { client }) => {
  dispatch(tasksActions.fetchTasksRequest())

  client
    .get('https://ma-goals-api.com/v1/goals/')
    .then(response => {
      const {
        body: {
          tasks
        }
      } = response

      dispatch(tasksActions.fetchTasksSuccess(tasks))
    })
    .catch(error => {
      dispatch(tasksActions.fetchTasksFailure(error))
    })
}

export default {
  fetchTasks
}

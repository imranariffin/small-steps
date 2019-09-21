import tasksActions from 'mg/models/tasks/actions'

const fetchTasks = () => (getState, dispatch, { client }) => {
  dispatch(tasksActions.fetchTasksRequest())

  client
    .get('https://ma-goals-api.com/v1/tasks/')
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

const createTask = (text, parent) => async (getState, dispatch, { client }) => {
  const options = {
    body: {
      parent,
      text
    }
  }

  dispatch(tasksActions.createTaskRequest(text, parent))

  client
    .post('https://ma-goals-api.com/v1/tasks/', options)
    .then(response => {
      const {
        body: {
          created,
          id,
          parent,
          status,
          text
        }
      } = response

      dispatch(
        tasksActions.createTaskSuccess(created, id, parent, status, text)
      )
    })
    .catch(error => {
      dispatch(tasksActions.createTaskFailure(error))
    })
}

export default {
  createTask,
  fetchTasks
}

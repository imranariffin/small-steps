import tasksActions from 'ss/models/tasks/actions'

const fetchTasks = () => (getState, dispatch, { client }) => {
  dispatch(tasksActions.fetchTasksRequest())

  client
    .get('https://small-steps-api.com/v1/tasks/')
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
    .post('https://small-steps-api.com/v1/tasks/', options)
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

const editTaskText = (id, text) => async (getState, dispatch, { client }) => {
  const options = { body: { text } }

  dispatch(tasksActions.editTaskTextRequest(id, text))

  client
    .patch(`https://small-steps-api.com/v1/tasks/${id}/`, options)
    .then(response => {
      const {
        body: {
          id,
          text
        }
      } = response

      dispatch(
        tasksActions.editTaskTextSuccess(id, text)
      )
    })
    .catch(error => {
      dispatch(tasksActions.editTaskTextFailure(error))
    })
}

export default {
  createTask,
  editTaskText,
  fetchTasks
}

import tasksActions from 'ss/models/tasks/actions'

const fetchTasks = () => (getState, dispatch, { tasksService }) => {
  dispatch(tasksActions.fetchTasksRequest())

  tasksService
    .getAll()
    .then(tasks => {
      dispatch(tasksActions.fetchTasksSuccess(tasks))
    })
    .catch(error => {
      dispatch(tasksActions.fetchTasksFailure(error))
    })
}

const createTask = (parent, text) => async (getState, dispatch, { tasksService }) => {
  dispatch(tasksActions.createTaskRequest(parent, text))

  tasksService
    .create(parent, text)
    .then(task => {
      const {
        created,
        id,
        parent,
        status,
        text
      } = task

      dispatch(
        tasksActions.createTaskSuccess(created, id, parent, status, text)
      )
    })
    .catch(error => {
      dispatch(tasksActions.createTaskFailure(error))
    })
}

const editTaskText = (id, text) => async (getState, dispatch, { tasksService }) => {
  dispatch(tasksActions.editTaskTextRequest(id, text))

  tasksService
    .update(id, { text })
    .then(task => {
      dispatch(tasksActions.editTaskTextSuccess(id, task.text))
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

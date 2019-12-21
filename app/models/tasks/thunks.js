import tasksActions from 'ss/models/tasks/actions'
import { uuid } from 'uuidv4'

const fetchTasks = () => (getState, dispatch, { tasksService }) => {
  dispatch(tasksActions.fetchTasksRequest())
  return tasksService
    .getAll()
    .then(tasks => {
      dispatch(tasksActions.fetchTasksSuccess(tasks))
    })
    .catch(error => {
      dispatch(tasksActions.fetchTasksFailure(error))
    })
}

const createTask = (text, parent) => async (getState, dispatch, { tasksService }) => {
  const task = {
    created: (new Date()).toISOString(),
    id: uuid(),
    parent,
    status: 'not-started',
    text
  }

  dispatch(tasksActions.createTaskRequest(text, parent))

  tasksService
    .save(task)
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

  return tasksService
    .getById(id)
    .then(task => {
      task.text = text
      return tasksService.save(task)
        .then(task => {
          dispatch(tasksActions.editTaskTextSuccess(id, task.text))
        })
    })
    .catch(error => dispatch(tasksActions.editTaskTextFailure(error)))
}

export default {
  createTask,
  editTaskText,
  fetchTasks
}

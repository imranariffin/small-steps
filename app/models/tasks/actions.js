import tasksActionTypes from 'ss/models/tasks/action-types'

const fetchTasksRequest = () => (
  {
    type: tasksActionTypes.FETCH_TASKS_REQUEST,
    payload: {}
  }
)

const fetchTasksSuccess = tasks => (
  {
    type: tasksActionTypes.FETCH_TASKS_SUCCESS,
    payload: {
      tasks
    }
  }
)

const fetchTasksFailure = error => (
  {
    type: tasksActionTypes.FETCH_TASKS_FAILURE,
    payload: {
      error
    }
  }
)

const createTaskRequest = (text, parent) => (
  {
    type: tasksActionTypes.SUBMIT_TASKS_REQUEST,
    payload: {
      text,
      parent
    }
  }
)

const createTaskSuccess = (created, id, parent, status, text) => (
  {
    type: tasksActionTypes.SUBMIT_TASKS_SUCCESS,
    payload: {
      created,
      id,
      parent,
      status,
      text
    }
  }
)

const createTaskFailure = error => (
  {
    type: tasksActionTypes.SUBMIT_TASKS_FAILURE,
    payload: { error }
  }
)

export default {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  createTaskRequest,
  createTaskSuccess,
  createTaskFailure
}

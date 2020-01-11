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

const createTaskRequest = (parent, text) => (
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

const deleteTaskRequest = (id) => (
  {
    type: tasksActionTypes.DELETE_TASKS_REQUEST,
    payload: {
      id
    }
  }
)

const deleteTaskSuccess = (ids) => (
  {
    type: tasksActionTypes.DELETE_TASKS_SUCCESS,
    payload: {
      ids
    }
  }
)

const deleteTaskFailure = error => (
  {
    type: tasksActionTypes.DELETE_TASKS_FAILURE,
    payload: { error }
  }
)

const editTaskTextRequest = (id, text) => (
  {
    type: tasksActionTypes.EDIT_TEXT_TASKS_REQUEST,
    payload: {
      id,
      text
    }
  }
)

const editTaskTextSuccess = (id, text) => (
  {
    type: tasksActionTypes.EDIT_TEXT_TASKS_SUCCESS,
    payload: {
      id,
      text
    }
  }
)

const editTaskTextFailure = error => (
  {
    type: tasksActionTypes.EDIT_TEXT_TASKS_FAILURE,
    payload: { error }
  }
)

const setTaskStatusRequest = (id, status) => (
  {
    type: tasksActionTypes.SET_TASKS_STATUS_REQUEST,
    payload: {
      id,
      status
    }
  }
)

const setTaskStatusSuccess = (id, status) => (
  {
    type: tasksActionTypes.SET_TASKS_STATUS_SUCCESS,
    payload: {
      id,
      status
    }
  }
)

const setTaskStatusFailure = error => (
  {
    type: tasksActionTypes.SET_TASKS_STATUS_FAILURE,
    payload: { error }
  }
)

export default {
  deleteTaskRequest,
  deleteTaskSuccess,
  deleteTaskFailure,
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure,
  createTaskRequest,
  createTaskSuccess,
  createTaskFailure,
  editTaskTextRequest,
  editTaskTextSuccess,
  editTaskTextFailure,
  setTaskStatusRequest,
  setTaskStatusSuccess,
  setTaskStatusFailure
}

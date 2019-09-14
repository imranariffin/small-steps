import tasksActionTypes from 'mg/models/tasks/action-types'

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

export default {
  fetchTasksRequest,
  fetchTasksSuccess,
  fetchTasksFailure
}

import goalsActions from 'ss/models/goals/actions'
import tasksActionTypes from 'ss/models/tasks/action-types'

const updateStatus = (store) => (next) => (action) => {
next(action)

  if (action.type !== tasksActionTypes.SET_TASKS_STATUS_SUCCESS) {    
    return
  }

  const { payload: { statuses } } = action
  store.dispatch(goalsActions.updateStatusRequest(statuses))
}

export default {
  updateStatus
}

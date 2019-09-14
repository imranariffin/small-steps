import tasksActionTypes from 'mg/models/tasks/action-types'
import { LOADED, LOADING, NOT_LOADED } from 'mg/models/tasks/constants'

const initialState = {
  allIds: [],
  byId: {},
  status: NOT_LOADED
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case tasksActionTypes.FETCH_TASKS_REQUEST: {
      return {
        ...state,
        status: LOADING
      }
    }
    case tasksActionTypes.FETCH_TASKS_SUCCESS: {
      const {
        payload: {
          tasks
        }
      } = action
      const allIds = tasks.map(task => task.id)
      const byId = tasks.reduce((ret, task) => {
        ret[task.id] = task
        return ret
      }, {})

      return {
        allIds,
        byId,
        status: LOADED
      }
    }
    default:
      return state
  }
}

export default reducer

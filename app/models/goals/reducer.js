import { NOT_LOADED, LOADING, LOADED } from 'mg/models/goals/constants'
import goalsActionTypes from 'mg/models/goals/action-types'

const initialState = {
  byId: {},
  allIds: [],
  status: NOT_LOADED
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case goalsActionTypes.FETCH_GOALS_REQUEST: {
      return {
        byId: { ...state.byId },
        allIds: [...state.allIds],
        status: LOADING
      }
    }
    case goalsActionTypes.FETCH_GOALS_SUCCESS: {
      const {
        payload: {
          goals
        }
      } = action

      const byId = goals.reduce((ret, goal) => {
        ret[goal.id] = goal
        return ret
      }, {})
      const allIds = goals.map(goal => goal.id)

      return {
        byId,
        allIds,
        status: LOADED
      }
    }
    default:
      return state
  }
}

export default reducer

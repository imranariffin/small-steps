import { NOT_LOADED, LOADING, LOADED } from 'ss/models/goals/constants'
import goalsActionTypes from 'ss/models/goals/action-types'

const initialState = {
  byId: {},
  allIds: [],
  error: null,
  status: NOT_LOADED
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case goalsActionTypes.FETCH_GOALS_REQUEST: {
      return {
        byId: { ...state.byId },
        allIds: [...state.allIds],
        error: { ...state.error },
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
        error: null,
        status: LOADED
      }
    }
    case goalsActionTypes.FETCH_GOALS_FAILURE: {
      const {
        payload: {
          error
        }
      } = action

      return {
        byId: { ...state.byId },
        allIds: [...state.allIds],
        error,
        status: LOADED
      }
    }
    case goalsActionTypes.SUBMIT_GOALS_SUCCESS: {
      const {
        payload: {
          created,
          id,
          status,
          text
        }
      } = action

      return {
        byId: {
          ...state.byId,
          [id]: {
            created,
            id,
            status,
            text
          }
        },
        allIds: [...state.allIds, id],
        error: null,
        status: LOADED
      }
    }
    default:
      return state
  }
}

export default reducer

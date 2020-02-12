import tasksActionTypes from 'ss/tasks/action-types'
import { LOADED, LOADING, NOT_LOADED } from 'ss/tasks/constants'

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
    case tasksActionTypes.FETCH_TASKS_FAILURE: {
      const {
        payload: {
          error
        }
      } = action

      return {
        ...state,
        error,
        status: LOADED
      }
    }
    case tasksActionTypes.SUBMIT_TASKS_SUCCESS: {
      const {
        payload: {
          created,
          id,
          parent,
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
            parent,
            status,
            text
          }
        },
        allIds: [...state.allIds, id],
        error: null,
        status: LOADED
      }
    }
    case tasksActionTypes.EDIT_TEXT_TASKS_SUCCESS: {
      const {
        payload: {
          id,
          text
        }
      } = action

      return {
        byId: {
          ...state.byId,
          [id]: {
            ...state.byId[id],
            text
          }
        },
        allIds: [id].concat(state.allIds.filter(_id => _id !== id)),
        error: null,
        status: LOADED
      }
    }
    case tasksActionTypes.DELETE_TASKS_SUCCESS: {
      const {
        payload: {
          ids
        }
      } = action
      const setIds = new Set(ids)

      const nextState = {
        byId: {
          ...state.byId
        },
        allIds: state.allIds.filter(id => !setIds.has(id)),
        error: null,
        status: LOADED
      }
      ids.forEach(id => {
        delete nextState.byId[id]
      })

      return nextState
    }
    case tasksActionTypes.SET_TASKS_STATUS_SUCCESS: {
      const {
        payload: {
          statuses
        }
      } = action

      const nextState = {
        byId: { ...state.byId },
        allIds: [...state.allIds],
        error: null,
        status: LOADED
      }

      statuses.forEach(({ id, status }) => {
        nextState.byId[id].status = status
      })

      return nextState
    }
    default:
      return state
  }
}

export default reducer

import * as actionTypes from 'ss/models/migrations/action-types'

const initialState = {
  allIds: [],
  byId: {},
  connectionStatus: 'uninitiated'
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.MIGRATE_INIT: {
      const { payload: { name, script } } = action
      return {
        ...state,
        allIds: [...state.allIds, name],
        byId: {
          ...state.byId,
          [name]: { id: name, script, status: 'pending' }
        }
      }
    }
    case actionTypes.MIGRATE_SUCCESS: {
      const { payload: { name } } = action
      return {
        ...state,
        allIds: [...state.allIds],
        byId: {
          ...state.byId,
          [name]: {
            ...state.byId[name],
            status: 'completed'
          }
        }
      }
    }
    case actionTypes.MIGRATE_FAILURE: {
      const { payload: { name } } = action
      return {
        ...state,
        allIds: [...state.allIds],
        byId: {
          ...state.byId,
          [name]: {
            ...state.byId[name],
            status: 'failure'
          }
        }
      }
    }
    case actionTypes.STORAGE_SETUP_INIT: {
      return {
        ...state,
        allIds: [...state.allIds],
        byId: { ...state.byId },
        connectionStatus: 'initiating'
      }
    }
    case actionTypes.STORAGE_SETUP_SUCCESS: {
      return {
        ...state,
        allIds: [...state.allIds],
        byId: { ...state.byId },
        connectionStatus: 'connected'
      }
    }
    case actionTypes.STORAGE_SETUP_FAILURE: {
      return {
        ...state,
        allIds: [...state.allIds],
        byId: { ...state.byId },
        connectionStatus: 'failure'
      }
    }
    default:
      return state
  }
}

export default reducer

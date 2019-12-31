import * as storagesActionTypes from 'ss/models/storages/action-types'

const initialState = {
  statuses: {
    goals: 'not-initialized'
  }
}

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case storagesActionTypes.INIT_STORAGE_REQUEST: {
      return {
        ...prevState,
        statuses: {
          goals: 'initializing'
        }
      }
    }
    case storagesActionTypes.INIT_STORAGE_SUCCESS: {
      return {
        ...prevState,
        statuses: {
          goals: 'initialized'
        }
      }
    }
    case storagesActionTypes.INIT_STORAGE_FAILURE: {
      return {
        ...prevState,
        statuses: {
          goals: 'failed-initialization'
        }
      }
    }
    default:
      return prevState
  }
}

export default reducer

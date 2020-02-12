import * as storagesActionTypes from 'ss/storages/action-types'

const initialState = {
  statuses: {
    goals: 'not-initialized',
    tasks: 'not-initialized'
  }
}

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case storagesActionTypes.INIT_STORAGE_REQUEST: {
      const { payload: { key } } = action
      return {
        ...prevState,
        statuses: {
          ...prevState.statuses,
          [key]: 'initializing'
        }
      }
    }
    case storagesActionTypes.INIT_STORAGE_SUCCESS: {
      const { payload: { key } } = action
      return {
        ...prevState,
        statuses: {
          ...prevState.statuses,
          [key]: 'initialized'
        }
      }
    }
    case storagesActionTypes.INIT_STORAGE_FAILURE: {
      const { payload: { key } } = action
      return {
        ...prevState,
        statuses: {
          ...prevState.statuses,
          [key]: 'failed-initialization'
        }
      }
    }
    default:
      return prevState
  }
}

export default reducer

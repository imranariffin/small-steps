import * as storagesActionTypes from 'ss/models/storages/action-types'

const initStorageRequest = () => {
  return {
    type: storagesActionTypes.INIT_STORAGE_REQUEST,
    payload: {}
  }
}

const initStorageSuccess = () => {
  return {
    type: storagesActionTypes.INIT_STORAGE_SUCCESS,
    payload: {}
  }
}

const initStorageFailure = (error) => {
  return {
    type: storagesActionTypes.INIT_STORAGE_FAILURE,
    payload: { error }
  }
}

export default {
  initStorageRequest,
  initStorageSuccess,
  initStorageFailure
}

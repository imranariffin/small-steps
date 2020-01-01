import * as storagesActionTypes from 'ss/models/storages/action-types'

const initStorageRequest = (key) => {
  return {
    type: storagesActionTypes.INIT_STORAGE_REQUEST,
    payload: { key }
  }
}

const initStorageSuccess = (key) => {
  return {
    type: storagesActionTypes.INIT_STORAGE_SUCCESS,
    payload: { key }
  }
}

const initStorageFailure = (key, error) => {
  return {
    type: storagesActionTypes.INIT_STORAGE_FAILURE,
    payload: { key, error }
  }
}

export default {
  initStorageRequest,
  initStorageSuccess,
  initStorageFailure
}

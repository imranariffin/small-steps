import * as types from './action-types'

export const storageSetupInit = () => (
  {
    type: types.STORAGE_SETUP_INIT,
    payload: {}
  }
)

export const storageSetupSuccess = () => (
  {
    type: types.STORAGE_SETUP_SUCCESS,
    payload: {}
  }
)

export const storageSetupFailure = error => (
  {
    type: types.STORAGE_SETUP_FAILURE,
    payload: { error }
  }
)

export const migrateInit = (name, script) => (
  {
    type: types.MIGRATE_INIT,
    payload: { name, script }
  }
)

export const migrateSuccess = name => (
  {
    type: types.MIGRATE_SUCCESS,
    payload: { name }
  }
)

export const migrateFailure = (name, error) => (
  {
    type: types.MIGRATE_FAILURE,
    payload: { name, error }
  }
)

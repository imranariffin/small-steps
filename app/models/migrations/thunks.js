import migrations from 'ss/services/storage/migrations'
import * as actions from 'ss/models/migrations/actions'

const setupStorage = () => (getState, dispatch, { storage }) => {
  dispatch(actions.storageSetupInit())
  try {
    storage.setup()
    dispatch((actions.storageSetupSuccess()))
  } catch (error) {
    dispatch((actions.storageSetupFailure(error)))
  }
}

const runMigrations = () => async (getState, dispatch, { storage }) => {
  /* eslint no-unused-vars:"off" */
  for (const migration of migrations) {
    dispatch(actions.migrateInit(migration.name))
    try {
      await migration.run(storage.getDb())
      dispatch(actions.migrateSuccess(migration.name))
    } catch (error) {
      dispatch(actions.migrateFailure(migration.name, error))
      return
    }
  }
}

export default {
  setupStorage,
  runMigrations
}

import * as actions from 'ss/models/migrations/actions'
import migrations from 'ss/services/storage/migrations'

const setupStorage = () => async (getState, dispatch, { storage }) => {
  dispatch(actions.storageSetupInit())
  try {
    await storage.setup()
    dispatch((actions.storageSetupSuccess()))
  } catch (error) {
    dispatch((actions.storageSetupFailure(error)))
  }
}

const runMigrations = () => async (getState, dispatch, { storage }) => {
  /* eslint no-unused-vars:"off" */
  for (const migration of migrations) {
    const script = migration.script
      .split(' ')
      .map(x => x.trim())
      .filter(x => x)
      .map(x => x.trim())
      .join(' ')
    dispatch(actions.migrateInit(migration.name, script))
    try {
      const db = await storage.getDb()
      await migration.run(db)
      await storage.models.Migration.save(
        {
          name: migration.name,
          status: 'success'
        }
      )
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

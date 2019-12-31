import storagesActions from './actions'

const initStorage = () => async (getState, dispatch, { storage }) => {
  dispatch(storagesActions.initStorageRequest())

  try {
    await storage.models.Goal.init()
    dispatch(storagesActions.initStorageSuccess())
  } catch (error) {
    dispatch(storagesActions.initStorageFailure(error))
  }
}

export default {
  initStorage
}

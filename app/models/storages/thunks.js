import storagesActions from './actions'
import { models } from './constants'

const initStorages = () => async (getState, dispatch, { storage }) => {
  // eslint-disable-next-line no-unused-vars
  for (const model of models) {
    const key = model.toLowerCase() + 's'
    dispatch(storagesActions.initStorageRequest(key))
    try {
      await storage.models[model].init()
      dispatch(storagesActions.initStorageSuccess(key))
    } catch (error) {
      dispatch(storagesActions.initStorageFailure(key, error))
    }
  }
}

export default {
  initStorages
}

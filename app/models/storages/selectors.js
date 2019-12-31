const isStorageReady = (state, model) => state.storages.statuses[model] === 'initialized'

export default {
  isStorageReady
}

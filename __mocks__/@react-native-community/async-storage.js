module.exports = (() => {
  let _storage = {}
  return {
    clear: () => {
      _storage = {}
      return Promise.resolve()
    },
    getItem: (key) => {
      if (!(key in _storage)) {
        return Promise.resolve(null)
      }
      return Promise.resolve(_storage[key])
    },
    setItem: (key, value) => {
      if (typeof value !== 'string') {
        throw Error()
      }
      _storage[key] = value
      return Promise.resolve()
    }
  }
})()
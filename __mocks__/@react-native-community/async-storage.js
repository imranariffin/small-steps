/* eslint-env jest */

module.exports = (() => {
  let _storage = {}
  return {
    clear: jest.fn(() => {
      _storage = {}
      return Promise.resolve()
    }),
    getItem: jest.fn((key) => {
      if (!(key in _storage)) {
        return Promise.resolve(null)
      }
      return Promise.resolve(_storage[key])
    }),
    setItem: jest.fn((key, value) => {
      if (typeof value !== 'string') {
        throw Error()
      }
      _storage[key] = value
      return Promise.resolve()
    })
  }
})()

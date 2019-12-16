/* eslint-env jest */

import SQLite from 'react-native-sqlite-storage'

import logger from 'ss/services/logger'
import storage from 'ss/services/storage'

jest.mock('ss/services/logger', () => {
  return { log: jest.fn() }
})
jest.mock('react-native-config', () => {
  return { NODE_ENV: 'test' }
})
jest.mock('react-native-sqlite-storage', () => {
  return { openDatabase: jest.fn() }
})

describe('storage service setup', () => {
  beforeEach(() => {
    SQLite.openDatabase.mockClear()
    logger.log.mockClear()
  })

  test('setup successfully', () => {
    SQLite.openDatabase = jest.fn(() => 'some-db')
    storage.setup()

    expect(SQLite.openDatabase.mock.calls).toEqual([
      [
        {
          androidDatabaseProvider: 'system',
          location: 'default',
          name: 'small-steps-test.db'
        }
      ]
    ])
    expect(logger.log.mock.calls).toEqual([['Connected to db:', 'some-db']])
  })

  test('setup fails', () => {
    const error = Error('some-error')
    SQLite.openDatabase = jest.fn(() => { throw error })

    expect(storage.setup).toThrow(error)
  })
})

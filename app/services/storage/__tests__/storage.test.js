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
  return {
    DEBUG: jest.fn(),
    enablePromise: jest.fn(),
    openDatabase: jest.fn(() => Promise.resolve())
  }
})

describe('storage service setup', () => {
  beforeEach(() => {
    SQLite.openDatabase.mockClear()
    logger.log.mockClear()
  })

  test('setup successfully', async () => {
    SQLite.openDatabase = jest.fn(() => Promise.resolve('some-db'))

    await storage.setup()

    expect(SQLite.openDatabase.mock.calls).toEqual([
      [
        {
          androidDatabaseProvider: 'system',
          location: 'default',
          name: 'small-steps-test.db'
        }
      ]
    ])
    expect(logger.log.mock.calls).toEqual([
      ['Opened db connection: \'some-db\'.', 'Lasts for at least', '15000 ms']
    ])
  })

  test('setup fails', async () => {
    const error = Error('some-error')
    SQLite.openDatabase = jest.fn(() => Promise.reject(error))

    await expect(storage.setup()).rejects.toThrow(error)
  })
})

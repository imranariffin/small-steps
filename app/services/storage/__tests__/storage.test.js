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
jest.useFakeTimers()

describe('storage service setup', () => {
  beforeEach(() => {
    const db = { close: jest.fn() }
    SQLite.openDatabase = jest.fn(() => Promise.resolve(db))
    logger.log.mockClear()
    jest.runAllTimers()
    jest.spyOn(global, 'setTimeout').mockClear()
    jest.spyOn(global, 'clearTimeout').mockClear()
  })

  test('setup successfully', async () => {
    const mockDb = { close: jest.fn() }
    SQLite.openDatabase = jest.fn(() => Promise.resolve(mockDb))
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
      [`Opened db connection: '${mockDb}'.`, 'Lasts for at least', '15000 ms']
    ])
  })

  test('get db connection successfully', async () => {
    const mockDb = { close: jest.fn() }
    SQLite.openDatabase = jest.fn(() => Promise.resolve(mockDb))

    const db = await storage.getDb()

    expect(SQLite.openDatabase.mock.calls).toEqual([
      [
        {
          androidDatabaseProvider: 'system',
          location: 'default',
          name: 'small-steps-test.db'
        }
      ]
    ])
    expect(db).toEqual(mockDb)
  })

  test('setup fails', async () => {
    const error = Error('some-error')
    SQLite.openDatabase = jest.fn(() => Promise.reject(error))

    await expect(storage.setup()).rejects.toThrow(error)
  })

  test('get db connection fails', async () => {
    const error = Error('some-error')
    SQLite.openDatabase = jest.fn(() => Promise.reject(error))

    await expect(storage.getDb()).rejects.toThrow(error)
  })

  test('auto-close db connection within a fixed time if unused', async () => {
    const db = { close: jest.fn() }
    SQLite.openDatabase = jest.fn(() => Promise.resolve(db))

    await storage.setup({ timeout: 100 })

    expect(global.setTimeout.mock.calls.length).toEqual(1)

    jest.runAllTimers()

    expect(db.close.mock.calls.length).toEqual(1)
  })

  test('re-use same db connection & delay auto-close', async () => {
    const db = { close: jest.fn() }
    SQLite.openDatabase = jest.fn(() => Promise.resolve(db))

    await storage.setup({ timeout: 100 })
    await storage.getDb()
    await storage.getDb()
    await storage.getDb()

    expect(global.setTimeout.mock.calls.length).toEqual(4)

    jest.runAllTimers()

    expect(global.clearTimeout.mock.calls.length).toEqual(4)
    expect(db.close.mock.calls.length).toEqual(1)
  })
})

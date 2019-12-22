/* eslint-env jest */

import SQLite from 'react-native-sqlite-storage'

import { storage as createStorage } from 'ss/services/storage/storage'

jest.mock('react-native-config', () => {
  return {
    NODE_ENV: 'test'
  }
})
jest.mock('ss/services/logger', () => {
  return {
    log: jest.fn()
  }
})

describe('storage models Task', () => {
  let db, createMockExecuteSql, tx

  beforeEach(() => {
    tx = { executeSql: jest.fn() }
    db = { transaction: jest.fn() }
    createMockExecuteSql = (mockTasks) => jest.fn(() => {
      return Promise.resolve(
        [
          'some-transaction-info',
          {
            rows: {
              item: jest.fn((i) => {
                return mockTasks[i]
              }),
              length: mockTasks.length
            }
          },
        ]
      )
    })
    SQLite.openDatabase = jest.fn(() => Promise.resolve(db))
  })

  test('get all success', async () => {
    db.transaction = jest.fn((callback) => {
      mockTasks = ['some-task-0', 'some-task-1', 'some-task-2']
      tx.executeSql = createMockExecuteSql(mockTasks)
      callback(tx)
    })
    SQLite.openDatabase = jest.fn(() => Promise.resolve(db))
    const storage = createStorage()

    const tasks = await storage.models.Task.getAll()

    expect(tasks).toEqual(['some-task-0', 'some-task-1', 'some-task-2'])
    expect(tx.executeSql.mock.calls.length).toEqual(1)
    expect(SQLite.openDatabase.mock.calls.length).toEqual(1)
  })

  test('get all transaction failure', async () => {
    db.transaction = jest.fn(() => {
      throw Error('some-error')
    })
    SQLite.openDatabase = jest.fn(() => Promise.resolve(db))
    const storage = createStorage()

    const badPromise = storage.models.Task.getAll()

    await expect(badPromise).rejects.toThrow(Error('some-error'))
    expect(SQLite.openDatabase.mock.calls.length).toEqual(1)
  })

  test('get all executeSql failure', async () => {
    db.transaction = jest.fn((callback) => {
      tx.executeSql = jest.fn(() => {
        throw Error('some-error')
      })
      callback(tx)
    })
    SQLite.openDatabase = jest.fn(() => Promise.resolve(db))
    const storage = createStorage()

    const badPromise = storage.models.Task.getAll()

    await expect(badPromise).rejects.toThrow(Error('some-error'))
    expect(SQLite.openDatabase.mock.calls.length).toEqual(1)
  })
})

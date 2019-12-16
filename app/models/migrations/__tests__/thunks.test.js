/* eslint-env jest */

import migrationsThunks from 'ss/models/migrations/thunks'
import logger from 'ss/services/logger'

jest.mock('react-native-config')
jest.mock('ss/services/logger', () => {
  return {
    log: jest.fn()
  }
})

describe('runMigrations thunks', () => {
  let db, dispatch, getState, storage, tx

  beforeEach(() => {
    tx = {
      executeSql: jest.fn()
    }
    db = {
      transaction: jest.fn((execCallback, errCallback, successCallback) => {
        execCallback(tx)
        successCallback()
      })
    }
    dispatch = jest.fn()
    logger.log.mockClear()
    getState = jest.fn()
    storage = {
      getDb: () => db,
      models: {
        Goal: {
          save: Promise.resolve()
        },
        Task: {
          save: Promise.resolve()
        }
      }
    }
  })

  test('successful migration script', async () => {
    await migrationsThunks.runMigrations()(getState, dispatch, { storage })

    expect(dispatch.mock.calls).toEqual([
      [{ type: 'ss/migrations/MIGRATE_INIT', payload: { name: 'goals-0001-create-table' } }],
      [{ type: 'ss/migrations/MIGRATE_SUCCESS', payload: { name: 'goals-0001-create-table' } }],
      [{ type: 'ss/migrations/MIGRATE_INIT', payload: { name: 'tasks-0001-create-table' } }],
      [{ type: 'ss/migrations/MIGRATE_SUCCESS', payload: { name: 'tasks-0001-create-table' } }]
    ])
    expect(logger.log.mock.calls).toEqual([
      ['Migration: goals-0001-create-table: Transaction start'],
      ['Migration: goals-0001-create-table: Transaction success'],
      ['Migration: tasks-0001-create-table: Transaction start'],
      ['Migration: tasks-0001-create-table: Transaction success']
    ])
  })

  test('the first migration script fails', async () => {
    const error = Error('some-error-message')
    db = {
      transaction: jest.fn((execCallback, errCallback) => {
        execCallback(tx)
        errCallback(error)
      })
    }
    storage.getDb = jest.fn(() => db)

    await migrationsThunks.runMigrations()(getState, dispatch, { storage })

    expect(dispatch.mock.calls).toEqual([
      [{ type: 'ss/migrations/MIGRATE_INIT', payload: { name: 'goals-0001-create-table' } }],
      [{
        type: 'ss/migrations/MIGRATE_FAILURE',
        payload: { name: 'goals-0001-create-table', error: Error('some-error-message') }
      }]
    ])
    expect(logger.log.mock.calls).toEqual([
      ['Migration: goals-0001-create-table: Transaction start'],
      ['Migration: goals-0001-create-table: Transaction failure', error]
    ])
  })
})

describe('storageInit thunks', () => {
  let dispatch, getState, storage

  beforeEach(() => {
    dispatch = jest.fn()
    getState = jest.fn()
    storage = {
      setup: jest.fn()
    }
  })

  test('setup storage successfully', () => {
    migrationsThunks.setupStorage()(getState, dispatch, { storage })

    expect(dispatch.mock.calls).toEqual([
      [{ type: 'ss/migrations/STORAGE_SETUP_INIT', payload: {} }],
      [{ type: 'ss/migrations/STORAGE_SETUP_SUCCESS', payload: {} }]
    ])
  })

  test('setup storage fails', () => {
    const error = Error('some-error')
    storage.setup = jest.fn(() => { throw error })

    migrationsThunks.setupStorage()(getState, dispatch, { storage })

    expect(dispatch.mock.calls).toEqual([
      [{ type: 'ss/migrations/STORAGE_SETUP_INIT', payload: {} }],
      [{ type: 'ss/migrations/STORAGE_SETUP_FAILURE', payload: { error } }]
    ])
  })
})

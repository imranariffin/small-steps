/* eslint-env jest */

import reducer from 'ss/models/migrations/reducer'

describe('migrations reducer', () => {
  let prevState

  beforeEach(() => {
    prevState = {
      allIds: ['some-migration-001'],
      byId: {
        'some-migration-001': {
          id: 'some-migration-001',
          script: 'some-script-001',
          status: 'completed'
        }
      },
      connectionStatus: 'uninitiated'
    }
  })

  test('initial state', () => {
    const action = {}
    const prevState = undefined

    const state = reducer(prevState, action)

    expect(state).toEqual(
      {
        allIds: [],
        byId: {},
        connectionStatus: 'uninitiated'
      }
    )
  })

  test('action is ss/migrations/MIGRATE_INIT', () => {
    const action = {
      type: 'ss/migrations/MIGRATE_INIT',
      payload: { name: 'some-migration-002', script: 'some-script-002' }
    }

    const state = reducer(prevState, action)

    expect(state).toEqual(
      {
        allIds: ['some-migration-001', 'some-migration-002'],
        byId: {
          'some-migration-001': {
            id: 'some-migration-001',
            script: 'some-script-001',
            status: 'completed'
          },
          'some-migration-002': {
            id: 'some-migration-002',
            script: 'some-script-002',
            status: 'pending'
          }
        },
        connectionStatus: 'uninitiated'
      }
    )
  })

  test('action is ss/migrations/MIGRATE_SUCCESS', () => {
    prevState.byId['some-migration-001'].status = 'pending'
    const action = {
      type: 'ss/migrations/MIGRATE_SUCCESS',
      payload: { name: 'some-migration-001' }
    }

    const state = reducer(prevState, action)

    expect(state).toEqual(
      {
        allIds: ['some-migration-001'],
        byId: {
          'some-migration-001': {
            id: 'some-migration-001',
            script: 'some-script-001',
            status: 'completed'
          }
        },
        connectionStatus: 'uninitiated'
      }
    )
  })

  test('action is ss/migrations/MIGRATE_FAILURE', () => {
    prevState.byId['some-migration-001'].status = 'pending'
    const action = {
      type: 'ss/migrations/MIGRATE_FAILURE',
      payload: { name: 'some-migration-001' }
    }

    const state = reducer(prevState, action)

    expect(state).toEqual(
      {
        allIds: ['some-migration-001'],
        byId: {
          'some-migration-001': {
            id: 'some-migration-001',
            script: 'some-script-001',
            status: 'failure'
          }
        },
        connectionStatus: 'uninitiated'
      }
    )
  })

  test('action is ss/migrations/STORAGE_SETUP_INIT', () => {
    const action = {
      type: 'ss/migrations/STORAGE_SETUP_INIT',
      payload: { name: 'some-migration-001' }
    }

    const state = reducer(prevState, action)

    expect(state).toEqual(
      {
        allIds: ['some-migration-001'],
        byId: {
          'some-migration-001': {
            id: 'some-migration-001',
            script: 'some-script-001',
            status: 'completed'
          }
        },
        connectionStatus: 'initiating'
      }
    )
  })

  test('action is ss/migrations/STORAGE_SETUP_SUCCESS', () => {
    const action = {
      type: 'ss/migrations/STORAGE_SETUP_SUCCESS',
      payload: { name: 'some-migration-001' }
    }

    const state = reducer(prevState, action)

    expect(state).toEqual(
      {
        allIds: ['some-migration-001'],
        byId: {
          'some-migration-001': {
            id: 'some-migration-001',
            script: 'some-script-001',
            status: 'completed'
          }
        },
        connectionStatus: 'connected'
      }
    )
  })

  test('action is ss/migrations/STORAGE_SETUP_FAILURE', () => {
    const action = {
      type: 'ss/migrations/STORAGE_SETUP_FAILURE',
      payload: { name: 'some-migration-001' }
    }

    const state = reducer(prevState, action)

    expect(state).toEqual(
      {
        allIds: ['some-migration-001'],
        byId: {
          'some-migration-001': {
            id: 'some-migration-001',
            script: 'some-script-001',
            status: 'completed'
          }
        },
        connectionStatus: 'failure'
      }
    )
  })
})

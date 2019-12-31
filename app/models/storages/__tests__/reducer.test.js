/* eslint-env jest */

import reducer from 'ss/models/storages/reducer'

describe('storages reducer', () => {
  let action, prevState

  beforeEach(() => {
    action = {}
    prevState = {
      statuses: {
        goals: 'not-initialized'
      }
    }
  })

  test('initial state', () => {
    const state = reducer(undefined, action)

    expect(state).toEqual(
      {
        statuses: {
          goals: 'not-initialized'
        }
      }
    )
  })

  test('storage init request', () => {
    action = { type: 'ss/storages/INIT_STORAGE_REQUEST', payload: {} }

    const state = reducer(prevState, action)

    expect(state).toEqual(
      {
        statuses: {
          goals: 'initializing'
        }
      }
    )
  })

  test('storage init success', () => {
    action = { type: 'ss/storages/INIT_STORAGE_SUCCESS', payload: {} }

    const state = reducer(prevState, action)

    expect(state).toEqual(
      {
        statuses: {
          goals: 'initialized'
        }
      }
    )
  })

  test('storage init failure', () => {
    action = { type: 'ss/storages/INIT_STORAGE_FAILURE', payload: {} }

    const state = reducer(prevState, action)

    expect(state).toEqual(
      {
        statuses: {
          goals: 'failed-initialization'
        }
      }
    )
  })
})

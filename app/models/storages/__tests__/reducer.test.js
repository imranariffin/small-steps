/* eslint-env jest */

import reducer from 'ss/models/storages/reducer'

describe('storages reducer', () => {
  let action, prevState

  beforeEach(() => {
    action = {}
    prevState = {
      statuses: {
        goals: 'not-initialized',
        tasks: 'not-initialized'
      }
    }
  })

  test('initial state', () => {
    const state = reducer(undefined, action)

    expect(state).toEqual(
      {
        statuses: {
          goals: 'not-initialized',
          tasks: 'not-initialized'
        }
      }
    )
  })

  const testCases = [
    { model: 'Goal', key: 'goals' },
    { model: 'Task', key: 'tasks' }
  ]
  testCases.forEach(({ model, key }) => {
    test(`storage init request ${model}`, () => {
      action = { type: 'ss/storages/INIT_STORAGE_REQUEST', payload: { key } }

      const state = reducer(prevState, action)

      expect(state).toEqual(
        {
          statuses: {
            goals: 'not-initialized',
            tasks: 'not-initialized',
            [key]: 'initializing'
          }
        }
      )
    })

    test(`storage init success ${model}`, () => {
      action = { type: 'ss/storages/INIT_STORAGE_SUCCESS', payload: { key } }

      const state = reducer(prevState, action)

      expect(state).toEqual(
        {
          statuses: {
            goals: 'not-initialized',
            tasks: 'not-initialized',
            [key]: 'initialized'
          }
        }
      )
    })

    test(`storage init failure ${model}`, () => {
      action = { type: 'ss/storages/INIT_STORAGE_FAILURE', payload: { key } }

      const state = reducer(prevState, action)

      expect(state).toEqual(
        {
          statuses: {
            goals: 'not-initialized',
            tasks: 'not-initialized',
            [key]: 'failed-initialization'
          }
        }
      )
    })
  })
})

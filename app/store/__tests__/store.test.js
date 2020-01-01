/* eslint-env jest */

import client from 'ss/services/client'
import goalsService from 'ss/services/goals'
import logger from 'ss/services/logger'
import storage from 'ss/services/storage'
import tasksService from 'ss/services/tasks'
import store from 'ss/store'

jest.mock('ss/services/client', () => {
  return { get: jest.fn() }
})
jest.mock('ss/services/goals', () => {
  return {
    someMethod: jest.fn()
  }
})
jest.mock('ss/services/logger', () => {
  return {
    log: jest.fn()
  }
})
jest.mock('ss/services/storage', () => {
  return {
    models: {
      Goal: {
        someMethod: jest.fn()
      }
    }
  }
})
jest.mock('ss/services/tasks', () => {
  return {
    someMethod: jest.fn()
  }
})

describe('store', () => {
  test('thunk middleware is installed with goals service', () => {
    const action = (getState, dispatch, { goalsService }) => {
      goalsService.someMethod()
    }
    const thunkedAction = jest.fn(() => action)

    store.dispatch(thunkedAction())

    expect(goalsService.someMethod.mock.calls).toEqual([[]])
  })

  test('thunk middleware is installed with client service', () => {
    const action = (getState, dispatch, { client }) => {
      client.get()
    }
    const thunkedAction = jest.fn(() => action)

    store.dispatch(thunkedAction())

    expect(client.get).toHaveBeenCalledTimes(1)
  })

  test('logger middleware is installed with logger', () => {
    const action = { type: 'some-action-type' }
    jest.spyOn(store, 'dispatch')

    store.dispatch(action)

    expect(logger.log).toHaveBeenCalled()
    expect(store.dispatch.mock.calls).toEqual([[{ type: 'some-action-type' }]])
  })

  test('thunk middleware is installed with storage service', () => {
    const action = (getState, dispatch, { storage }) => {
      storage.models.Goal.someMethod()
    }
    const thunkedAction = jest.fn(() => action)

    store.dispatch(thunkedAction())

    expect(storage.models.Goal.someMethod).toHaveBeenCalledTimes(1)
  })

  test('thunk middleware is installed with tasks service', () => {
    const action = (getState, dispatch, { tasksService }) => {
      tasksService.someMethod()
    }
    const thunkedAction = jest.fn(() => action)

    store.dispatch(thunkedAction())

    expect(tasksService.someMethod.mock.calls).toEqual([[]])
  })
})

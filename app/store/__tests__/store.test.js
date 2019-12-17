/* eslint-env jest */

import client from 'ss/services/client'
import goalsService from 'ss/services/goals'
import logger from 'ss/services/logger'
import storage from 'ss/services/storage'
import store from 'ss/store'

jest.mock('ss/services/client', () => {
  return { get: jest.fn() }
})

jest.mock('ss/services/goals', () => {
  return {
    models: {
      Goal: {
        save: jest.fn()
      }
    }
  }
})
jest.mock('ss/services/logger', () => {
  return { log: jest.fn() }
})
jest.mock('ss/services/storage', () => {
  return { setup: jest.fn() }
})

describe('store', () => {
  test('thunk middleware is installed with goals service', () => {
    const action = (getState, dispatch, { goalsService }) => {
      goalsService.models.Goal.save()
    }
    const thunkedAction = jest.fn(() => action)

    store.dispatch(thunkedAction())

    expect(goalsService.models.Goal.save).toHaveBeenCalledTimes(1)
  })

  test('thunk middleware is installed with client service', () => {
    const action = (getState, dispatch, { client }) => {
      client.get()
    }
    const thunkedAction = jest.fn(() => action)

    store.dispatch(thunkedAction())

    expect(client.get).toHaveBeenCalledTimes(1)
  })

  test('thunk middleware is installed with storage service', async () => {
    const action = async (getState, dispatch, { storage }) => {
      await storage.setup()
    }
    const thunkedAction = jest.fn(() => action)

    await store.dispatch(thunkedAction())

    expect(storage.setup).toHaveBeenCalledTimes(1)
  })

  test('logger middleware is installed with logger', () => {
    const action = { type: 'some-action-type' }
    jest.spyOn(store, 'dispatch')

    store.dispatch(action)

    expect(logger.log).toHaveBeenCalled()
    expect(store.dispatch.mock.calls).toEqual([[{ type: 'some-action-type' }]])
  })
})

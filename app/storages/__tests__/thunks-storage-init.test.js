/* eslint-env jest */

import storagesActions from 'ss/storages/actions'
import storagesThunks from 'ss/storages/thunks'
import { models } from 'ss/storages/constants'

describe('app thunk storage init', () => {
  let getState, dispatch, storage

  beforeEach(() => {
    getState = jest.fn()
    dispatch = jest.fn()
    storage = {
      models: {
        Goal: {
          init: jest.fn(() => Promise.resolve())
        },
        Task: {
          init: jest.fn(() => Promise.resolve())
        }
      }
    }
  })

  test('calls correct storage methods', async () => {
    await storagesThunks.initStorages()(getState, dispatch, { storage })

    // eslint-disable-next-line no-unused-vars
    for (const model of models) {
      expect(storage.models[model].init.mock.calls).toEqual([[]])
    }
  })

  test('successful storage init', async () => {
    await storagesThunks.initStorages()(getState, dispatch, { storage })

    expect(dispatch.mock.calls).toEqual([
      [storagesActions.initStorageRequest('goals')],
      [storagesActions.initStorageSuccess('goals')],
      [storagesActions.initStorageRequest('tasks')],
      [storagesActions.initStorageSuccess('tasks')]
    ])
  })

  test('failed Goal storage init', async () => {
    storage.models.Goal.init = jest.fn(
      () => Promise.reject(Error('some-storage-error'))
    )

    await storagesThunks.initStorages()(getState, dispatch, { storage })

    expect(dispatch.mock.calls).toEqual([
      [storagesActions.initStorageRequest('goals')],
      [storagesActions.initStorageFailure('goals', Error('some-storage-error'))],
      [storagesActions.initStorageRequest('tasks')],
      [storagesActions.initStorageSuccess('tasks')]
    ])
  })

  test('failed Task storage init', async () => {
    storage.models.Task.init = jest.fn(
      () => Promise.reject(Error('some-storage-error'))
    )

    await storagesThunks.initStorages()(getState, dispatch, { storage })

    expect(dispatch.mock.calls).toEqual([
      [storagesActions.initStorageRequest('goals')],
      [storagesActions.initStorageSuccess('goals')],
      [storagesActions.initStorageRequest('tasks')],
      [storagesActions.initStorageFailure('tasks', Error('some-storage-error'))]
    ])
  })
})

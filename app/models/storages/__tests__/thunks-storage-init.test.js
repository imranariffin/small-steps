/* eslint-env jest */

import storagesActions from 'ss/models/storages/actions'
import storagesThunks from 'ss/models/storages/thunks'

describe('app thunk storage init', () => {
  let getState, dispatch, storage

  beforeEach(() => {
    getState = jest.fn()
    dispatch = jest.fn()
    storage = {
      models: {
        Goal: {
          init: jest.fn()
        }
      }
    }
  })

  test('calls correct storage methods', async () => {
    await storagesThunks.initStorage()(getState, dispatch, { storage })

    expect(storage.models.Goal.init.mock.calls).toEqual([[]])
  })

  test('successful storage init', async () => {
    storage.models.Goal.init = jest.fn(() => Promise.resolve())

    await storagesThunks.initStorage()(getState, dispatch, { storage })

    expect(dispatch.mock.calls).toEqual([
      [storagesActions.initStorageRequest()],
      [storagesActions.initStorageSuccess()]
    ])
  })

  test('failed storage init', async () => {
    storage.models.Goal.init = jest.fn(
      () => Promise.reject(Error('some-storage-error'))
    )

    await storagesThunks.initStorage()(getState, dispatch, { storage })

    expect(dispatch.mock.calls).toEqual([
      [storagesActions.initStorageRequest()],
      [storagesActions.initStorageFailure(Error('some-storage-error'))]
    ])
  })
})

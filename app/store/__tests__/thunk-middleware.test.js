/* eslint-env jest */

import thunk from 'ss/store/thunk-middleware'

describe('thunk middleware', () => {
  let services, store, next, action

  beforeEach(() => {
    services = {}
    store = { dispatch: jest.fn(), getState: jest.fn() }
    next = jest.fn(action => action)
    action = {}
  })

  test('action is a function', async () => {
    action = jest.fn()

    await thunk(services)(store)(next)(action)

    expect(next.mock.calls).toEqual([])
    expect(action.mock.calls).toEqual(
      [
        [store.getState, store.dispatch, services]
      ]
    )
  })

  test('action is an object', async () => {
    action = { type: 'some-action-type' }

    const result = await thunk(services)(store)(next)(action)

    expect(next.mock.calls).toEqual([[action]])
    expect(result).toEqual(next.mock.results[0].value)
    expect(result).toEqual(action)
  })
})

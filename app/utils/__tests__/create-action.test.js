/* eslint-env jest */

import createAction from 'ss/utils/create-action'

describe('utils createAction', () => {
  test('empty actions', () => {
    const action = createAction('some/action/NAME')

    expect(action.init('some-arg')).toEqual({ type: 'some/action/NAME_REQUEST', payload: {} })
    expect(action.success('some-arg')).toEqual({ type: 'some/action/NAME_SUCCESS', payload: {} })
    expect(action.failure('some-arg')).toEqual({ type: 'some/action/NAME_FAILURE', payload: {} })
  })

  test('well defined actions', () => {
    const action = createAction('some/action/NAME', {
      init: (arg1, arg2) => ({ arg1, arg2 }),
      success: (arg1, arg2) => ({ arg1, arg2 }),
      failure: (arg1, arg2) => ({ arg1, arg2 }),
    })

    expect(action.init('some-arg', [])).toEqual(
      { type: 'some/action/NAME_REQUEST', payload: { arg1: 'some-arg', arg2: [] } }
    )
    expect(action.success(1, {})).toEqual(
      { type: 'some/action/NAME_SUCCESS', payload: { arg1: 1, arg2: {} } }
    )
    expect(action.failure('some-arg', Error('some-error'))).toEqual(
      {
        type: 'some/action/NAME_FAILURE',
        payload: { arg1: 'some-arg', arg2: Error('some-error') }
      }
    )
  })
})

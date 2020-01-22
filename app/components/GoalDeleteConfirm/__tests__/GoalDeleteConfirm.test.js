/* eslint-env jest */

import { mount } from 'enzyme'

import { mapDispatchToProps, mapStateToProps } from 'ss/components/GoalDeleteConfirm/presenters'
import GoalDeleteConfirm from 'ss/components/GoalDeleteConfirm/GoalDeleteConfirm'
import formsActions from 'ss/models/forms/actions'
import store from 'ss/store'

jest.mock('@react-native-community/async-storage', () => {
  return {}
})
jest.mock('ss/models/goals/thunks', () => ({
  deleteGoal: () => 'some-delete-goal-thunk'
}))

describe('GoalDeleteConfirm', () => {
  let dispatch, state

  beforeEach(() => {
    state = store.getState()
    dispatch = jest.fn()
  })

  test('provide all required props', () => {
    const props = {
      ...mapStateToProps(state),
      ...mapDispatchToProps(dispatch)
    }
    jest.spyOn(window.console, 'error')

    mount(<GoalDeleteConfirm {...props} />)

    expect(window.console.error.mock.calls).toEqual([])
  })

  test('handleDeleteItem', () => {
    const { handleDeleteItem } = mapDispatchToProps(dispatch)

    handleDeleteItem('some-goal-id')

    expect(dispatch.mock.calls).toEqual([
      ['some-delete-goal-thunk'],
      [formsActions.formsDeactivate('goal-delete')],
      [formsActions.formsActivate('goal-add')]
    ])
  })
})

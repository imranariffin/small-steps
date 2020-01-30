/* eslint-env jest */

import { shallow } from 'enzyme'

import { mapDispatchToProps, mapStateToProps } from 'ss/components/TaskDeleteConfirm/presenters'
import TaskDeleteConfirm from 'ss/components/TaskDeleteConfirm/TaskDeleteConfirm'
import formsActions from 'ss/models/forms/actions'
import store from 'ss/store'

jest.mock('@react-native-community/async-storage', () => {
  return {}
})
jest.mock('ss/models/tasks/thunks', () => ({
  deleteTask: () => 'some-delete-task-thunk'
}))

describe('TaskDeleteConfirm presenters', () => {
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

    shallow(<TaskDeleteConfirm {...props} />)

    expect(window.console.error.mock.calls).toEqual([])
  })

  test('handleDeleteItem', () => {
    const { handleDeleteItem } = mapDispatchToProps(dispatch)

    handleDeleteItem('some-task-id')

    expect(dispatch.mock.calls).toEqual([
      ['some-delete-task-thunk'],
      [formsActions.formsDeactivate('task-delete')],
      [formsActions.formsActivate('goal-add')]
    ])
  })

  test('handle click cancel', () => {
    const { handleClickCancel } = mapDispatchToProps(dispatch)

    handleClickCancel()

    expect(dispatch.mock.calls).toEqual([
      [formsActions.formsDeactivate('task-delete')],
      [formsActions.formsActivate('goal-add')]
    ])
  })
})

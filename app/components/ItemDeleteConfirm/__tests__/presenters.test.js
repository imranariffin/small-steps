/* eslint-env jest */

import { shallow } from 'enzyme'

import { mapDispatchToProps, mapStateToProps } from 'ss/components/ItemDeleteConfirm/presenters'
import ItemDeleteConfirm from 'ss/components/ItemDeleteConfirm/ItemDeleteConfirm'
import formsActions from 'ss/models/forms/actions'
import store from 'ss/store'

jest.mock('@react-native-community/async-storage', () => {
  return {}
})
jest.mock('ss/models/tasks/thunks', () => ({
  deleteTask: () => 'some-delete-task-thunk'
}))

describe('ItemDeleteConfirm presenters', () => {
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

    shallow(<ItemDeleteConfirm {...props} />)

    expect(window.console.error.mock.calls).toEqual([])
  })

  test('handleDeleteTask', () => {
    const { handleDeleteTask } = mapDispatchToProps(dispatch)

    handleDeleteTask('some-task-id')

    expect(dispatch.mock.calls).toEqual([
      ['some-delete-task-thunk'],
      [formsActions.formsDeactivate('task-delete')],
      [formsActions.formsActivate('goal-add')]
    ])
  })
})

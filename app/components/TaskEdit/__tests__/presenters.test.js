/* eslint-env jest */

import { mapDispatchToProps } from '../presenters'

import formsActions from 'ss/models/forms/actions'
import tasksThunks from 'ss/models/tasks/thunks'

jest.mock('ss/models/tasks/thunks', () => (
  {
    editTaskText: jest.fn((id, text) => ({ id, text }))
  }
))

describe('TaskEdit mapDispatchToProps', () => {
  let dispatch

  beforeEach(() => {
    dispatch = jest.fn()
  })

  describe('handleSubmit', () => {
    it('should dispatch correct action', () => {
      const props = mapDispatchToProps(dispatch)

      props.handleSubmit('task-id', 'some-text')

      expect(dispatch.mock.calls[0][0]).toEqual(
        tasksThunks.editTaskText('task-id', 'some-text')
      )
      expect(dispatch.mock.calls[1][0]).toEqual(
        formsActions.formsDeactivate('task-edit')
      )
      expect(dispatch.mock.calls[2][0]).toEqual(
        formsActions.formsActivate('goal-add')
      )
    })
  })
})

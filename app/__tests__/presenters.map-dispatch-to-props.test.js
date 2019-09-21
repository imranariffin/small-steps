/* eslint-env jest */

import { mapDispatchToProps } from 'mg/presenters'
import appActions from 'mg/models/app/actions'
import formsActions from 'mg/models/forms/actions'
import goalsThunks from 'mg/models/goals/thunks'
import tasksThunks from 'mg/models/tasks/thunks'

jest.mock('mg/models/goals/thunks', () => (
  {
    fetchGoals: jest.fn(() => 'some-thunked-action-1')
  }
))
jest.mock('mg/models/tasks/thunks', () => (
  {
    fetchTasks: jest.fn(() => 'some-thunked-action-2')
  }
))

describe('App presenters mapDispatchToProps', () => {
  let dispatch

  beforeEach(() => {
    dispatch = jest.fn(action => action)
  })

  describe('handleComponentDidMount', () => {
    it('should dispatch correct actions in correct order', () => {
      const { handleComponentDidMount } = mapDispatchToProps(dispatch)

      handleComponentDidMount()

      expect(dispatch).toHaveBeenCalledTimes(6)
      expect(dispatch.mock.calls[0][0]).toEqual(
        appActions.initApp()
      )
      expect(dispatch.mock.calls[1][0]).toEqual(
        formsActions.formsRegister('goal-add')
      )
      expect(dispatch.mock.calls[2][0]).toEqual(
        formsActions.formsRegister('task-add')
      )
      expect(dispatch.mock.calls[3][0]).toEqual(
        formsActions.formsActivate('goal-add')
      )
      expect(dispatch.mock.calls[4][0]).toEqual(
        goalsThunks.fetchGoals()
      )
      expect(dispatch.mock.calls[5][0]).toEqual(
        tasksThunks.fetchTasks()
      )
    })
  })
})

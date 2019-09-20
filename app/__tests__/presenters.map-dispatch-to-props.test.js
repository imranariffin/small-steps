/* eslint-env jest */

import { mapDispatchToProps } from 'mg/presenters'
import appActions from 'mg/models/app/actions'
import goalsThunks from 'mg/models/goals/thunks'
import tasksThunks from 'mg/models/tasks/thunks'

jest.mock('mg/models/app/actions', () => (
  {
    initApp: jest.fn(() => 'some-thunked-action-2')
  }
))
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
    it('should dispatch correct actions', () => {
      const { handleComponentDidMount } = mapDispatchToProps(dispatch)

      handleComponentDidMount()

      expect(dispatch).toHaveBeenCalledTimes(3)
      expect(dispatch).toHaveBeenCalledWith(appActions.initApp())
      expect(dispatch).toHaveBeenCalledWith(goalsThunks.fetchGoals())
      expect(dispatch).toHaveBeenCalledWith(tasksThunks.fetchTasks())
    })
  })
})

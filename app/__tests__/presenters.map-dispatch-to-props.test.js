/* eslint-env jest */

import { mapDispatchToProps } from 'ss/presenters'
import appActions from 'ss/models/app/actions'
import formsActions from 'ss/models/forms/actions'
import goalsThunks from 'ss/models/goals/thunks'
import migrationsThunks from 'ss/models/migrations/thunks'
import tasksThunks from 'ss/models/tasks/thunks'

jest.mock('ss/models/goals/thunks', () => (
  {
    fetchGoals: jest.fn(() => 'some-thunked-action-1')
  }
))
jest.mock('ss/models/migrations/thunks', () => (
  {
    runMigrations: jest.fn(() => 'run-migrations-thunk'),
    setupStorage: jest.fn(() => 'setup-storage-thunk')
  }
))
jest.mock('ss/models/tasks/thunks', () => (
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

      expect(dispatch.mock.calls).toEqual([
        [migrationsThunks.setupStorage()],
        [migrationsThunks.runMigrations()],
        [appActions.initApp()],
        [formsActions.formsRegister('goal-add')],
        [formsActions.formsRegister('task-add')],
        [formsActions.formsRegister('task-edit')],
        [formsActions.formsActivate('goal-add')],
        [goalsThunks.fetchGoals()],
        [tasksThunks.fetchTasks()]
      ])
    })
  })
})

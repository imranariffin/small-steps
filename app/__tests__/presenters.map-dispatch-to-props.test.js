/* eslint-env jest */

import { mapDispatchToProps } from 'ss/presenters'
import appActions from 'ss/models/app/actions'
import formsActions from 'ss/models/forms/actions'
import goalsThunks from 'ss/models/goals/thunks'
import tasksThunks from 'ss/models/tasks/thunks'
import storagesThunks from 'ss/models/storages/thunks'

jest.mock('ss/models/storages/thunks', () => (
  {
    initStorage: jest.fn(() => 'some-app-thunked-action-1')
  }
))
jest.mock('ss/models/goals/thunks', () => (
  {
    fetchGoals: jest.fn(() => 'some-thunked-action-1')
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
      mapDispatchToProps(dispatch).handleComponentDidMount()

      expect(dispatch.mock.calls).toEqual([
        [appActions.initApp()],
        [storagesThunks.initStorage()],
        [formsActions.formsRegister('goal-add')],
        [formsActions.formsRegister('task-add')],
        [formsActions.formsRegister('task-edit')],
        [formsActions.formsActivate('goal-add')],
        [tasksThunks.fetchTasks()]
      ])
    })
  })

  describe('handleComponentDidUpdate', () => {
    it('should fetch goals when changes from not ready to ready', () => {
      const prevProps = { isGoalsStorageReady: false }
      const nextProps = { isGoalsStorageReady: true }

      mapDispatchToProps(dispatch).handleComponentDidUpdate(prevProps, nextProps)

      expect(dispatch.mock.calls).toEqual([
        [goalsThunks.fetchGoals()]
      ])
    })

    const testCases = [
      { isGoalsStorageReady: { prev: false, next: false } },
      { isGoalsStorageReady: { prev: true, next: true } },
      { isGoalsStorageReady: { prev: true, next: false } }
    ]
    testCases.forEach(({ isGoalsStorageReady: { prev, next } }) => {
      it(`should fetch when isGoalsStorageReady changes from ${prev} to ${next}`, () => {
        const prevProps = { isGoalsStorageReady: prev }
        const nextProps = { isGoalsStorageReady: next }

        mapDispatchToProps(dispatch).handleComponentDidUpdate(prevProps, nextProps)

        expect(dispatch.mock.calls).toEqual([])
      })
    })
  })
})

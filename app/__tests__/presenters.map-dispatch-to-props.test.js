/* eslint-env jest */

import { mapDispatchToProps } from 'ss/presenters'
import appActions from 'ss/common/actions'
import formsActions from 'ss/forms/actions'
import goalsThunks from 'ss/goals/thunks'
import tasksThunks from 'ss/tasks/thunks'
import storagesThunks from 'ss/storages/thunks'

jest.mock('ss/storages/thunks', () => (
  {
    initStorages: jest.fn(() => 'some-app-thunked-action-1')
  }
))
jest.mock('ss/goals/thunks', () => (
  {
    fetchGoals: jest.fn(() => 'some-thunked-action-1')
  }
))
jest.mock('ss/tasks/thunks', () => (
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
        [storagesThunks.initStorages()],
        [formsActions.formsRegister('goal-add')],
        [formsActions.formsRegister('task-add')],
        [formsActions.formsRegister('task-delete')],
        [formsActions.formsRegister('task-edit')],
        [formsActions.formsRegister('task-update-status')],
        [formsActions.formsActivate('goal-add')]
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

    it('should fetch tasks when changes from not ready to ready', () => {
      const prevProps = { isTasksStorageReady: false }
      const nextProps = { isTasksStorageReady: true }

      mapDispatchToProps(dispatch).handleComponentDidUpdate(prevProps, nextProps)

      expect(dispatch.mock.calls).toEqual([
        [tasksThunks.fetchTasks()]
      ])
    })

    const goalsFetchTestCases = [
      { isGoalsStorageReady: { prev: false, next: false } },
      { isGoalsStorageReady: { prev: true, next: true } },
      { isGoalsStorageReady: { prev: true, next: false } }
    ]
    goalsFetchTestCases.forEach(({ isGoalsStorageReady: { prev, next } }) => {
      it(`should fetch when isGoalsStorageReady changes from ${prev} to ${next}`, () => {
        const prevProps = { isGoalsStorageReady: prev }
        const nextProps = { isGoalsStorageReady: next }

        mapDispatchToProps(dispatch).handleComponentDidUpdate(prevProps, nextProps)

        expect(dispatch.mock.calls).toEqual([])
      })
    })

    const tasksFetchTestCases = [
      { isTasksStorageReady: { prev: false, next: false } },
      { isTasksStorageReady: { prev: true, next: true } },
      { isTasksStorageReady: { prev: true, next: false } }
    ]
    tasksFetchTestCases.forEach(({ isTasksStorageReady: { prev, next } }) => {
      it(`should fetch when isTasksStorageReady changes from ${prev} to ${next}`, () => {
        const prevProps = { isTasksStorageReady: prev }
        const nextProps = { isTasksStorageReady: next }

        mapDispatchToProps(dispatch).handleComponentDidUpdate(prevProps, nextProps)

        expect(dispatch.mock.calls).toEqual([])
      })
    })
  })
})

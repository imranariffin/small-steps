/* eslint-env jest */

import thunks from 'ss/tasks/thunks'
import actions from 'ss/tasks/actions'

describe('tasks thunks edit task text', () => {
  let tasksService, dispatch, getState, task

  beforeEach(() => {
    task = {
      created: 'some-task-created-date',
      id: 'some-task-id-0',
      parent: 'some-task-parent-id',
      status: 'some-task-status',
      text: 'some-old-task-text'
    }
    tasksService = {
      update: jest.fn(
        (id, { text }) => Promise.resolve({ ...task, text })
      )
    }
    dispatch = jest.fn()
    getState = jest.fn()
  })

  it('should call the correct method with correct data', async () => {
    const textNew = 'some-new-task-text'

    await thunks.editTaskText(task.id, textNew)(getState, dispatch, { tasksService })

    expect(tasksService.update.mock.calls).toEqual([[task.id, { text: textNew }]])
  })

  describe('tasksService calls successful', () => {
    it('should dispatch correct actions in correct order asynchronously', async () => {
      const textNew = 'some-new-task-text'

      await thunks.editTaskText(task.id, textNew)(getState, dispatch, { tasksService })

      expect(dispatch.mock.calls).toEqual([
        [actions.editTaskTextRequest(task.id, textNew)],
        [actions.editTaskTextSuccess(task.id, textNew)]
      ])
    })
  })

  describe('tasksService calls failure', () => {
    let error

    beforeEach(() => {
      error = new Error('some-error')
      tasksService = { update: jest.fn(() => Promise.reject(error)) }
    })

    it('should dispatch correct actions', async () => {
      const textNew = 'some-new-task-text'

      await thunks.editTaskText(task.id, textNew)(getState, dispatch, { tasksService })

      expect(dispatch.mock.calls).toEqual([
        [actions.editTaskTextRequest(task.id, textNew)],
        [actions.editTaskTextFailure(error)]
      ])
    })
  })
})

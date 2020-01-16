/* eslint-env jest */

import thunks from 'ss/models/tasks/thunks'
import actions from 'ss/models/tasks/actions'

describe('tasks thunks set status', () => {
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
      setStatus: jest.fn((id, status) => Promise.resolve([{ [id]: status }]))
    }
    dispatch = jest.fn()
    getState = jest.fn()
  })

  it('should call the correct method with correct data', async () => {
    const statusNext = 'some-task-status'

    await thunks.setTaskStatus(task.id, statusNext)(getState, dispatch, { tasksService })

    expect(tasksService.setStatus.mock.calls).toEqual([[task.id, statusNext]])
  })

  describe('tasksService calls successful', () => {
    it('should dispatch correct actions in correct order asynchronously', async () => {
      const statusNext = 'some-task-status'

      await thunks.setTaskStatus(task.id, statusNext)(getState, dispatch, { tasksService })

      expect(dispatch.mock.calls).toEqual([
        [actions.setTaskStatusRequest(task.id, statusNext)],
        [actions.setTaskStatusSuccess(task.id, [{ [task.id]: statusNext }])]
      ])
    })
  })

  describe('tasksService calls failure', () => {
    let error

    beforeEach(() => {
      error = new Error('some-error')
      tasksService = { setStatus: jest.fn(() => Promise.reject(error)) }
    })

    it('should dispatch correct actions', async () => {
      const statusNext = 'some-task-status'

      await thunks.setTaskStatus(task.id, statusNext)(getState, dispatch, { tasksService })

      expect(dispatch.mock.calls).toEqual([
        [actions.setTaskStatusRequest(task.id, statusNext)],
        [actions.setTaskStatusFailure(error)]
      ])
    })
  })
})

/* eslint-env jest */

import goalsActions from 'ss/models/goals/actions'
import goalsMiddlewares from 'ss/models/goals/middlewares'
import tasksActions from 'ss/models/tasks/actions'

describe('goals middlewares update status', () => {
  let action, next, store

  beforeEach(() => {
    store = { dispatch: jest.fn(), getState: jest.fn() }
    action = { type: 'some-action-type', payload: {} }
    next = jest.fn((action) => action)
  })

  test('action is `ss/tasks/SET_TASKS_STATUS_SUCCESS`', () => {
    const taskId = 'some-task-id-0'
    const statuses = [
      { id: 'some-task-id-0', status: 'completed' },
      { id: 'some-task-id-1', status: 'in-progress' },
    ]
    action = tasksActions.setTaskStatusSuccess(taskId, statuses)

    goalsMiddlewares.updateStatus(store)(next)(action)

    expect(next.mock.calls).toEqual([[action]])
    expect(store.dispatch.mock.calls).toEqual([[goalsActions.updateStatusRequest(statuses)]])
  })

  test('action is not some arbitrary action', () => {
    goalsMiddlewares.updateStatus(store)(next)(action)

    expect(next.mock.calls).toEqual([[action]])
    expect(store.dispatch.mock.calls).toEqual([])
  })
})

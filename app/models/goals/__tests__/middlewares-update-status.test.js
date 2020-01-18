/* eslint-env jest */

import goalsThunks from 'ss/models/goals/thunks'
import goalsMiddlewares from 'ss/models/goals/middlewares'
import tasksActions from 'ss/models/tasks/actions'

jest.mock('ss/models/goals/thunks', () => {
  return {
    updateStatus: jest.fn(() => 'goals-thunk-update-status')
  }
})

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
      { id: 'some-task-id-1', status: 'in-progress' }
    ]
    action = tasksActions.setTaskStatusSuccess(taskId, statuses)

    goalsMiddlewares.updateStatus(store)(next)(action)

    expect(next.mock.calls).toEqual([[action]])
    expect(goalsThunks.updateStatus.mock.calls).toEqual([[statuses]])
    expect(store.dispatch.mock.calls).toEqual([[goalsThunks.updateStatus(statuses)]])
  })

  test('action is not some arbitrary action', () => {
    goalsMiddlewares.updateStatus(store)(next)(action)

    expect(next.mock.calls).toEqual([[action]])
    expect(store.dispatch.mock.calls).toEqual([])
  })
})

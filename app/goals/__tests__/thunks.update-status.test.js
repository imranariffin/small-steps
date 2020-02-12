/* eslint-env jest */

import actions from 'ss/goals/actions'
import thunks from 'ss/goals/thunks'

describe('goals thunks updateStatus', () => {
  let getState, goalsService, defaultState, dispatch

  beforeEach(() => {
    defaultState = {
      goals: {
        allIds: ['some-goal-id'],
        byId: {
          'some-goal-id': {
            id: 'some-goal-id',
            status: 'in-progress'
          }
        }
      },
      tasks: {
        allIds: ['some-task-id-0', 'some-task-id-1'],
        byId: {
          'some-task-id-0': {
            id: 'some-task-id-0',
            parent: 'some-goal-id',
            status: 'completed'
          },
          'some-task-id-1': {
            id: 'some-task-id-1',
            parent: 'some-goal-does-not-exist-id',
            status: 'in-progress'
          }
        }
      }
    }
    getState = jest.fn(() => defaultState)
    dispatch = jest.fn()
    goalsService = { update: jest.fn() }
  })

  test('goalsService set status successfully', async () => {
    goalsService.update = jest.fn(() => Promise.resolve())
    const statuses = [
      { id: 'some-task-id-0', status: 'completed' },
      { id: 'some-task-id-1', status: 'in-progress' }
    ]

    await thunks.updateStatus(statuses)(getState, dispatch, { goalsService })

    expect(goalsService.update.mock.calls).toEqual([
      [{ id: 'some-goal-id', status: 'completed' }]
    ])
    expect(dispatch.mock.calls).toEqual([
      [actions.updateStatusRequest(statuses)],
      [actions.updateStatusSuccess('some-goal-id', 'completed')]
    ])
  })

  test('goalsService set status failed', async () => {
    goalsService.update = jest.fn(() => Promise.reject(Error('some-error')))
    const statuses = [
      { id: 'some-task-id-0', status: 'completed' },
      { id: 'some-task-id-1', status: 'in-progress' }
    ]

    await thunks.updateStatus(statuses)(getState, dispatch, { goalsService })

    expect(goalsService.update.mock.calls).toEqual([
      [{ id: 'some-goal-id', status: 'completed' }]
    ])
    expect(dispatch.mock.calls).toEqual([
      [actions.updateStatusRequest(statuses)],
      [actions.updateStatusFailure(Error('some-error'))]
    ])
  })

  test('goal does not exist', async () => {
    goalsService.update = jest.fn(() => Promise.reject(Error('some-error')))
    const statuses = [
      { id: 'some-task-id-0', status: 'completed' },
      { id: 'some-task-id-1', status: 'in-progress' }
    ]
    defaultState.tasks.byId['some-task-id-0'].parent = 'goal-does-not-exist-id'
    getState = jest.fn(() => defaultState)

    await thunks.updateStatus(statuses)(getState, dispatch, { goalsService })

    expect(goalsService.update.mock.calls).toEqual([])
    expect(dispatch.mock.calls).toEqual([
      [actions.updateStatusRequest(statuses)],
      [actions.updateStatusFailure(Error('No goal found to update status'))]
    ])
  })
})

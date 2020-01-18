/* eslint-env jest */

import actions from 'ss/models/goals/actions'
import thunks from 'ss/models/goals/thunks'

describe('goals thunks updateStatus', () => {
  let getState, goalsService, dispatch

  beforeEach(() => {
    getState = jest.fn()
    dispatch = jest.fn()
    goalsService = { update: jest.fn() }
  })

  test('goalsService set status successfully', async () => {
    goalsService.update = jest.fn(() => Promise.resolve())
    const statuses = [
      { id: 'some-task-id-0', status: 'completed' },
      { id: 'some-task-id-1', status: 'in-progress' }
    ]
    getState = jest.fn(() => {
      return {
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
    })

    await thunks.updateStatus(statuses)(getState, dispatch, { goalsService })

    expect(goalsService.update.mock.calls).toEqual([
      [{ id: 'some-goal-id', status: 'completed' }]
    ])
    expect(dispatch.mock.calls).toEqual([
      [actions.updateStatusRequest(statuses)],
      [actions.updateStatusSuccess('some-goal-id', 'completed')]
    ])
  })

  test('goalsService set status failed', () => {})
})

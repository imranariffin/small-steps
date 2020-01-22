/* eslint-env jest */

import thunks from 'ss/models/goals/thunks'

describe('goals thunks deleteGoal', () => {
  let getState, goalsService, dispatch

  beforeEach(() => {
    getState = jest.fn()
    dispatch = jest.fn()
  })

  describe('goalsService deleted goal successfully', () => {
    beforeEach(() => {
      goalsService = {
        delete: jest.fn((goalId) => Promise.resolve(goalId))
      }
    })

    it('should dispatch correct actions', async () => {
      const goalId = 'some-goal-id'

      await thunks.deleteGoal(goalId)(getState, dispatch, { goalsService })

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch.mock.calls[0][0]).toEqual(
        {
          type: 'ss/goals/DELETE_GOALS_REQUEST',
          payload: {
            id: goalId
          }
        }
      )
      expect(dispatch.mock.calls[1][0]).toEqual(
        {
          type: 'ss/goals/DELETE_GOALS_SUCCESS',
          payload: {
            id: 'some-goal-id'
          }
        }
      )
    })
  })

  describe('goalsService failed to delete goal', () => {
    let error

    beforeEach(() => {
      error = new Error('some-error')
      goalsService = {
        delete: jest.fn(() => Promise.reject(error))
      }
    })

    it('should dispatch correct actions', async () => {
      const goalId = 'some-text'

      await thunks.deleteGoal(goalId)(getState, dispatch, { goalsService })

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch.mock.calls[0][0]).toEqual(
        {
          type: 'ss/goals/DELETE_GOALS_REQUEST',
          payload: {
            id: goalId
          }
        }
      )
      expect(dispatch.mock.calls[1][0]).toEqual(
        {
          type: 'ss/goals/DELETE_GOALS_FAILURE',
          payload: {
            error: new Error('some-error')
          }
        }
      )
    })
  })
})

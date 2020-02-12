/* eslint-env jest */

import thunks from 'ss/goals/thunks'

describe('goals thunks fetchGoals', () => {
  let goalsService, getState, dispatch

  beforeEach(() => {
    getState = jest.fn()
    dispatch = jest.fn()
  })

  describe('goalsService calls successful', () => {
    let goals

    beforeEach(() => {
      goals = [
        'some-goal-0',
        'some-goal-1'
      ]
      goalsService = {
        getAll: jest.fn(() => Promise.resolve(goals))
      }
    })

    it('should dispatch correct actions', async () => {
      await thunks.fetchGoals()(getState, dispatch, { goalsService })

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch.mock.calls[0][0]).toEqual(
        {
          type: 'ss/goals/FETCH_GOALS_REQUEST',
          payload: {}
        }
      )
      expect(dispatch.mock.calls[1][0]).toEqual(
        {
          type: 'ss/goals/FETCH_GOALS_SUCCESS',
          payload: {
            goals
          }
        }
      )
    })
  })

  describe('goalsService calls failure', () => {
    let error

    beforeEach(() => {
      error = new Error('some-error')
      goalsService = {
        getAll: jest.fn(() => Promise.reject(error))
      }
    })

    it('should dispatch correct actions', async () => {
      await thunks.fetchGoals()(getState, dispatch, { goalsService })

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch.mock.calls[0][0]).toEqual(
        {
          type: 'ss/goals/FETCH_GOALS_REQUEST',
          payload: {}
        }
      )
      expect(dispatch.mock.calls[1][0]).toEqual(
        {
          type: 'ss/goals/FETCH_GOALS_FAILURE',
          payload: {
            error
          }
        }
      )
    })
  })
})

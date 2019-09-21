/* eslint-env jest */

import thunks from 'mg/models/goals/thunks'

describe('goals thunks fetchGoals', () => {
  let client, getState, dispatch

  beforeEach(() => {
    getState = jest.fn()
    dispatch = jest.fn()
  })

  describe('client calls successful', () => {
    let goals

    beforeEach(() => {
      goals = [
        'some-goal-0',
        'some-goal-1'
      ]
      client = {
        get: jest.fn(() => Promise.resolve(
          {
            body: { goals }
          }
        ))
      }
    })

    it('should dispatch correct actions', async () => {
      await thunks.fetchGoals()(getState, dispatch, { client })

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch.mock.calls[0][0]).toEqual(
        {
          type: 'mg/goals/FETCH_GOALS_REQUEST',
          payload: {}
        }
      )
      expect(dispatch.mock.calls[1][0]).toEqual(
        {
          type: 'mg/goals/FETCH_GOALS_SUCCESS',
          payload: {
            goals
          }
        }
      )
    })
  })

  describe('client calls failure', () => {
    let error

    beforeEach(() => {
      error = new Error('some-error')
      client = {
        get: jest.fn(() => Promise.reject(error))
      }
    })

    it('should dispatch correct actions', async () => {
      await thunks.fetchGoals()(getState, dispatch, { client })

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch.mock.calls[0][0]).toEqual(
        {
          type: 'mg/goals/FETCH_GOALS_REQUEST',
          payload: {}
        }
      )
      expect(dispatch.mock.calls[1][0]).toEqual(
        {
          type: 'mg/goals/FETCH_GOALS_FAILURE',
          payload: {
            error
          }
        }
      )
    })
  })
})

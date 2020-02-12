/* eslint-env jest */

import thunks from 'ss/goals/thunks'

describe('goals thunks createGoals', () => {
  let getState, goalsService, dispatch

  beforeEach(() => {
    getState = jest.fn()
    dispatch = jest.fn()
  })

  describe('goalsService created goal successfully', () => {
    beforeEach(() => {
      goalsService = {
        create: jest.fn(({ text }) => Promise.resolve(
          {
            id: 'some-uuid',
            text,
            created: 1234,
            status: 'not-started'
          }
        ))
      }
    })

    it('should dispatch correct actions', async () => {
      const text = 'some-text'

      await thunks.submitGoal(text)(getState, dispatch, { goalsService })

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch.mock.calls[0][0]).toEqual(
        {
          type: 'ss/goals/SUBMIT_GOALS_REQUEST',
          payload: {
            text
          }
        }
      )
      expect(dispatch.mock.calls[1][0]).toEqual(
        {
          type: 'ss/goals/SUBMIT_GOALS_SUCCESS',
          payload: {
            id: 'some-uuid',
            text,
            created: 1234,
            status: 'not-started'
          }
        }
      )
    })
  })

  describe('goalsService failed to create goal', () => {
    let error

    beforeEach(() => {
      error = new Error('some-error')
      goalsService = {
        create: jest.fn(() => Promise.reject(error))
      }
    })

    it('should dispatch correct actions', async () => {
      const text = 'some-text'

      await thunks.submitGoal(text)(getState, dispatch, { goalsService })

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch.mock.calls[0][0]).toEqual(
        {
          type: 'ss/goals/SUBMIT_GOALS_REQUEST',
          payload: {
            text
          }
        }
      )
      expect(dispatch.mock.calls[1][0]).toEqual(
        {
          type: 'ss/goals/SUBMIT_GOALS_FAILURE',
          payload: {
            error: new Error('some-error')
          }
        }
      )
    })
  })
})

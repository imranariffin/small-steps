/* eslint-env jest */

import thunks from 'mg/models/goals/thunks'

describe('goals thunks createGoals', () => {
  let client, getState, dispatch

  beforeEach(() => {
    getState = jest.fn()
    dispatch = jest.fn()
  })

  describe('client calls successful', () => {
    beforeEach(() => {
      client = {
        post: jest.fn((_, { body: { text } }) => Promise.resolve(
          {
            body: {
              id: 'some-uuid',
              text,
              created: 1234,
              status: 'not-started'
            }
          }
        ))
      }
    })

    it('should dispatch correct actions', async () => {
      const text = 'some-text'

      await thunks.submitGoal(text)(getState, dispatch, { client })

      expect(dispatch).toHaveBeenCalledWith(
        {
          type: 'mg/goals/SUBMIT_GOALS_REQUEST',
          payload: {
            text
          }
        }
      )
      expect(dispatch).toHaveBeenCalledWith(
        {
          type: 'mg/goals/SUBMIT_GOALS_SUCCESS',
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

  describe('client calls failure', () => {
    let error

    beforeEach(() => {
      error = new Error('some-error')
      client = {
        post: jest.fn((_, { body: { text } }) => Promise.reject(error))
      }
    })

    it('should dispatch correct actions', async () => {
      const text = 'some-text'

      await thunks.submitGoal(text)(getState, dispatch, { client })

      expect(dispatch).toHaveBeenCalledWith(
        {
          type: 'mg/goals/SUBMIT_GOALS_REQUEST',
          payload: {
            text
          }
        }
      )
      expect(dispatch).toHaveBeenCalledWith(
        {
          type: 'mg/goals/SUBMIT_GOALS_FAILURE',
          payload: {
            error: new Error('some-error')
          }
        }
      )
    })
  })
})

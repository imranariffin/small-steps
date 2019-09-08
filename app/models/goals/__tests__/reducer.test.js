/* eslint-env jest */

import reducer from 'mg/models/goals/reducer'

describe('goals reducer', () => {
  let prevState

  beforeEach(() => {
    prevState = {
      byId: {},
      allIds: [],
      status: 'not_loaded'
    }
  })

  describe('action is `mg/goals/FETCH_GOALS_REQUEST`', () => {
    it('should set status to `loading`', () => {
      const action = {
        type: 'mg/goals/FETCH_GOALS_REQUEST',
        payload: {}
      }

      const state = reducer(prevState, action)

      expect(state.status).toEqual('loading')
    })
  })

  describe('action is `mg/goals/FETCH_GOALS_SUCCESS`', () => {
    let action

    beforeEach(() => {
      action = {
        type: 'mg/goals/FETCH_GOALS_SUCCESS',
        payload: {
          goals: [
            {
              created: 1000,
              id: 'some-goal-id-0',
              status: 'some-status-0',
              text: 'some-goal-text-0'
            },
            {
              created: 1001,
              id: 'some-goal-id-1',
              status: 'some-status-1',
              text: 'some-goal-text-1'
            }
          ]
        }
      }
    })

    it('should store goals from payload', () => {
      const state = reducer(prevState, action)

      expect(state.allIds).toEqual(
        ['some-goal-id-0', 'some-goal-id-1']
      )
      expect(state.byId).toEqual(
        {
          'some-goal-id-0': {
            created: 1000,
            id: 'some-goal-id-0',
            status: 'some-status-0',
            text: 'some-goal-text-0'
          },
          'some-goal-id-1': {
            created: 1001,
            id: 'some-goal-id-1',
            status: 'some-status-1',
            text: 'some-goal-text-1'
          }
        }
      )
    })

    it('should status to `loaded`', () => {
      const state = reducer(prevState, action)

      expect(state.status).toEqual('loaded')
    })
  })

  describe('action is `mg/goals/FETCH_GOALS_FAILURE`', () => {
    let action, error

    beforeEach(() => {
      error = new Error('some-error')
      action = {
        type: 'mg/goals/FETCH_GOALS_FAILURE',
        payload: {
          error
        }
      }
    })

    it('should store error from payload', () => {
      const state = reducer(prevState, action)

      expect(state.error).toEqual(error)
    })

    it('should status to `loaded`', () => {
      const state = reducer(prevState, action)

      expect(state.status).toEqual('loaded')
    })
  })
})

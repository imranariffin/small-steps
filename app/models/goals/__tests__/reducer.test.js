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
})

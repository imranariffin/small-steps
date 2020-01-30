/* eslint-env jest */

import goalsActionTypes from 'ss/models/goals/action-types'
import goalsActions from 'ss/models/goals/actions'
import reducer from 'ss/models/goals/reducer'

describe('goals reducer', () => {
  let prevState

  beforeEach(() => {
    prevState = {
      byId: {},
      allIds: [],
      status: 'not_loaded'
    }
  })

  describe('action is `ss/goals/FETCH_GOALS_REQUEST`', () => {
    it('should set status to `loading`', () => {
      const action = {
        type: 'ss/goals/FETCH_GOALS_REQUEST',
        payload: {}
      }

      const state = reducer(prevState, action)

      expect(state.status).toEqual('loading')
    })
  })

  describe('action is `ss/goals/FETCH_GOALS_SUCCESS`', () => {
    let action

    beforeEach(() => {
      action = {
        type: 'ss/goals/FETCH_GOALS_SUCCESS',
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

  describe('action is `ss/goals/FETCH_GOALS_FAILURE`', () => {
    let action, error

    beforeEach(() => {
      error = new Error('some-error')
      action = {
        type: 'ss/goals/FETCH_GOALS_FAILURE',
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

  describe('action is `ss/goals/SUBMIT_GOALS_SUCCESS`', () => {
    let action, id, created, status, text

    beforeEach(() => {
      action = {
        type: 'ss/goals/SUBMIT_GOALS_SUCCESS',
        payload: {
          id,
          created,
          status,
          text
        }
      }
    })

    it('should add goal from payload to store', () => {
      const state = reducer(prevState, action)

      expect(state.allIds).toContain(id)
      expect(state.byId[id]).toEqual(
        {
          id,
          created,
          status,
          text
        }
      )
    })

    it('should set status to loaded', () => {
      const state = reducer(prevState, action)

      expect(state.status).toEqual('loaded')
    })
  })

  describe(`action is '${goalsActionTypes.UPDATE_STATUS_SUCCESS}`, () => {
    let prevState

    beforeEach(() => {
      prevState = {
        allIds: ['some-goal-id-0', 'some-goal-id-1'],
        byId: {
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
      }
    })

    test('set status of correct goal correctly', () => {
      const action = {
        type: goalsActionTypes.UPDATE_STATUS_SUCCESS,
        payload: {
          id: 'some-goal-id-0',
          status: 'completed'
        }
      }

      const state = reducer(prevState, action)

      expect(state.byId).toEqual({
        'some-goal-id-0': {
          created: 1000,
          id: 'some-goal-id-0',
          status: 'completed',
          text: 'some-goal-text-0'
        },
        'some-goal-id-1': {
          created: 1001,
          id: 'some-goal-id-1',
          status: 'some-status-1',
          text: 'some-goal-text-1'
        }
      })
    })
  })

  describe('action is \'ss/goals/DELETE_GOALS_SUCCESS\'', () => {
    let prevState

    beforeEach(() => {
      prevState = {
        allIds: ['some-goal-id-0', 'some-goal-id-1'],
        byId: {
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
      }
    })

    test('set status of correct goal correctly', () => {
      const action = goalsActions.deleteGoal.success('some-goal-id-0')

      const state = reducer(prevState, action)

      expect(state.byId).toEqual({
        'some-goal-id-1': {
          created: 1001,
          id: 'some-goal-id-1',
          status: 'some-status-1',
          text: 'some-goal-text-1'
        }
      })
      expect(state.allIds).toEqual(['some-goal-id-1'])
    })
  })

  describe(`action is '${goalsActions.editGoalText.SUCCESS_TYPE}'`, () => {
    beforeEach(() => {
      prevState = {
        allIds: ['some-goal-id-0', 'some-goal-id-1'],
        byId: {
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
      }
    })

    test('update text', () => {
      const action = goalsActions.editGoalText.success('some-goal-id-0', 'some-new-text')

      const state = reducer(prevState, action)

      expect(state.byId['some-goal-id-0'].text).toEqual('some-new-text')
    })
  })
})

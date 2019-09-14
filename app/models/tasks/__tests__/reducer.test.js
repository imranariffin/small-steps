/* eslint-env jest */

import reducer from 'mg/models/tasks/reducer'

describe('tasks reducer', () => {
  let prevState

  beforeEach(() => {
    prevState = {
      allIds: ['some-existing-task-0'],
      byId: {
        'some-existing-task-0': {
          created: 100,
          id: 'some-existing-task-0',
          parent: 'some-existing-goal-0',
          status: 'some-task-status',
          text: 'some-existing-task-text'
        }
      }
    }
  })

  describe('initially', () => {
    const action = {}

    beforeEach(() => {
      prevState = undefined
    })

    it('should define correct initial state', () => {
      const state = reducer(prevState, action)

      expect(state).toEqual(
        {
          allIds: [],
          byId: {},
          status: 'not_loaded'
        }
      )
    })
  })

  describe('action is `mg/goals/FETCH_TASKS_REQUEST`', () => {
    const action = {
      type: 'mg/goals/FETCH_TASKS_REQUEST',
      payload: {}
    }

    it('should define status as `loading`', () => {
      const state = reducer(prevState, action)

      expect(state.status).toEqual('loading')
    })

    it('should maintain state other parts of state', () => {
      const state = reducer(prevState, action)

      expect(state.allIds).toEqual(prevState.allIds)
      expect(state.byId).toEqual(prevState.byId)
    })
  })

  describe('action is `mg/goals/FETCH_TASKS_SUCCESS`', () => {
    const action = {
      type: 'mg/goals/FETCH_TASKS_SUCCESS',
      payload: {
        tasks: [
          {
            created: 1000,
            id: 'some-task-id-0',
            parent: 'some-goal-id-0',
            status: 'some-task-status-0',
            text: 'some-task-text-0'
          },
          {
            created: 1001,
            id: 'some-task-id-1',
            parent: 'some-goal-id-0',
            status: 'some-task-status-1',
            text: 'some-task-text-1'
          },
          {
            created: 1002,
            id: 'some-task-id-2',
            parent: 'some-goal-id-1',
            status: 'some-task-status-2',
            text: 'some-task-text-2'
          }
        ]
      }
    }

    it('should define status to `loaded`', () => {
      const state = reducer(prevState, action)

      expect(state.status).toEqual('loaded')
    })

    it('should store tasks from payload', () => {
      const state = reducer(prevState, action)

      expect(state.allIds).toEqual(
        ['some-task-id-0', 'some-task-id-1', 'some-task-id-2']
      )
      expect(state.byId).toEqual(
        {
          'some-task-id-0': {
            created: 1000,
            id: 'some-task-id-0',
            parent: 'some-goal-id-0',
            status: 'some-task-status-0',
            text: 'some-task-text-0'
          },
          'some-task-id-1': {
            created: 1001,
            id: 'some-task-id-1',
            parent: 'some-goal-id-0',
            status: 'some-task-status-1',
            text: 'some-task-text-1'
          },
          'some-task-id-2': {
            created: 1002,
            id: 'some-task-id-2',
            parent: 'some-goal-id-1',
            status: 'some-task-status-2',
            text: 'some-task-text-2'
          }
        }
      )
    })
  })
})

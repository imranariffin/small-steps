/* eslint-env jest */

import reducer from 'ss/models/tasks/reducer'

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

  describe('action is `ss/tasks/FETCH_TASKS_REQUEST`', () => {
    const action = {
      type: 'ss/tasks/FETCH_TASKS_REQUEST',
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

  describe('action is `ss/tasks/FETCH_TASKS_SUCCESS`', () => {
    const action = {
      type: 'ss/tasks/FETCH_TASKS_SUCCESS',
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

  describe('action is `ss/tasks/FETCH_TASKS_FAILURE`', () => {
    const action = {
      type: 'ss/tasks/FETCH_TASKS_FAILURE',
      payload: {
        error: new Error('some-error-message')
      }
    }

    it('should define status to `loaded`', () => {
      const state = reducer(prevState, action)

      expect(state.status).toEqual('loaded')
    })

    it('should store error from payload', () => {
      const state = reducer(prevState, action)

      expect(state.error).toEqual(new Error('some-error-message'))
    })

    it('should maintain tasks in state', () => {
      const state = reducer(prevState, action)

      expect(state.allIds).toEqual(prevState.allIds)
      expect(state.byId).toEqual(prevState.byId)
    })
  })

  describe('action is `ss/tasks/EDIT_TEXT_TASKS_SUCCESS`', () => {
    it('should update only the text of task', () => {
      const action = {
        type: 'ss/tasks/EDIT_TEXT_TASKS_SUCCESS',
        payload: {
          id: 'some-existing-task-0',
          text: 'some-new-text'
        }
      }

      const state = reducer(prevState, action)

      expect(state.byId.length).toEqual(prevState.byId.length)
      expect(state.allIds.length).toEqual(prevState.allIds.length)
      expect(state.allIds[state.allIds.length - 1]).toEqual(
        'some-existing-task-0'
      )
      expect(state.byId['some-existing-task-0']).toEqual(
        {
          created: 100,
          id: 'some-existing-task-0',
          parent: 'some-existing-goal-0',
          status: 'some-task-status',
          text: 'some-new-text'
        }
      )
    })
  })
})

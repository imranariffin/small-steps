/* eslint-env jest */

import reducer from 'ss/models/tasks/reducer'
import actionTypes from '../action-types'

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

      expect(Object.keys(state.byId).length).toEqual(Object.keys(prevState.byId).length)
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

  describe('action is `ss/tasks/DELETE_TASKS_SUCCESS`', () => {
    it('should remove the task from state', () => {
      prevState = {
        allIds: ['some-existing-task-0', 'some-existing-task-1'],
        byId: {
          'some-existing-task-0': {
            created: 100,
            id: 'some-existing-task-0',
            parent: 'some-existing-goal-0',
            status: 'some-task-status',
            text: 'some-existing-task-text'
          },
          'some-existing-task-1': {
            created: 101,
            id: 'some-existing-task-1',
            parent: 'some-existing-goal-0',
            status: 'some-task-status',
            text: 'some-existing-task-text'
          },
          'some-existing-task-2': {
            created: 101,
            id: 'some-existing-task-2',
            parent: 'some-existing-task-1',
            status: 'some-task-status',
            text: 'some-existing-task-text'
          },
          'some-existing-task-3': {
            created: 101,
            id: 'some-existing-task-3',
            parent: 'some-existing-task-1',
            status: 'some-task-status',
            text: 'some-existing-task-text'
          },
          'some-existing-task-4': {
            created: 101,
            id: 'some-existing-task-4',
            parent: 'some-existing-task-2',
            status: 'some-task-status',
            text: 'some-existing-task-text'
          }
        }
      }
      const action = {
        type: 'ss/tasks/DELETE_TASKS_SUCCESS',
        payload: {
          ids: [
            'some-existing-task-4',
            'some-existing-task-3',
            'some-existing-task-2',
            'some-existing-task-1'
          ]
        }
      }

      const state = reducer(prevState, action)

      expect(Object.keys(state.byId).length).toEqual(1)
      expect(state.allIds.length).toEqual(1)
      expect(state.byId['some-existing-task-0']).not.toEqual(undefined)
      expect(state.byId['some-existing-task-1']).toEqual(undefined)
      expect(state.byId['some-existing-task-2']).toEqual(undefined)
      expect(state.byId['some-existing-task-3']).toEqual(undefined)
      expect(state.byId['some-existing-task-4']).toEqual(undefined)
    })
  })

  describe('action is `ss/tasks/SET_TASKS_STATUS_SUCCESS`', () => {
    it('should update status of each relevant task', () => {
      prevState = {
        allIds: [
          'some-task-0',
          'some-task-1',
          'some-task-2',
          'some-task-3',
          'some-task-4'
        ],
        byId: {
          'some-task-0': {
            created: 100,
            id: 'some-task-0',
            parent: 'some-goal-0',
            status: 'some-status',
            text: 'some-task-text'
          },
          'some-task-1': {
            created: 101,
            id: 'some-task-1',
            parent: 'some-goal-0',
            status: 'some-status',
            text: 'some-task-text'
          },
          'some-task-2': {
            created: 101,
            id: 'some-task-2',
            parent: 'some-task-1',
            status: 'some-status',
            text: 'some-task-text'
          },
          'some-task-3': {
            created: 101,
            id: 'some-task-3',
            parent: 'some-task-1',
            status: 'some-status',
            text: 'some-task-text'
          },
          'some-task-4': {
            created: 101,
            id: 'some-task-4',
            parent: 'some-task-2',
            status: 'some-status',
            text: 'some-task-text'
          }
        }
      }
      const action = {
        type: 'ss/tasks/SET_TASKS_STATUS_SUCCESS',
        payload: {
          statuses: [
            { id: 'some-task-0', status: 'some-status-next-0' },
            { id: 'some-task-1', status: 'some-status-next-1' },
            { id: 'some-task-2', status: 'some-status-next-2' }
          ]
        }
      }

      const state = reducer(prevState, action)

      expect(state.byId['some-task-0'].status).toEqual('some-status-next-0')
      expect(state.byId['some-task-1'].status).toEqual('some-status-next-1')
      expect(state.byId['some-task-2'].status).toEqual('some-status-next-2')
      expect(state.byId['some-task-3'].status).toEqual('some-status')
      expect(state.byId['some-task-4'].status).toEqual('some-status')
    })
  })
})

/* eslint-env jest */

import thunks from 'ss/models/tasks/thunks'

describe('tasks thunk fetchTasks', () => {
  let dispatch, getState, tasksService

  beforeEach(() => {
    getState = jest.fn()
    dispatch = jest.fn()
  })

  describe('service getAll calls successful', () => {
    let tasks

    beforeEach(() => {
      tasks = ['some-task-0', 'some-task-1']
      tasksService = { getAll: jest.fn(() => Promise.resolve(tasks)) }
    })

    it('should call the correct service method', async () => {
      await thunks.fetchTasks()(getState, dispatch, { tasksService })

      expect(tasksService.getAll.mock.calls).toEqual([[]])
    })

    it('should dispatch correct actions', async () => {
      await thunks.fetchTasks()(getState, dispatch, { tasksService })

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch.mock.calls[0][0]).toEqual(
        {
          type: 'ss/tasks/FETCH_TASKS_REQUEST',
          payload: {}
        }
      )
      expect(dispatch.mock.calls[1][0]).toEqual(
        {
          type: 'ss/tasks/FETCH_TASKS_SUCCESS',
          payload: {
            tasks
          }
        }
      )
    })
  })

  describe('service create calls fail', () => {
    beforeEach(() => {
      tasksService = { getAll: jest.fn(() => Promise.reject(Error('some-error'))) }
    })

    it('should dispatch correction actions', async () => {
      const error = Error('some-error')

      await thunks.fetchTasks()(getState, dispatch, { tasksService })

      expect(dispatch.mock.calls).toEqual([
        [{ type: 'ss/tasks/FETCH_TASKS_REQUEST', payload: {} }],
        [{ type: 'ss/tasks/FETCH_TASKS_FAILURE', payload: { error } }]
      ])
    })
  })
})

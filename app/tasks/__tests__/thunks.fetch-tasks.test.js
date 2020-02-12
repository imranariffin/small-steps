import thunks from 'ss/tasks/thunks'

/* eslint-env jest */

describe('tasks thunk fetchTasks', () => {
  let tasksService, dispatch, getState

  beforeEach(() => {
    getState = jest.fn()
    dispatch = jest.fn()
  })

  describe('tasksService calls successful', () => {
    let tasks

    beforeEach(() => {
      tasks = [
        'some-task-0',
        'some-task-1'
      ]
      tasksService = {
        getAll: jest.fn(() => Promise.resolve(tasks))
      }
    })

    it('should call the correct method', async () => {
      await thunks.fetchTasks()(getState, dispatch, { tasksService })

      expect(tasksService.getAll.mock.calls).toEqual([[]])
    })

    it('should dispatch correct actions', async () => {
      await thunks.fetchTasks()(getState, dispatch, { tasksService })

      expect(dispatch.mock.calls).toEqual([
        [{
          type: 'ss/tasks/FETCH_TASKS_REQUEST',
          payload: {}
        }],
        [{
          type: 'ss/tasks/FETCH_TASKS_SUCCESS',
          payload: { tasks }
        }]
      ])
    })
  })
})

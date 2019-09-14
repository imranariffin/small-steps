import thunks from 'mg/models/tasks/thunks'

/* eslint-env jest */

describe('tasks thunk fetchTasks', () => {
  let client, dispatch, getState

  beforeEach(() => {
    getState = jest.fn()
    dispatch = jest.fn()
  })

  describe('client calls successful', () => {
    let tasks

    beforeEach(() => {
      tasks = [
        'some-task-0',
        'some-task-1'
      ]
      client = {
        get: jest.fn(() => Promise.resolve(
          {
            body: { tasks }
          }
        ))
      }
    })

    it('should dispatch correct actions', async () => {
      await thunks.fetchTasks()(getState, dispatch, { client })

      expect(dispatch).toHaveBeenCalledWith(
        {
          type: 'mg/tasks/FETCH_TASKS_REQUEST',
          payload: {}
        }
      )
      expect(dispatch).toHaveBeenCalledWith(
        {
          type: 'mg/tasks/FETCH_TASKS_SUCCESS',
          payload: {
            tasks
          }
        }
      )
    })
  })
})

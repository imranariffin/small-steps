/* eslint-env jest */

import thunks from 'ss/models/tasks/thunks'

describe('tasks thunks create task', () => {
  let tasksService, dispatch, getState, parent, text

  beforeEach(() => {
    parent = 'some-parent-id-0'
    text = 'some-text'
    tasksService = {
      create: jest.fn(
        (parent, text) => Promise.resolve(
          {
            created: 1234,
            id: 'some-task-uuid-0',
            parent,
            status: 'not-started',
            text
          }
        )
      )
    }
    dispatch = jest.fn()
    getState = jest.fn()
  })

  it('should call the correct method with correct data', async () => {
    await thunks.createTask(parent, text)(getState, dispatch, { tasksService })

    expect(tasksService.create.mock.calls).toEqual([[parent, text]])
  })

  describe('tasksService calls successful', () => {
    it('should dispatch correct actions in correct order asynchronously', async () => {
      await thunks.createTask(parent, text)(getState, dispatch, { tasksService })

      expect(dispatch.mock.calls).toEqual([
        [{
          type: 'ss/tasks/SUBMIT_TASKS_REQUEST',
          payload: {
            parent,
            text
          }
        }],
        [{
          type: 'ss/tasks/SUBMIT_TASKS_SUCCESS',
          payload: {
            id: 'some-task-uuid-0',
            parent,
            text: 'some-text',
            created: 1234,
            status: 'not-started'
          }
        }]
      ])
    })
  })

  describe('tasksService calls failure', () => {
    let error

    beforeEach(() => {
      error = new Error('some-error')
      tasksService = { create: jest.fn(() => Promise.reject(error)) }
    })

    it('should dispatch correct actions', async () => {
      await thunks.createTask(parent, text)(getState, dispatch, { tasksService })

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch.mock.calls).toEqual([
        [{
          type: 'ss/tasks/SUBMIT_TASKS_REQUEST',
          payload: {
            parent,
            text
          }
        }],
        [{
          type: 'ss/tasks/SUBMIT_TASKS_FAILURE',
          payload: { error }
        }]
      ])
    })
  })
})

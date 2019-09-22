/* eslint-env jest */

import thunks from 'ss/models/tasks/thunks'

describe('tasks thunks create task', () => {
  let client, dispatch, getState, parent, text

  beforeEach(() => {
    parent = 'some-parent-id-0'
    text = 'some-text'
    client = {
      post: jest.fn(
        (_, { body: { text } }) => Promise.resolve(
          {
            body: {
              created: 1234,
              id: 'some-task-uuid-0',
              parent,
              status: 'not-started',
              text
            }
          }
        )
      )
    }
    dispatch = jest.fn()
    getState = jest.fn()
  })

  it('should call the correct POST endpoint with correct data', async () => {
    await thunks.createTask(text, parent)(getState, dispatch, { client })

    expect(client.post).toHaveBeenCalledWith(
      'https://small-steps-api.com/v1/tasks/',
      {
        body: {
          parent,
          text
        }
      }
    )
  })

  describe('client calls successful', () => {
    it('should dispatch correct actions in correct order asynchronously', async () => {
      await thunks.createTask(text, parent)(getState, dispatch, { client })

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch.mock.calls[0][0]).toEqual(
        {
          type: 'ss/tasks/SUBMIT_TASKS_REQUEST',
          payload: {
            parent,
            text
          }
        }
      )
      expect(dispatch.mock.calls[1][0]).toEqual(
        {
          type: 'ss/tasks/SUBMIT_TASKS_SUCCESS',
          payload: {
            id: 'some-task-uuid-0',
            parent,
            text: 'some-text',
            created: 1234,
            status: 'not-started'
          }
        }
      )
    })
  })

  describe('client calls failure', () => {
    let error

    beforeEach(() => {
      error = new Error('some-error')
      client = { post: jest.fn(() => Promise.reject(error)) }
    })

    it('should dispatch correct actions', async () => {
      await thunks.createTask(text, parent)(getState, dispatch, { client })

      expect(dispatch).toHaveBeenCalledTimes(2)
      expect(dispatch.mock.calls[0][0]).toEqual(
        {
          type: 'ss/tasks/SUBMIT_TASKS_REQUEST',
          payload: {
            parent,
            text
          }
        }
      )
      expect(dispatch.mock.calls[1][0]).toEqual(
        {
          type: 'ss/tasks/SUBMIT_TASKS_FAILURE',
          payload: { error }
        }
      )
    })
  })
})

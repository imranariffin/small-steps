/* eslint-env jest */

import uuidv4 from 'uuidv4'

import thunks from 'ss/models/tasks/thunks'

jest.mock('uuidv4', () => ({ uuid: jest.fn() }))

describe('tasks thunks create task', () => {
  let dispatch, getState, parent, tasksService, text

  beforeEach(() => {
    parent = 'some-parent-id-0'
    text = 'some-text'
    tasksService = { save: jest.fn(task => Promise.resolve(task)) }
    dispatch = jest.fn()
    getState = jest.fn()
  })

  it('should call the correct POST endpoint with correct data', async () => {
    jest.spyOn(global, 'Date').mockImplementationOnce(() => ({
      toISOString: () => '2019-12-15T14:21:16.000Z'
    }))
    uuidv4.uuid = jest.fn(() => 'some-auto-generated-uuid')

    await thunks.createTask(text, parent)(getState, dispatch, { tasksService })

    expect(tasksService.save).toHaveBeenCalledWith(
      {
        created: '2019-12-15T14:21:16.000Z',
        id: 'some-auto-generated-uuid',
        parent: 'some-parent-id-0',
        status: 'not-started',
        text: 'some-text'
      }
    )
  })

  describe('tasksService calls successful', () => {
    it('should dispatch correct actions in correct order asynchronously', async () => {
      jest.spyOn(global, 'Date').mockImplementationOnce(() => ({
        toISOString: () => '2019-12-15T14:21:16.000Z'
      }))
      uuidv4.uuid = jest.fn(() => 'some-auto-generated-uuid')

      await thunks.createTask(text, parent)(getState, dispatch, { tasksService })

      expect(dispatch.mock.calls).toEqual([
        [
          {
            type: 'ss/tasks/SUBMIT_TASKS_REQUEST',
            payload: {
              parent,
              text
            }
          }
        ],
        [
          {
            type: 'ss/tasks/SUBMIT_TASKS_SUCCESS',
            payload: {
              id: 'some-auto-generated-uuid',
              parent,
              text: 'some-text',
              created: '2019-12-15T14:21:16.000Z',
              status: 'not-started'
            }
          }
        ]
      ])
    })
  })

  describe('tasksService calls failure', () => {
    let error

    beforeEach(() => {
      error = new Error('some-error')
      tasksService = { save: jest.fn(() => Promise.reject(error)) }
    })

    it('should dispatch correct actions', async () => {
      jest.spyOn(global, 'Date').mockImplementationOnce(() => ({
        toISOString: () => jest.fn()
      }))
      uuidv4.uuid = jest.fn(() => 'some-auto-generated-uuid')

      await thunks.createTask(text, parent)(getState, dispatch, { tasksService })

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

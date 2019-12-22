/* eslint-env jest */

import thunks from 'ss/models/tasks/thunks'

jest.mock('uuidv4', () => ({ uuid: jest.fn() }))

describe('tasks thunks create task', () => {
  let dispatch, getState, task, tasksService

  beforeEach(() => {
    task = {
      created: '2019-12-15T14:21:16.000Z',
      id: 'some-task-id',
      parent: 'some-goal-id',
      status: 'some-status',
      text: 'some-old-text'
    }
    tasksService = {
      update: jest.fn((id, { text }) => Promise.resolve({ ...task, text }))
    }
    dispatch = jest.fn()
    getState = jest.fn()
  })

  test('tasks service calls successful', async () => {
    await thunks.editTaskText(task.id, 'some-new-text')(
      getState,
      dispatch,
      { tasksService }
    )

    expect(tasksService.update.mock.calls).toEqual([
      ['some-task-id', { text: 'some-new-text' }]
    ])
    expect(dispatch.mock.calls).toEqual([
      [
        {
          type: 'ss/tasks/EDIT_TEXT_TASKS_REQUEST',
          payload: {
            id: 'some-task-id',
            text: 'some-new-text'
          }
        }
      ],
      [
        {
          type: 'ss/tasks/EDIT_TEXT_TASKS_SUCCESS',
          payload: {
            id: 'some-task-id',
            text: 'some-new-text'
          }
        }
      ]
    ])
  })

  test('tasks service getById calls failure', async () => {
    const error = Error('some-error-get-by-id')
    tasksService.update = jest.fn(() => Promise.reject(error))

    await thunks.editTaskText(task.id, 'some-new-text')(
      getState,
      dispatch,
      { tasksService }
    )

    expect(dispatch.mock.calls).toEqual([
      [
        {
          type: 'ss/tasks/EDIT_TEXT_TASKS_REQUEST',
          payload: {
            id: 'some-task-id',
            text: 'some-new-text'
          }
        }
      ],
      [
        {
          type: 'ss/tasks/EDIT_TEXT_TASKS_FAILURE',
          payload: {
            error
          }
        }
      ]
    ])
    expect(tasksService.update.mock.calls).toEqual([
      ['some-task-id', { text: 'some-new-text' }]
    ])
  })
})

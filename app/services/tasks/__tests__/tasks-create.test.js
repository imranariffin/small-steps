/* eslint-env jest */

import { uuid } from 'uuidv4'

import tasksService from 'ss/services/tasks/tasks-service'

jest.mock('uuidv4', () => ({ uuid: jest.fn() }))

describe('tasks service create', () => {
  let storage

  beforeEach(() => {
    uuid.mockImplementationOnce(() => '735f3627-4449-4be5-8fd8-01e03ad648af')
    jest.spyOn(global, 'Date').mockImplementationOnce(() => {
      return {
        toISOString: () => '2019-12-15T14:21:16.000Z'
      }
    })
    storage = {
      models: {
        Goal: {
          getById: jest.fn(id => {
            return Promise.resolve(
              {
                created: '2019-12-15T14:21:16.000Z',
                id: id,
                status: 'not-started',
                text: 'some-goal-text'
              }
            )
          })
        },
        Task: {
          create: jest.fn(task => Promise.resolve(
            {
              created: task.created,
              id: task.id,
              parent: task.parent,
              status: task.status,
              text: task.text
            }
          )),
          getById: jest.fn(id => Promise.resolve(
            {
              created: '2019-12-15T14:21:16.000Z',
              id: id,
              parent: 'some-grand-parent-id',
              status: 'not-started',
              text: 'some-task-parent-text'
            }
          ))
        }
      }
    }
  })

  test('calls correct storage method', async () => {
    const parent = 'some-task-parent-id'
    const text = 'some-text'

    await tasksService(storage).create(parent, text)

    expect(storage.models.Task.create.mock.calls).toEqual([
      [
        {
          created: '2019-12-15T14:21:16.000Z',
          id: '735f3627-4449-4be5-8fd8-01e03ad648af',
          parent: 'some-task-parent-id',
          status: 'not-started',
          text: 'some-text'
        }
      ]
    ])
  })

  test('successful creation returns created task', async () => {
    const parent = 'some-task-parent-id'
    const text = 'some-text'

    const taskCreated = await tasksService(storage).create(parent, text)

    expect(taskCreated).toEqual(
      {
        created: '2019-12-15T14:21:16.000Z',
        id: '735f3627-4449-4be5-8fd8-01e03ad648af',
        parent: 'some-task-parent-id',
        status: 'not-started',
        text: 'some-text'
      }
    )
  })

  test('throws eror on missing required field `parent`', async () => {
    const parent = undefined
    const text = 'some-text'

    const badPromise = tasksService(storage).create(parent, text)

    await expect(badPromise).rejects.toThrow(Error('Missing required field: parent'))
  })

  test('throws eror on missing required field `text`', async () => {
    const parent = 'some-task-parent-id'
    const text = undefined

    const badPromise = tasksService(storage).create(parent, text)

    await expect(badPromise).rejects.toThrow(Error('Missing required field: text'))
  })

  test('throws eror when `parent` does not exist', async () => {
    const parent = 'some-non-existing-task-id'
    const text = 'some-text'
    storage.models.Task.getById = jest.fn(() => Promise.resolve(undefined))
    storage.models.Goal.getById = jest.fn(() => Promise.resolve(undefined))

    const badPromise = tasksService(storage).create(parent, text)

    await expect(badPromise).rejects.toThrow(Error(`Parent '${parent}' does not exist`))
  })

  test('throws eror on storage failure', async () => {
    const parent = 'some-non-existing-task-id'
    const text = 'some-text'
    storage.models.Task.getById = jest.fn(() => Promise.resolve(undefined))
    storage.models.Goal.getById = jest.fn(() => Promise.reject(Error('some-error')))

    const badPromise = tasksService(storage).create(parent, text)

    await expect(badPromise).rejects.toThrow(Error('some-error'))
  })
})

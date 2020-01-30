/* eslint-env jest */

import tasksService from 'ss/services/tasks/tasks-service'

describe('tasks service get all', () => {
  let storage

  beforeEach(() => {
    storage = {
      models: {
        Task: {
          getAll: jest.fn(() => Promise.resolve([]))
        }
      }
    }
  })

  test('storage returns empty results successfully', async () => {
    const tasks = await tasksService(storage).getAll()

    expect(tasks).toEqual([])
  })

  test('storage returns list of goals successfully', async () => {
    const expected = ['some-task-0', 'some-task-1', 'some-task-2']
    storage.models.Task.getAll = jest.fn(() => Promise.resolve(expected))

    const tasks = await tasksService(storage).getAll()

    expect(tasks).toEqual(['some-task-0', 'some-task-1', 'some-task-2'])
  })

  test('storage throws error', async () => {
    storage.models.Task.getAll = jest.fn(
      () => Promise.reject(Error('some-error-from-storage'))
    )

    const badPromise = tasksService(storage).getAll()

    await expect(badPromise).rejects.toThrow(Error('some-error-from-storage'))
  })
})

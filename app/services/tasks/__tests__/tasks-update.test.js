/* eslint-env jest */

import tasksService from 'ss/services/tasks/tasks-service'

describe('tasks service update', () => {
  let storage, taskToBeUpdated

  beforeEach(() => {
    taskToBeUpdated = {
      id: 'some-task-id',
      status: 'some-status',
      text: 'some-task-text'
    }
    storage = {
      models: {
        Task: {
          getById: jest.fn((id) => Promise.resolve(taskToBeUpdated)),
          update: jest.fn((task) => Promise.resolve(task))
        }
      }
    }
  })

  test('returns updated task', async () => {
    const id = taskToBeUpdated.id
    const fields = taskToBeUpdated

    const taskUpdated = await tasksService(storage).update(id, fields)

    expect(taskUpdated).toEqual(taskToBeUpdated)
  })

  test('saves updated task to storage', async () => {
    const id = taskToBeUpdated.id
    const fields = taskToBeUpdated

    await tasksService(storage).update(id, fields)

    expect(storage.models.Task.update.mock.calls).toEqual([[taskToBeUpdated]])
  })

  test('throws error if task not exist', async () => {
    const id = taskToBeUpdated.id
    const fields = taskToBeUpdated
    storage.models.Task.getById = jest.fn(() => Promise.resolve(undefined))

    const badPromise = tasksService(storage).update(id, fields)

    await expect(badPromise).rejects.toThrow(
      Error('Task \'some-task-id\' does not exist')
    )
  })

  test('throws error if storage throws', async () => {
    const id = taskToBeUpdated.id
    const fields = taskToBeUpdated
    storage.models.Task.getById = jest.fn(
      () => Promise.reject(Error('some-error-from-storage'))
    )

    const badPromise = tasksService(storage).update(id, fields)

    await expect(badPromise).rejects.toThrow(Error('some-error-from-storage'))
  })
})

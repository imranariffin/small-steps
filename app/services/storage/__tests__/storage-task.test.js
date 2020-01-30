/* eslint-env jest */

import AsyncStorage from '@react-native-community/async-storage'

import storage from 'ss/services/storage'

jest.mock('@react-native-community/async-storage', () => {
  return {}
})

describe('storage Task init', () => {
  test('initializes storage first time', async () => {
    AsyncStorage.getItem = jest.fn(() => Promise.resolve(null))
    AsyncStorage.setItem = jest.fn(() => Promise.resolve())

    await storage.models.Task.init()

    expect(AsyncStorage.getItem.mock.calls).toEqual([['ss:tasks']])
    expect(AsyncStorage.setItem.mock.calls).toEqual([['ss:tasks', '[]']])
  })

  test('initializes storage but already initialized', async () => {
    AsyncStorage.getItem = jest.fn(() => Promise.resolve('[]'))
    AsyncStorage.setItem = jest.fn(() => Promise.resolve())

    await storage.models.Task.init()

    expect(AsyncStorage.getItem.mock.calls).toEqual([['ss:tasks']])
    expect(AsyncStorage.setItem.mock.calls).toEqual([])
  })
})

describe('storage Task get all', () => {
  test('calls correct AsyncStorage method correctly', async () => {
    AsyncStorage.getItem = jest.fn(() => Promise.resolve('[]'))

    await storage.models.Task.getAll()

    expect(AsyncStorage.getItem.mock.calls).toEqual([['ss:tasks']])
  })

  test('AsyncStorage returns tasks successfully', async () => {
    const expected = '["some-task-0", "some-task-1", "some-task-2"]'
    AsyncStorage.getItem = jest.fn(() => Promise.resolve(expected))

    const tasks = await storage.models.Task.getAll()

    expect(tasks).toEqual(['some-task-0', 'some-task-1', 'some-task-2'])
  })

  test('AsyncStorage throws error', async () => {
    AsyncStorage.getItem = jest.fn(() => Promise.reject(Error('some-error')))

    const badPromise = storage.models.Task.getAll()

    await expect(badPromise).rejects.toThrow(Error('some-error'))
  })
})

describe('storage Task create', () => {
  test('calls correct AsyncStorage method correctly', async () => {
    AsyncStorage.setItem = jest.fn(() => Promise.resolve())
    AsyncStorage.getItem = jest.fn(() => Promise.resolve('[]'))
    const task = {
      created: 'some-created-date',
      id: 'some-task-id',
      status: 'some-task-status',
      text: 'some-task-text'
    }

    const result = await storage.models.Task.create(task)

    expect(AsyncStorage.getItem.mock.calls).toEqual([['ss:tasks']])
    expect(AsyncStorage.setItem.mock.calls).toEqual([
      [
        'ss:tasks',
        '[{' + (
          '"created":"some-created-date",' +
          '"id":"some-task-id",' +
          '"status":"some-task-status",' +
          '"text":"some-task-text"'
        ) + '}]'
      ]
    ])
    expect(result).toEqual(task)
  })

  test('returns task created', async () => {
    AsyncStorage.setItem = jest.fn(() => Promise.resolve())
    AsyncStorage.getItem = jest.fn(() => Promise.resolve('[]'))
    const task = {
      created: 'some-created-date',
      id: 'some-task-id',
      status: 'some-task-status',
      text: 'some-task-text'
    }

    const result = await storage.models.Task.create(task)

    expect(result).toEqual(task)
  })

  test('AsyncStorage throws error', async () => {
    AsyncStorage.setItem = jest.fn(() => Promise.reject(Error('some-error')))
    const task = {
      created: 'some-created-date',
      id: 'some-task-id',
      status: 'some-task-status',
      text: 'some-task-text'
    }

    const badPromise = storage.models.Task.create(task)

    await expect(badPromise).rejects.toThrow(Error('some-error'))
  })
})

describe('storage Task get by id', () => {
  test('get task from storage correctly', async () => {
    const id = 'some-task-id'
    AsyncStorage.getItem = jest.fn(() => Promise.resolve('[]'))

    await storage.models.Task.getById(id)

    expect(AsyncStorage.getItem.mock.calls).toEqual([['ss:tasks']])
  })

  test('AsyncStorage returns tasks successfully', async () => {
    const expected = '[{"id":"some-task-0"}]'
    AsyncStorage.getItem = jest.fn(() => Promise.resolve(expected))

    const task = await storage.models.Task.getById('some-task-0')

    expect(task).toEqual({ id: 'some-task-0' })
  })

  test('AsyncStorage returns undefined when not exist', async () => {
    const expected = '[{"id":"some-task-9999"}]'
    AsyncStorage.getItem = jest.fn(() => Promise.resolve(expected))

    const task = await storage.models.Task.getById('some-task-0')

    expect(task).toEqual(undefined)
  })

  test('AsyncStorage throws error', async () => {
    AsyncStorage.getItem = jest.fn(() => Promise.reject(Error('some-error')))

    const badPromise = storage.models.Task.getById('some-task-0')

    await expect(badPromise).rejects.toThrow(Error('some-error'))
  })
})

describe('storage Task update', () => {
  test('save task to storage correctly', async () => {
    const task = { id: 'some-task-0', text: 'new-text' }
    const tasksExisting = '[{"id":"some-task-0","text":"old-text"},{"id":"some-task-1"}]'
    AsyncStorage.getItem = jest.fn(() => Promise.resolve(tasksExisting))
    AsyncStorage.setItem = jest.fn(() => Promise.resolve())

    await storage.models.Task.update(task)

    expect(AsyncStorage.setItem.mock.calls).toEqual([
      ['ss:tasks', '[{"id":"some-task-0","text":"new-text"},{"id":"some-task-1"}]']
    ])
  })

  test('AsyncStorage returns task successfully', async () => {
    const taskToBeUpdated = { id: 'some-task-0', text: 'new-text' }
    const tasksExisting = '[{"id":"some-task-0","text":"old-text"},{"id":"some-task-1"}]'
    AsyncStorage.getItem = jest.fn(() => Promise.resolve(tasksExisting))
    AsyncStorage.setItem = jest.fn(() => Promise.resolve())

    const task = await storage.models.Task.update(taskToBeUpdated)

    expect(task).toEqual(taskToBeUpdated)
  })

  test('throws error when not exist', async () => {
    const taskToBeUpdated = { id: 'some-task-0' }
    const expected = '[{"id":"some-task-9999"}]'
    AsyncStorage.getItem = jest.fn(() => Promise.resolve(expected))

    const badPromise = storage.models.Task.update(taskToBeUpdated)

    await expect(badPromise).rejects.toThrow(
      Error('Task \'some-task-0\' does not exist')
    )
  })

  test('AsyncStorage throws error', async () => {
    AsyncStorage.getItem = jest.fn(() => Promise.reject(Error('some-error')))

    const badPromise = storage.models.Task.getById('some-task-0')

    await expect(badPromise).rejects.toThrow(Error('some-error'))
  })
})

describe('storage Task delete', () => {
  test('delete from storage correctly', async () => {
    const tasksExisting = '[{"id":"some-task-0","text":"old-text"},{"id":"some-task-1"}]'
    AsyncStorage.getItem = jest.fn(() => Promise.resolve(tasksExisting))
    AsyncStorage.setItem = jest.fn(() => Promise.resolve())

    await storage.models.Task.delete('some-task-0')

    expect(AsyncStorage.setItem.mock.calls).toEqual([
      ['ss:tasks', '[{"id":"some-task-1"}]']
    ])
  })
})

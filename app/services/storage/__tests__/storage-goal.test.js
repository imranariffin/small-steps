/* eslint-env jest */

import AsyncStorage from '@react-native-community/async-storage'

import storage from 'ss/services/storage'

jest.mock('@react-native-community/async-storage', () => {
  return {}
})

describe('storage Goal init', () => {
  test('initializes storage first time', async () => {
    AsyncStorage.getItem = jest.fn(() => Promise.resolve(null))
    AsyncStorage.setItem = jest.fn(() => Promise.resolve())

    await storage.models.Goal.init()

    expect(AsyncStorage.getItem.mock.calls).toEqual([['ss:goals']])
    expect(AsyncStorage.setItem.mock.calls).toEqual([['ss:goals', '[]']])
  })

  test('initializes storage but already initialized', async () => {
    AsyncStorage.getItem = jest.fn(() => Promise.resolve('[]'))
    AsyncStorage.setItem = jest.fn(() => Promise.resolve())

    await storage.models.Goal.init()

    expect(AsyncStorage.getItem.mock.calls).toEqual([['ss:goals']])
    expect(AsyncStorage.setItem.mock.calls).toEqual([])
  })
})

describe('storage Goal get all', () => {
  test('calls correct AsyncStorage method correctly', async () => {
    AsyncStorage.getItem = jest.fn(() => Promise.resolve('[]'))

    await storage.models.Goal.getAll()

    expect(AsyncStorage.getItem.mock.calls).toEqual([['ss:goals']])
  })

  test('AsyncStorage returns goals successfully', async () => {
    const expected = '["some-goal-0", "some-goal-1", "some-goal-2"]'
    AsyncStorage.getItem = jest.fn(() => Promise.resolve(expected))

    const goals = await storage.models.Goal.getAll()

    expect(goals).toEqual(['some-goal-0', 'some-goal-1', 'some-goal-2'])
  })

  test('AsyncStorage throws error', async () => {
    AsyncStorage.getItem = jest.fn(() => Promise.reject(Error('some-error')))

    const badPromise = storage.models.Goal.getAll()

    await expect(badPromise).rejects.toThrow(Error('some-error'))
  })
})

describe('storage Goal create', () => {
  test('calls correct AsyncStorage method correctly', async () => {
    AsyncStorage.setItem = jest.fn(() => Promise.resolve())
    AsyncStorage.getItem = jest.fn(() => Promise.resolve('[]'))
    const goal = {
      created: 'some-created-date',
      id: 'some-goal-id',
      status: 'some-goal-status',
      text: 'some-goal-text'
    }

    const result = await storage.models.Goal.create(goal)

    expect(AsyncStorage.getItem.mock.calls).toEqual([['ss:goals']])
    expect(AsyncStorage.setItem.mock.calls).toEqual([
      [
        'ss:goals',
        '[{' + (
          '"created":"some-created-date",' +
          '"id":"some-goal-id",' +
          '"status":"some-goal-status",' +
          '"text":"some-goal-text"'
        ) + '}]'
      ]
    ])
    expect(result).toEqual(goal)
  })

  test('returns goal created', async () => {
    AsyncStorage.setItem = jest.fn(() => Promise.resolve())
    AsyncStorage.getItem = jest.fn(() => Promise.resolve('[]'))
    const goal = {
      created: 'some-created-date',
      id: 'some-goal-id',
      status: 'some-goal-status',
      text: 'some-goal-text'
    }

    const result = await storage.models.Goal.create(goal)

    expect(result).toEqual(goal)
  })

  test('AsyncStorage throws error', async () => {
    AsyncStorage.setItem = jest.fn(() => Promise.reject(Error('some-error')))
    const goal = {
      created: 'some-created-date',
      id: 'some-goal-id',
      status: 'some-goal-status',
      text: 'some-goal-text'
    }

    const badPromise = storage.models.Goal.create(goal)

    await expect(badPromise).rejects.toThrow(Error('some-error'))
  })
})

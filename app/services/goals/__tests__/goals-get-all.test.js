/* eslint-env jest */

import goalsService from 'ss/services/goals/goals-service'

describe('goals service get all', () => {
  let storage

  beforeEach(() => {
    storage = {
      models: {
        Goal: {
          getAll: jest.fn(() => Promise.resolve([]))
        }
      }
    }
  })

  test('storage returns empty results successfully', async () => {
    const goals = await goalsService(storage).getAll()

    expect(goals).toEqual([])
  })

  test('storage returns list of goals successfully', async () => {
    const expected = ['some-goals-0', 'some-goals-1', 'some-goals-2']
    storage.models.Goal.getAll = jest.fn(() => Promise.resolve(expected))

    const goals = await goalsService(storage).getAll()

    expect(goals).toEqual(['some-goals-0', 'some-goals-1', 'some-goals-2'])
  })

  test('storage throws error', async () => {
    storage.models.Goal.getAll = jest.fn(
      () => Promise.reject(Error('some-error-from-storage'))
    )

    const badPromise = goalsService(storage).getAll()

    await expect(badPromise).rejects.toThrow(Error('some-error-from-storage'))
  })
})

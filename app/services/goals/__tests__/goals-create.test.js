/* eslint-env jest */

import { uuid } from 'uuidv4'

import goalsService from 'ss/services/goals/goals-service'

jest.mock('uuidv4', () => ({ uuid: jest.fn() }))

describe('goals service create', () => {
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
          create: goal => Promise.resolve(
            {
              created: goal.created,
              id: goal.id,
              status: goal.status,
              text: goal.text
            }
          )
        }
      }
    }
  })

  test('create valid goal', async () => {
    const options = { text: 'some goals text' }

    const goal = await goalsService(storage).create(options)

    expect(goal.id).toEqual('735f3627-4449-4be5-8fd8-01e03ad648af')
    expect(goal.created).toEqual('2019-12-15T14:21:16.000Z')
    expect(goal.status).toEqual('not-started')
    expect(goal.text).toEqual('some goals text')
  })

  test('create invalid goal with no text', async () => {
    const options = { text: undefined }

    const promise = goalsService(storage).create(options)

    await expect(promise).rejects.toThrow(Error('Missing required field: text'))
  })

  test('storage throws some error', async () => {
    storage.models.Goal.create = () => Promise.reject(Error('Some storage error'))
    const options = { text: 'some goals text' }

    const promise = goalsService(storage).create(options)

    await expect(promise).rejects.toThrow(Error('Some storage error'))
  })
})

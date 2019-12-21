/* eslint-env jest */

import { tasksService } from 'ss/services/tasks/tasks-service'

describe('tasks service get all', () => {
  let storage

  beforeEach(() => {
    storage = {
      models: {
        Task: {
          getAll: () => Promise.resolve(
            [
              {
                created: '2019-12-15T14:21:16.000Z',
                id: '735f3627-4449-4be5-8fd8-aaaaaaaaaaaa',
                status: 'completed',
                text: 'some text'
              },
              {
                created: '2019-11-15T14:21:16.000Z',
                id: '735f3627-4449-4be5-8fd8-bbbbbbbbbbbb',
                status: 'in-progress',
                text: 'some text'
              },
              {
                created: '2019-10-15T14:21:16.000Z',
                id: '735f3627-4449-4be5-8fd8-cccccccccccc',
                status: 'no-started',
                text: 'some text'
              }
            ]
          )
        }
      }
    }
  })

  test('get all tasks from the storage', async () => {
    const tasks = await tasksService(storage).getAll()

    expect(tasks).toEqual(
      [
        {
          created: '2019-12-15T14:21:16.000Z',
          id: '735f3627-4449-4be5-8fd8-aaaaaaaaaaaa',
          status: 'completed',
          text: 'some text'
        },
        {
          created: '2019-11-15T14:21:16.000Z',
          id: '735f3627-4449-4be5-8fd8-bbbbbbbbbbbb',
          status: 'in-progress',
          text: 'some text'
        },
        {
          created: '2019-10-15T14:21:16.000Z',
          id: '735f3627-4449-4be5-8fd8-cccccccccccc',
          status: 'no-started',
          text: 'some text'
        }
      ]
    )
  })
})

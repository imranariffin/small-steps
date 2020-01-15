/* eslint-env jest */

import AsyncStorage from '@react-native-community/async-storage'

import tasksService from 'ss/services/tasks'
import storage from 'ss/services/storage'

jest.mock('@react-native-community/async-storage', () => {
  let _storage = {}
  return {
    clear: () => {
      _storage = {}
      return Promise.resolve()
    },
    getItem: (key) => {
      if (!(key in _storage)) {
        return Promise.resolve(null)
      }
      return Promise.resolve(_storage[key])
    },
    setItem: (key, value) => {
      if (typeof value !== 'string') {
        throw Error()
      }
      _storage[key] = value
      return Promise.resolve()
    }
  }
})

describe('tasks service set status', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
  })

  test('task with no sibling from not-started to in-progress', async () => {
    const tasks = [
      {
        id: 'task-parent-id-0',
        parent: 'some-goal-id-0',
        status: 'not-started'
      },
      {
        id: 'task-child-id-0',
        parent: 'task-parent-id-0',
        status: 'not-started'
      }
    ]
    await AsyncStorage.setItem('ss:tasks', JSON.stringify(tasks))

    await tasksService.setStatus('task-child-id-0', 'in-progress')

    const tasksUpdated = await AsyncStorage.getItem('ss:tasks')
    const taskUpdated = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-0')
    const taskParent = JSON.parse(tasksUpdated).find(t => t.id === 'task-parent-id-0')
    expect(taskUpdated.status).toEqual('in-progress')
    expect(taskParent.status).toEqual('in-progress')
  })

  test('task with no sibling from in-progress to not-started', async () => {
    const tasks = [
      {
        id: 'task-parent-id-0',
        parent: 'some-goal-id-0',
        status: 'in-progress'
      },
      {
        id: 'task-child-id-0',
        parent: 'task-parent-id-0',
        status: 'in-progress'
      }
    ]
    await AsyncStorage.setItem('ss:tasks', JSON.stringify(tasks))

    await tasksService.setStatus('task-child-id-0', 'not-started')

    const tasksUpdated = await AsyncStorage.getItem('ss:tasks')
    const taskUpdated = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-0')
    const taskParent = JSON.parse(tasksUpdated).find(t => t.id === 'task-parent-id-0')
    expect(taskUpdated.status).toEqual('not-started')
    expect(taskParent.status).toEqual('not-started')
  })

  test('task with no sibling from in-progress to completed', async () => {
    const tasks = [
      {
        id: 'task-parent-id-0',
        parent: 'some-goal-id-0',
        status: 'in-progress'
      },
      {
        id: 'task-child-id-0',
        parent: 'task-parent-id-0',
        status: 'in-progress'
      }
    ]
    await AsyncStorage.setItem('ss:tasks', JSON.stringify(tasks))

    await tasksService.setStatus('task-child-id-0', 'completed')

    const tasksUpdated = await AsyncStorage.getItem('ss:tasks')
    const taskUpdated = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-0')
    const taskParent = JSON.parse(tasksUpdated).find(t => t.id === 'task-parent-id-0')
    expect(taskUpdated.status).toEqual('completed')
    expect(taskParent.status).toEqual('completed')
  })

  test('task with no sibling from completed to in-progress', async () => {
    const tasks = [
      {
        id: 'task-parent-id-0',
        parent: 'some-goal-id-0',
        status: 'completed'
      },
      {
        id: 'task-child-id-0',
        parent: 'task-parent-id-0',
        status: 'completed'
      }
    ]
    await AsyncStorage.setItem('ss:tasks', JSON.stringify(tasks))

    await tasksService.setStatus('task-child-id-0', 'in-progress')

    const tasksUpdated = await AsyncStorage.getItem('ss:tasks')
    const taskUpdated = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-0')
    const taskParent = JSON.parse(tasksUpdated).find(t => t.id === 'task-parent-id-0')
    expect(taskUpdated.status).toEqual('in-progress')
    expect(taskParent.status).toEqual('in-progress')
  })

  test('task with one not-started sibling from not-started to in-progress', async () => {
    const tasks = [
      {
        id: 'task-parent-id-0',
        parent: 'goal-id-0',
        status: 'not-started'
      },
      {
        id: 'task-child-id-0',
        parent: 'task-parent-id-0',
        status: 'not-started'
      },
      {
        id: 'task-child-id-1',
        parent: 'task-parent-id-0',
        status: 'not-started'
      }
    ]
    await AsyncStorage.setItem('ss:tasks', JSON.stringify(tasks))

    await tasksService.setStatus('task-child-id-0', 'in-progress')

    const tasksUpdated = await AsyncStorage.getItem('ss:tasks')
    const taskUpdated = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-0')
    const taskSibling = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-1')
    const taskParent = JSON.parse(tasksUpdated).find(t => t.id === 'task-parent-id-0')
    expect(taskUpdated.status).toEqual('in-progress')
    expect(taskSibling.status).toEqual('not-started')
    expect(taskParent.status).toEqual('in-progress')
  })

  test('task with one not-started sibling from in-progress to not-started', async () => {
    const tasks = [
      {
        id: 'task-parent-id-0',
        parent: 'goal-id-0',
        status: 'in-progress'
      },
      {
        id: 'task-child-id-0',
        parent: 'task-parent-id-0',
        status: 'in-progress'
      },
      {
        id: 'task-child-id-1',
        parent: 'task-parent-id-0',
        status: 'not-started'
      }
    ]
    await AsyncStorage.setItem('ss:tasks', JSON.stringify(tasks))

    await tasksService.setStatus('task-child-id-0', 'not-started')

    const tasksUpdated = await AsyncStorage.getItem('ss:tasks')
    const taskUpdated = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-0')
    const taskSibling = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-1')
    const taskParent = JSON.parse(tasksUpdated).find(t => t.id === 'task-parent-id-0')
    expect(taskUpdated.status).toEqual('not-started')
    expect(taskSibling.status).toEqual('not-started')
    expect(taskParent.status).toEqual('not-started')
  })

  test('task with one not-started sibling from in-progress to completed', async () => {
    const tasks = [
      {
        id: 'task-parent-id-0',
        parent: 'goal-id-0',
        status: 'in-progress'
      },
      {
        id: 'task-child-id-0',
        parent: 'task-parent-id-0',
        status: 'in-progress'
      },
      {
        id: 'task-child-id-1',
        parent: 'task-parent-id-0',
        status: 'not-started'
      }
    ]
    await AsyncStorage.setItem('ss:tasks', JSON.stringify(tasks))

    await tasksService.setStatus('task-child-id-0', 'completed')

    const tasksUpdated = await AsyncStorage.getItem('ss:tasks')
    const taskUpdated = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-0')
    const taskSibling = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-1')
    const taskParent = JSON.parse(tasksUpdated).find(t => t.id === 'task-parent-id-0')
    expect(taskUpdated.status).toEqual('completed')
    expect(taskSibling.status).toEqual('not-started')
    expect(taskParent.status).toEqual('in-progress')
  })

  test('task with one not-started sibling from completed to in-progress', async () => {
    const tasks = [
      {
        id: 'task-parent-id-0',
        parent: 'goal-id-0',
        status: 'in-progress'
      },
      {
        id: 'task-child-id-0',
        parent: 'task-parent-id-0',
        status: 'completed'
      },
      {
        id: 'task-child-id-1',
        parent: 'task-parent-id-0',
        status: 'not-started'
      }
    ]
    await AsyncStorage.setItem('ss:tasks', JSON.stringify(tasks))

    await tasksService.setStatus('task-child-id-0', 'in-progress')

    const tasksUpdated = await AsyncStorage.getItem('ss:tasks')
    const taskUpdated = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-0')
    const taskSibling = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-1')
    const taskParent = JSON.parse(tasksUpdated).find(t => t.id === 'task-parent-id-0')
    expect(taskUpdated.status).toEqual('in-progress')
    expect(taskSibling.status).toEqual('not-started')
    expect(taskParent.status).toEqual('in-progress')
  })

  test('task with one in-progress sibling from not-started to in-progress', async () => {
    const tasks = [
      {
        id: 'task-parent-id-0',
        parent: 'goal-id-0',
        status: 'in-progress'
      },
      {
        id: 'task-child-id-0',
        parent: 'task-parent-id-0',
        status: 'not-started'
      },
      {
        id: 'task-child-id-1',
        parent: 'task-parent-id-0',
        status: 'in-progress'
      }
    ]
    await AsyncStorage.setItem('ss:tasks', JSON.stringify(tasks))

    await tasksService.setStatus('task-child-id-0', 'in-progress')

    const tasksUpdated = await AsyncStorage.getItem('ss:tasks')
    const taskUpdated = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-0')
    const taskSibling = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-1')
    const taskParent = JSON.parse(tasksUpdated).find(t => t.id === 'task-parent-id-0')
    expect(taskUpdated.status).toEqual('in-progress')
    expect(taskSibling.status).toEqual('in-progress')
    expect(taskParent.status).toEqual('in-progress')
  })

  test('task with one in-progress sibling from in-progress to not-started', async () => {
    const tasks = [
      {
        id: 'task-parent-id-0',
        parent: 'goal-id-0',
        status: 'in-progress'
      },
      {
        id: 'task-child-id-0',
        parent: 'task-parent-id-0',
        status: 'in-progress'
      },
      {
        id: 'task-child-id-1',
        parent: 'task-parent-id-0',
        status: 'in-progress'
      }
    ]
    await AsyncStorage.setItem('ss:tasks', JSON.stringify(tasks))

    await tasksService.setStatus('task-child-id-0', 'not-started')

    const tasksUpdated = await AsyncStorage.getItem('ss:tasks')
    const taskUpdated = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-0')
    const taskSibling = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-1')
    const taskParent = JSON.parse(tasksUpdated).find(t => t.id === 'task-parent-id-0')
    expect(taskUpdated.status).toEqual('not-started')
    expect(taskSibling.status).toEqual('in-progress')
    expect(taskParent.status).toEqual('in-progress')
  })

  test('task with one in-progress sibling from in-progress to completed', async () => {
    const tasks = [
      {
        id: 'task-parent-id-0',
        parent: 'goal-id-0',
        status: 'in-progress'
      },
      {
        id: 'task-child-id-0',
        parent: 'task-parent-id-0',
        status: 'in-progress'
      },
      {
        id: 'task-child-id-1',
        parent: 'task-parent-id-0',
        status: 'in-progress'
      }
    ]
    await AsyncStorage.setItem('ss:tasks', JSON.stringify(tasks))

    await tasksService.setStatus('task-child-id-0', 'completed')

    const tasksUpdated = await AsyncStorage.getItem('ss:tasks')
    const taskUpdated = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-0')
    const taskSibling = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-1')
    const taskParent = JSON.parse(tasksUpdated).find(t => t.id === 'task-parent-id-0')
    expect(taskUpdated.status).toEqual('completed')
    expect(taskSibling.status).toEqual('in-progress')
    expect(taskParent.status).toEqual('in-progress')
  })

  test('task with one in-progress sibling from completed to in-progress', async () => {
    const tasks = [
      {
        id: 'task-parent-id-0',
        parent: 'goal-id-0',
        status: 'in-progress'
      },
      {
        id: 'task-child-id-0',
        parent: 'task-parent-id-0',
        status: 'completed'
      },
      {
        id: 'task-child-id-1',
        parent: 'task-parent-id-0',
        status: 'in-progress'
      }
    ]
    await AsyncStorage.setItem('ss:tasks', JSON.stringify(tasks))

    await tasksService.setStatus('task-child-id-0', 'in-progress')

    const tasksUpdated = await AsyncStorage.getItem('ss:tasks')
    const taskUpdated = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-0')
    const taskSibling = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-1')
    const taskParent = JSON.parse(tasksUpdated).find(t => t.id === 'task-parent-id-0')
    expect(taskUpdated.status).toEqual('in-progress')
    expect(taskSibling.status).toEqual('in-progress')
    expect(taskParent.status).toEqual('in-progress')
  })

  test('task with one completed sibling from not-started to in-progress', async () => {
    const tasks = [
      {
        id: 'task-parent-id-0',
        parent: 'goal-id-0',
        status: 'in-progress'
      },
      {
        id: 'task-child-id-0',
        parent: 'task-parent-id-0',
        status: 'not-started'
      },
      {
        id: 'task-child-id-1',
        parent: 'task-parent-id-0',
        status: 'completed'
      }
    ]
    await AsyncStorage.setItem('ss:tasks', JSON.stringify(tasks))

    await tasksService.setStatus('task-child-id-0', 'in-progress')

    const tasksUpdated = await AsyncStorage.getItem('ss:tasks')
    const taskUpdated = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-0')
    const taskSibling = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-1')
    const taskParent = JSON.parse(tasksUpdated).find(t => t.id === 'task-parent-id-0')
    expect(taskUpdated.status).toEqual('in-progress')
    expect(taskSibling.status).toEqual('completed')
    expect(taskParent.status).toEqual('in-progress')
  })

  test('task with one completed sibling from in-progress to not-started', async () => {
    const tasks = [
      {
        id: 'task-parent-id-0',
        parent: 'goal-id-0',
        status: 'in-progress'
      },
      {
        id: 'task-child-id-0',
        parent: 'task-parent-id-0',
        status: 'in-progress'
      },
      {
        id: 'task-child-id-1',
        parent: 'task-parent-id-0',
        status: 'completed'
      }
    ]
    await AsyncStorage.setItem('ss:tasks', JSON.stringify(tasks))

    await tasksService.setStatus('task-child-id-0', 'not-started')

    const tasksUpdated = await AsyncStorage.getItem('ss:tasks')
    const taskUpdated = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-0')
    const taskSibling = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-1')
    const taskParent = JSON.parse(tasksUpdated).find(t => t.id === 'task-parent-id-0')
    expect(taskUpdated.status).toEqual('not-started')
    expect(taskSibling.status).toEqual('completed')
    expect(taskParent.status).toEqual('in-progress')
  })

  test('task with one completed sibling from in-progress to completed', async () => {
    const tasks = [
      {
        id: 'task-parent-id-0',
        parent: 'goal-id-0',
        status: 'in-progress'
      },
      {
        id: 'task-child-id-0',
        parent: 'task-parent-id-0',
        status: 'in-progress'
      },
      {
        id: 'task-child-id-1',
        parent: 'task-parent-id-0',
        status: 'completed'
      }
    ]
    await AsyncStorage.setItem('ss:tasks', JSON.stringify(tasks))

    await tasksService.setStatus('task-child-id-0', 'completed')

    const tasksUpdated = await AsyncStorage.getItem('ss:tasks')
    const taskUpdated = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-0')
    const taskSibling = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-1')
    const taskParent = JSON.parse(tasksUpdated).find(t => t.id === 'task-parent-id-0')
    expect(taskUpdated.status).toEqual('completed')
    expect(taskSibling.status).toEqual('completed')
    expect(taskParent.status).toEqual('completed')
  })

  test('task with one completed sibling from completed to in-progress', async () => {
    const tasks = [
      {
        id: 'task-parent-id-0',
        parent: 'goal-id-0',
        status: 'completed'
      },
      {
        id: 'task-child-id-0',
        parent: 'task-parent-id-0',
        status: 'completed'
      },
      {
        id: 'task-child-id-1',
        parent: 'task-parent-id-0',
        status: 'completed'
      }
    ]
    await AsyncStorage.setItem('ss:tasks', JSON.stringify(tasks))

    await tasksService.setStatus('task-child-id-0', 'in-progress')

    const tasksUpdated = await AsyncStorage.getItem('ss:tasks')
    const taskUpdated = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-0')
    const taskSibling = JSON.parse(tasksUpdated).find(t => t.id === 'task-child-id-1')
    const taskParent = JSON.parse(tasksUpdated).find(t => t.id === 'task-parent-id-0')
    expect(taskUpdated.status).toEqual('in-progress')
    expect(taskSibling.status).toEqual('completed')
    expect(taskParent.status).toEqual('in-progress')
  })
})

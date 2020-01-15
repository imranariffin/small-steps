/* eslint-env jest */

import AsyncStorage from '@react-native-community/async-storage'

import tasksService from 'ss/services/tasks'

describe('tasks service set status', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
  })

  const testCases = [
    {
      name: 'task with no sibling from not-started to in-progress',
      statusNext: 'in-progress',
      tasksPrev: [
        { id: 'task-parent-0', parent: 'goal-0', status: 'not-started' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'not-started' }
      ],
      expected: [
        { id: 'task-parent-0', parent: 'goal-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'in-progress' }
      ]
    },
    {
      name: 'task with no sibling from in-progress to not-started',
      statusNext: 'not-started',
      tasksPrev: [
        { id: 'task-parent-0', parent: 'goal-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'in-progress' }
      ],
      expected: [
        { id: 'task-parent-0', parent: 'goal-0', status: 'not-started' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'not-started' }
      ]
    },
    {
      name: 'task with no sibling from in-progress to completed',
      statusNext: 'completed',
      tasksPrev: [
        { id: 'task-parent-0', parent: 'goal-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'in-progress' }
      ],
      expected: [
        { id: 'task-parent-0', parent: 'goal-0', status: 'completed' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'completed' }
      ]
    },
    {
      name: 'task with no sibling from completed to in-progress',
      statusNext: 'in-progress',
      tasksPrev: [
        { id: 'task-parent-0', parent: 'goal-0', status: 'completed' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'completed' }
      ],
      expected: [
        { id: 'task-parent-0', parent: 'goal-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'in-progress' }
      ]
    },
    {
      name: 'task with one not-started sibling from not-started to in-progress',
      statusNext: 'in-progress',
      tasksPrev: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'not-started' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'not-started' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'not-started' }
      ],
      expected: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'in-progress' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'not-started' }
      ]
    },
    {
      name: 'task with one not-started sibling from in-progress to not-started',
      statusNext: 'not-started',
      tasksPrev: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'in-progress' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'not-started' }
      ],
      expected: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'not-started' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'not-started' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'not-started' }
      ]
    },
    {
      name: 'task with one not-started sibling from in-progress to completed',
      statusNext: 'completed',
      tasksPrev: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'in-progress' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'not-started' }
      ],
      expected: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'completed' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'not-started' }
      ]
    },
    {
      name: 'task with one not-started sibling from completed to in-progress',
      statusNext: 'in-progress',
      tasksPrev: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'completed' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'not-started' }
      ],
      expected: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'in-progress' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'not-started' }
      ]
    },
    {
      name: 'task with one in-progress sibling from not-started to in-progress',
      statusNext: 'in-progress',
      tasksPrev: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'in-started' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'in-progress' }
      ],
      expected: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'in-progress' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'in-progress' }
      ]
    },
    {
      name: 'task with one in-progress sibling from in-progress to not-started',
      statusNext: 'not-started',
      tasksPrev: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'in-progress' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'in-progress' }
      ],
      expected: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'not-started' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'in-progress' }
      ]
    },
    {
      name: 'task with one in-progress sibling from in-progress to completed',
      statusNext: 'completed',
      tasksPrev: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'in-progress' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'in-progress' }
      ],
      expected: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'completed' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'in-progress' }
      ]
    },
    {
      name: 'task with one in-progress sibling from completed to in-progress',
      statusNext: 'in-progress',
      tasksPrev: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'completed' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'in-progress' }
      ],
      expected: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'in-progress' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'in-progress' }
      ]
    },
    {
      name: 'task with one completed sibling from not-started to in-progress',
      statusNext: 'in-progress',
      tasksPrev: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'not-started' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'completed' }
      ],
      expected: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'in-progress' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'completed' }
      ]
    },
    {
      name: 'task with one completed sibling from in-progress to not-started',
      statusNext: 'not-started',
      tasksPrev: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'in-progress' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'completed' }
      ],
      expected: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'not-started' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'completed' }
      ]
    },
    {
      name: 'task with one completed sibling from in-progress to completed',
      statusNext: 'completed',
      tasksPrev: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'in-progress' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'completed' }
      ],
      expected: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'completed' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'completed' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'completed' }
      ]
    },
    {
      name: 'task with one completed sibling from completed to in-progress',
      statusNext: 'in-progress',
      tasksPrev: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'completed' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'completed' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'completed' }
      ],
      expected: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-child-0', parent: 'task-parent-0', status: 'in-progress' },
        { id: 'task-child-1', parent: 'task-parent-0', status: 'completed' }
      ]
    }
  ]

  testCases.forEach((testCase) => {
    const { name } = testCase
    test(name, async () => {
      const { expected, statusNext, tasksPrev } = testCase
      await AsyncStorage.setItem('ss:tasks', JSON.stringify(tasksPrev))

      await tasksService.setStatus('task-child-0', statusNext)

      const tasksNext = JSON.parse(await AsyncStorage.getItem('ss:tasks'))
      expect(new Set(tasksNext)).toEqual(new Set(expected))
    })
  })
})

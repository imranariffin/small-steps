/* eslint-env jest */

import AsyncStorage from '@react-native-community/async-storage'

import tasksService from 'ss/services/tasks'

describe('tasks service set status not-deep', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
  })

  const testCases = [
    {
      name: 'sub-task with no sibling from not-started to in-progress',
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
      name: 'sub-task with no sibling from in-progress to not-started',
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
      name: 'sub-task with no sibling from in-progress to completed',
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
      name: 'sub-task with no sibling from completed to in-progress',
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
      name: 'sub-task with one not-started sibling from not-started to in-progress',
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
      name: 'sub-task with one not-started sibling from in-progress to not-started',
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
      name: 'sub-task with one not-started sibling from in-progress to completed',
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
      name: 'sub-task with one not-started sibling from completed to in-progress',
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
      name: 'sub-task with one in-progress sibling from not-started to in-progress',
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
      name: 'sub-task with one in-progress sibling from in-progress to not-started',
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
      name: 'sub-task with one in-progress sibling from in-progress to completed',
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
      name: 'sub-task with one in-progress sibling from completed to in-progress',
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
      name: 'sub-task with one completed sibling from not-started to in-progress',
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
      name: 'sub-task with one completed sibling from in-progress to not-started',
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
      name: 'sub-task with one completed sibling from in-progress to completed',
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
      name: 'sub-task with one completed sibling from completed to in-progress',
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

      await tasksService.setStatus('task-child-0', statusNext, [])

      const tasksNext = JSON.parse(await AsyncStorage.getItem('ss:tasks'))
      expect(new Set(tasksNext)).toEqual(new Set(expected))
    })
  })
})

describe('tasks service set status deeply nested', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
  })

  const testCases = [
    {
      name: 'sub-sub-task with all completed siblings from completed to in-progress',
      statusNext: 'in-progress',
      tasksPrev: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'completed' },
        { id: 'task-sub-0', parent: 'task-parent-0', status: 'completed' },
        { id: 'task-sub-sub-0', parent: 'task-sub-0', status: 'completed' },
        { id: 'task-sub-sub-1', parent: 'task-sub-0', status: 'completed' },
        { id: 'task-sub-sub-2', parent: 'task-sub-0', status: 'completed' }
      ],
      expectedAffectedStatuses: [
        { id: 'task-parent-0', status: 'in-progress' },
        { id: 'task-sub-0', status: 'in-progress' },
        { id: 'task-sub-sub-0', status: 'in-progress' },
      ],
      expectedTasksNext: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-sub-0', parent: 'task-parent-0', status: 'in-progress' },
        { id: 'task-sub-sub-0', parent: 'task-sub-0', status: 'in-progress' },
        { id: 'task-sub-sub-1', parent: 'task-sub-0', status: 'completed' },
        { id: 'task-sub-sub-2', parent: 'task-sub-0', status: 'completed' }
      ]
    },
    {
      name: 'sub-sub-task with all completed siblings from in-progress to completed',
      statusNext: 'completed',
      tasksPrev: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-sub-0', parent: 'task-parent-0', status: 'in-progress' },
        { id: 'task-sub-sub-0', parent: 'task-sub-0', status: 'in-progress' },
        { id: 'task-sub-sub-1', parent: 'task-sub-0', status: 'completed' },
        { id: 'task-sub-sub-2', parent: 'task-sub-0', status: 'completed' }
      ],
      expectedAffectedStatuses: [
        { id: 'task-parent-0', status: 'completed' },
        { id: 'task-sub-0', status: 'completed' },
        { id: 'task-sub-sub-0', status: 'completed' },
      ],
      expectedTasksNext: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'completed' },
        { id: 'task-sub-0', parent: 'task-parent-0', status: 'completed' },
        { id: 'task-sub-sub-0', parent: 'task-sub-0', status: 'completed' },
        { id: 'task-sub-sub-1', parent: 'task-sub-0', status: 'completed' },
        { id: 'task-sub-sub-2', parent: 'task-sub-0', status: 'completed' }
      ]
    },
    {
      name: 'sub-sub-task with all not-started siblings from not-started to in-progress',
      statusNext: 'in-progress',
      tasksPrev: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'not-started' },
        { id: 'task-sub-0', parent: 'task-parent-0', status: 'not-started' },
        { id: 'task-sub-sub-0', parent: 'task-sub-0', status: 'not-started' },
        { id: 'task-sub-sub-1', parent: 'task-sub-0', status: 'not-started' },
        { id: 'task-sub-sub-2', parent: 'task-sub-0', status: 'not-started' }
      ],
      expectedAffectedStatuses: [
        { id: 'task-parent-0', status: 'in-progress' },
        { id: 'task-sub-0', status: 'in-progress' },
        { id: 'task-sub-sub-0', status: 'in-progress' },
      ],
      expectedTasksNext: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-sub-0', parent: 'task-parent-0', status: 'in-progress' },
        { id: 'task-sub-sub-0', parent: 'task-sub-0', status: 'in-progress' },
        { id: 'task-sub-sub-1', parent: 'task-sub-0', status: 'not-started' },
        { id: 'task-sub-sub-2', parent: 'task-sub-0', status: 'not-started' }
      ]
    },
    {
      name: 'sub-sub-task with all not-started siblings from in-progress to not-started',
      statusNext: 'not-started',
      tasksPrev: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-sub-0', parent: 'task-parent-0', status: 'in-progress' },
        { id: 'task-sub-1', parent: 'task-parent-0', status: 'in-progress' },
        { id: 'task-sub-sub-0', parent: 'task-sub-0', status: 'in-progress' },
        { id: 'task-sub-sub-1', parent: 'task-sub-0', status: 'not-started' },
        { id: 'task-sub-sub-2', parent: 'task-sub-0', status: 'not-started' }
      ],
      expectedAffectedStatuses: [
        { id: 'task-sub-0', status: 'not-started' },
        { id: 'task-sub-sub-0', status: 'not-started' },
      ],
      expectedTasksNext: [
        { id: 'task-parent-0', parent: 'goal-id-0', status: 'in-progress' },
        { id: 'task-sub-0', parent: 'task-parent-0', status: 'not-started' },
        { id: 'task-sub-1', parent: 'task-parent-0', status: 'in-progress' },
        { id: 'task-sub-sub-0', parent: 'task-sub-0', status: 'not-started' },
        { id: 'task-sub-sub-1', parent: 'task-sub-0', status: 'not-started' },
        { id: 'task-sub-sub-2', parent: 'task-sub-0', status: 'not-started' }
      ]
    }
  ]

  testCases.forEach((testCase) => {
    const { name } = testCase
    test(name, async () => {
      const { expectedAffectedStatuses, expectedTasksNext, statusNext, tasksPrev } = testCase
      await AsyncStorage.setItem('ss:tasks', JSON.stringify(tasksPrev))

      const affectedStatuses = await tasksService.setStatus('task-sub-sub-0', statusNext, [])

      const tasksNext = JSON.parse(await AsyncStorage.getItem('ss:tasks'))
      expect(affectedStatuses.length).toEqual(expectedAffectedStatuses.length)
      expect(new Set(affectedStatuses)).toEqual(new Set(expectedAffectedStatuses))
      expect(new Set(tasksNext)).toEqual(new Set(expectedTasksNext))
    })
  })
})

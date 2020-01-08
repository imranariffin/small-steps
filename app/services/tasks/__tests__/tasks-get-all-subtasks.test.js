/* eslint-env jest */

import tasksService from 'ss/services/tasks/tasks-service'

describe('tasks service get all subtasks', () => {
  let storage
  window.console.log = jest.fn()

  beforeEach(() => {
    storage = {
      models: {
        Task: {
          getAll: jest.fn(() => Promise.resolve([]))
        }
      }
    }
  })

  test('single subtask', () => {
    const all = [
      {
        id: 'some-task-01',
        parent: 'some-task-00'
      },
      {
        id: 'some-task-00',
        parent: 'some-goal-00'
      }
    ]

    const subtasks = tasksService(storage).getAllSubtasks('some-task-00', all)

    expect(subtasks).toEqual(['some-task-01'])
  })

  test('multiple subtasks', () => {
    const all = [
      {
        id: 'some-task-01',
        parent: 'some-task-00'
      },
      {
        id: 'some-task-02',
        parent: 'some-task-00'
      },
      {
        id: 'some-task-00',
        parent: 'some-goal-00'
      }
    ]

    const subtasks = tasksService(storage).getAllSubtasks('some-task-00', all)

    expect(new Set(subtasks)).toEqual(new Set(['some-task-01', 'some-task-02']))
  })

  test('single sub-sub-task', () => {
    const all = [
      {
        id: 'some-task-01',
        parent: 'some-task-00'
      },
      {
        id: 'some-task-02',
        parent: 'some-task-01'
      },
      {
        id: 'some-task-00',
        parent: 'some-goal-00'
      }
    ]

    const subtasks = tasksService(storage).getAllSubtasks('some-task-00', all)

    expect(new Set(subtasks)).toEqual(new Set(['some-task-01', 'some-task-02']))
  })

  test('single sub-sub-sub-task', () => {
    const all = [
      {
        id: 'some-task-01',
        parent: 'some-task-00'
      },
      {
        id: 'some-task-02',
        parent: 'some-task-01'
      },
      {
        id: 'some-task-03',
        parent: 'some-task-02'
      },
      {
        id: 'some-task-00',
        parent: 'some-goal-00'
      }
    ]

    const subtasks = tasksService(storage).getAllSubtasks('some-task-00', all)

    expect(new Set(subtasks)).toEqual(new Set(['some-task-01', 'some-task-02', 'some-task-03']))
  })

  test('edge cases', () => {
    const testCases = [
      {
        all: [
          {
            id: 'some-task-01',
            parent: 'some-task-00'
          },
          {
            id: 'some-task-02',
            parent: 'some-task-01'
          },
          {
            id: 'some-task-03',
            parent: 'some-task-02'
          },
          {
            id: 'some-task-00',
            parent: 'some-goal-00'
          }
        ],
        expected: new Set(['some-task-02', 'some-task-03']),
        id: 'some-task-01'
      },
      {
        all: [
          {
            id: 'some-task-01',
            parent: 'some-task-00'
          },
          {
            id: 'some-task-02',
            parent: 'some-task-01'
          },
          {
            id: 'some-task-03',
            parent: 'some-task-01'
          },
          {
            id: 'some-task-04',
            parent: 'some-task-02'
          },
          {
            id: 'some-task-05',
            parent: 'some-task-02'
          },
          {
            id: 'some-task-06',
            parent: 'some-task-03'
          },
          {
            id: 'some-task-07',
            parent: 'some-task-02'
          },
          {
            id: 'some-task-08',
            parent: 'some-task-03'
          },
          {
            id: 'some-task-00',
            parent: 'some-goal-00'
          }
        ],
        expected: new Set([
          'some-task-02',
          'some-task-03',
          'some-task-04',
          'some-task-05',
          'some-task-06',
          'some-task-07',
          'some-task-08'
        ]),
        id: 'some-task-01'
      }
    ]
    testCases.forEach(testCase => {
      const subtasks = tasksService(storage).getAllSubtasks(testCase.id, testCase.all)

      expect(new Set(subtasks)).toEqual(testCase.expected)
    })
  })
})

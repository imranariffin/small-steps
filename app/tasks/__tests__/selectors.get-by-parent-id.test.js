/* eslint-env jest */

import selectors from 'ss/tasks/selectors'

describe('tasks selectors getByParentId', () => {
  let state

  beforeEach(() => {
    state = {
      tasks: {
        allIds: [],
        byId: {}
      }
    }
  })

  it('should return empty array of tasks for goal with no task', () => {
    const goalId = 'some-goal-id-0'

    const tasks = selectors.getByParentId(goalId)(state)

    expect(tasks).toEqual([])
  })

  it('should return correct tasks in correct order for goal with some tasks', () => {
    const goalId = 'some-goal-id-0'
    state = {
      tasks: {
        allIds: [
          'some-task-id-0',
          'some-task-id-1',
          'some-task-id-2'
        ],
        byId: {
          'some-task-id-0': {
            created: 100,
            id: 'some-task-id-0',
            parent: 'some-goal-id-0'
          },
          'some-task-id-1': {
            created: 101,
            id: 'some-task-id-1',
            parent: 'some-goal-id-0'
          },
          'some-task-id-2': {
            created: 102,
            id: 'some-task-id-2',
            parent: 'some-goal-id-1'
          }
        }
      }
    }

    const tasks = selectors.getByParentId(goalId)(state)

    expect(tasks).toEqual([
      {
        created: 100,
        id: 'some-task-id-0',
        parent: 'some-goal-id-0'
      },
      {
        created: 101,
        id: 'some-task-id-1',
        parent: 'some-goal-id-0'
      }
    ])
  })
})

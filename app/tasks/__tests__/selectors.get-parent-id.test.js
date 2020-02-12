/* eslint-env jest */

import selectors from 'ss/tasks/selectors'

describe('tasks selectors getParentId', () => {
  let state

  beforeEach(() => {
    state = {
      tasks: {
        allIds: ['some-task-id-0', 'some-task-id-1'],
        byId: {
          'some-task-id-0': {
            id: 'some-task-id-0',
            parent: 'some-task-id-1'
          },
          'some-task-id-1': {
            id: 'some-task-id-1',
            parent: 'some-goal-id-0'
          }
        }
      }
    }
  })

  it('should return correct `parentId` given a goal parent', () => {
    const taskId = 'some-task-id-0'

    const parentId = selectors.getParentId(taskId)(state)

    expect(parentId).toEqual('some-task-id-1')
  })

  it('should return correct `parentId` given a task parent', () => {
    const taskId = 'some-task-id-1'

    const parentId = selectors.getParentId(taskId)(state)

    expect(parentId).toEqual('some-goal-id-0')
  })
})

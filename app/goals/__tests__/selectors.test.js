/* eslint-env jest */

import selectors from 'ss/goals/selectors'

describe('goals selectors', () => {
  let state

  beforeEach(() => {
    state = {
      goals: {
        allIds: ['some-goal-id-0', 'some-goal-id-1'],
        byId: {
          'some-goal-id-0': {
            id: 'some-goal-id-0',
            text: 'some-goal-text-0'
          },
          'some-goal-id-1': {
            id: 'some-goal-id-1',
            text: 'some-goal-text-1'
          }
        }
      },
      tasks: {
        allIds: ['some-task-id-0'],
        byId: {
          'some-task-id-0': {
            id: 'some-task-id-0',
            parent: 'some-goal-id-0',
            text: 'some-task-text-0'
          }
        }
      }
    }
  })

  describe('getGoals', () => {
    it('should return correct goals as array in correct order', () => {
      const goals = selectors.getGoals(state)

      expect(goals).toEqual(
        [
          {
            id: 'some-goal-id-0',
            text: 'some-goal-text-0'
          },
          {
            id: 'some-goal-id-1',
            text: 'some-goal-text-1'
          }
        ]
      )
    })
  })

  describe('getByTaskId', () => {
    test('task does not exist', () => {
      delete state.tasks.byId['some-task-id-0']
      state.tasks.allIds = []

      const goal = selectors.getByTaskId(state, 'some-task-id-0')

      expect(goal).toEqual(undefined)
    })

    test('goal does not exist', () => {
      state.tasks.byId['some-task-id-0'].parent = 'goal-does-not-exist-id'

      const goal = selectors.getByTaskId(state, 'some-task-id-0')

      expect(goal).toEqual(undefined)
    })

    test('return parent goal of task', () => {
      const goal = selectors.getByTaskId(state, 'some-task-id-0')

      expect(goal).toEqual({
        id: 'some-goal-id-0',
        text: 'some-goal-text-0'
      })
    })
  })
})

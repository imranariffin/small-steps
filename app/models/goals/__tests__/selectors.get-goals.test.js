/* eslint-env jest */

import selectors from 'ss/models/goals/selectors'

describe('goals selectors getGoals', () => {
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
      }
    }
  })

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

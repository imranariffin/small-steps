/* eslint-env jest */

import { mapStateToProps } from 'ss/presenters'

describe('App presenters mapStateToProps', () => {
  let state

  beforeEach(() => {
    state = {
      forms: {
        'goal-add': {
          active: true
        },
        'task-add': {
          active: false
        }
      },
      goals: {
        allIds: ['some-goal-id-0', 'some-goal-id-1', 'some-goal-id-2'],
        byId: {
          'some-goal-id-0': {
            id: 'some-goal-id-0',
            created: 100,
            text: 'some-goal-text-0'
          },
          'some-goal-id-1': {
            id: 'some-goal-id-1',
            created: 101,
            text: 'some-goal-text-1'
          },
          'some-goal-id-2': {
            id: 'some-goal-id-2',
            created: 10,
            text: 'some-goal-text-2'
          }
        }
      }
    }
  })

  it('should return correct `goals` in correct order', () => {
    const { goals } = mapStateToProps(state)

    expect(goals).toEqual(
      [
        {
          id: 'some-goal-id-2',
          created: 10,
          text: 'some-goal-text-2'
        },
        {
          id: 'some-goal-id-0',
          created: 100,
          text: 'some-goal-text-0'
        },
        {
          id: 'some-goal-id-1',
          created: 101,
          text: 'some-goal-text-1'
        }
      ]
    )
  })

  it('should return correct forms activate state', () => {
    state.forms['goal-add'].active = false
    state.forms['task-add'].active = true

    const props = mapStateToProps(state)

    expect(props.isGoalAddActive).toEqual(false)
    expect(props.isTaskAddActive).toEqual(true)
  })
})

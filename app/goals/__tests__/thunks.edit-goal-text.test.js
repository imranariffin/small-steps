/* eslint-env jest */

import thunks from 'ss/goals/thunks'
import actions from 'ss/goals/actions'

describe('goals thunks edit goal text', () => {
  let goalsService, dispatch, getState, goal

  beforeEach(() => {
    goal = {
      created: 'some-goal-created-date',
      id: 'some-goal-id-0',
      parent: 'some-goal-parent-id',
      status: 'some-goal-status',
      text: 'some-old-goal-text'
    }
    goalsService = {
      update: jest.fn(
        (id, { text }) => Promise.resolve({ ...goal, text })
      )
    }
    dispatch = jest.fn()
    getState = jest.fn()
  })

  it('should call the correct method with correct data', async () => {
    const textNew = 'some-new-goal-text'
    goal = { ...goal, text: textNew }

    await thunks.editGoalText(goal.id, textNew)(getState, dispatch, { goalsService })

    expect(goalsService.update.mock.calls).toEqual([['some-goal-id-0', { text: textNew }]])
  })

  describe('goalsService calls successful', () => {
    it('should dispatch correct actions in correct order asynchronously', async () => {
      const textNew = 'some-new-goal-text'

      await thunks.editGoalText(goal.id, textNew)(getState, dispatch, { goalsService })

      expect(dispatch.mock.calls).toEqual([
        [actions.editGoalText.init(goal.id, textNew)],
        [actions.editGoalText.success(goal.id, textNew)]
      ])
    })
  })

  describe('goalsService calls failure', () => {
    let error

    beforeEach(() => {
      error = new Error('some-error')
      goalsService = { update: jest.fn(() => Promise.reject(error)) }
    })

    it('should dispatch correct actions', async () => {
      const textNew = 'some-new-goal-text'

      await thunks.editGoalText(goal.id, textNew)(getState, dispatch, { goalsService })

      expect(dispatch.mock.calls).toEqual([
        [actions.editGoalText.init(goal.id, textNew)],
        [actions.editGoalText.failure(error)]
      ])
    })
  })
})

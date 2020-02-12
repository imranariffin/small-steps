/* eslint-env jest */

import { mapDispatchToProps } from 'ss/goals/components/GoalAdd/presenters'
import goalsThunks from 'ss/goals/thunks'

jest.mock('ss/goals/thunks', () => (
  {
    submitGoal: jest.fn()
  }
))

describe('GoalAdd presenter mapDispatchToProps', () => {
  let dispatch

  beforeEach(() => {
    dispatch = jest.fn()
  })

  describe('goalsSubmit', () => {
    it('should dispatch correct action', () => {
      const text = 'some-text'
      const { goalsSubmit } = mapDispatchToProps(dispatch)

      goalsSubmit(text)

      expect(goalsThunks.submitGoal).toHaveBeenCalledWith(text)
    })
  })
})

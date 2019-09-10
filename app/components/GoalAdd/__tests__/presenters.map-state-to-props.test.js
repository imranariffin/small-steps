/* eslint-env jest */

import { mapDispatchToProps } from 'mg/components/GoalAdd/presenters'
import goalsThunks from 'mg/models/goals/thunks'

jest.mock('mg/models/goals/thunks', () => (
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

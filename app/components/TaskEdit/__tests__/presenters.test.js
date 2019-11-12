/* eslint-env jest */

import { mapDispatchToProps } from '../presenters'

describe('TaskEdit mapDispatchToProps', () => {
  let dispatch

  beforeEach(() => {
    dispatch = jest.fn()
  })

  describe('handleSubmit', () => {
    it('should dispatch correct action', () => {
      const props = mapDispatchToProps(dispatch)

      props.handleSubmit()

      expect(dispatch).toHaveBeenCalledWith(
        {
          type: ''
        }
      )
    })
  })
})

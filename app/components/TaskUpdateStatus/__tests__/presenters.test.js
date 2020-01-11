/* eslint-env jest */

import { shallow } from 'enzyme'

import { mapStateToProps, mapDispatchToProps } from 'ss/components/TaskUpdateStatus/presenters'
import TaskUpdateStatus from 'ss/components/TaskUpdateStatus/TaskUpdateStatus'

describe('TaskUpdateStatus presenters', () => {
  let dispatch, state

  beforeEach(() => {
    dispatch = jest.fn()
    state = {}
  })

  test('provide all required props', () => {
    jest.spyOn(window.console, 'error')

    const props = {
      ...mapStateToProps(state),
      ...mapDispatchToProps(dispatch)
    }
    shallow(<TaskUpdateStatus {...props} />)

    expect(window.console.error.mock.calls).toEqual([])
  })
})

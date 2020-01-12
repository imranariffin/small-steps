/* eslint-env jest */

import { shallow } from 'enzyme'

import ItemActions from 'ss/components/ItemActions/ItemActions'
import { mapStateToProps, mapDispatchToProps } from 'ss/components/ItemActions/presenters'

describe('ItemActions presenters', () => {
  let dispatch, state

  beforeEach(() => {
    dispatch = jest.fn()
    state = {
      tasks: {
        byId: {
          'some-task-id-0': {
            status: 'completed'
          }
        }
      }
    }
  })

  test('provide all required props', () => {
    const ownProps = {
      display: false,
      itemId: 'some-item-id-0',
      shouldFlipY: false
    }
    const props = {
      ...ownProps,
      ...mapStateToProps(state, ownProps),
      ...mapDispatchToProps(dispatch, ownProps)
    }
    jest.spyOn(window.console, 'error')

    shallow(<ItemActions {...props} />)

    expect(window.console.error.mock.calls).toEqual([])
  })
})

/* eslint-env jest */

import { shallow } from 'enzyme'

import ItemActions from 'ss/components/ItemActions/ItemActions'
import { mapStateToProps, mapDispatchToProps } from 'ss/components/ItemActions/presenters'

describe('ItemActions component', () => {
  let dispatch, ownProps, props, state

  beforeEach(() => {
    ownProps = {
      display: true,
      itemId: 'some-item-id-0',
      shouldFlipY: false
    }
    dispatch = jest.fn()
    state = {
      tasks: {
        allIds: ['some-item-id-0'],
        byId: {
          'some-item-id-0': {
            status: 'completed'
          }
        }
      }
    }
    props = {
      ...ownProps,
      ...mapStateToProps(state, ownProps),
      ...mapDispatchToProps(dispatch, ownProps)
    }
  })

  it('renders without error', () => {
    jest.spyOn(window.console, 'error')

    shallow(<ItemActions {...props} />)

    expect(window.console.error.mock.calls).toEqual([])
  })
})

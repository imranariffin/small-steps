/* eslint-env jest */

import { shallow } from 'enzyme'

import ItemActions from 'ss/components/ItemActions/ItemActions'
import { mapDispatchToProps } from 'ss/components/ItemActions/presenters'

describe('ItemActions presenters', () => {
  let dispatch

  beforeEach(() => {
    dispatch = jest.fn()
  })

  test('provide all required props', () => {
    const ownProps = {
      display: false,
      itemId: 'some-item-id-0',
      shouldFlipY: false
    }
    const props = {
      ...ownProps,
      ...mapDispatchToProps(dispatch, ownProps)
    }
    jest.spyOn(window.console, 'error')

    shallow(<ItemActions {...props} />)

    expect(window.console.error.mock.calls).toEqual([])
  })
})

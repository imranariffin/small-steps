/* eslint-env jest */

import { shallow } from 'enzyme'

import ItemActions from 'ss/components/ItemActions/ItemActions'

describe('ItemActions component', () => {
  let props

  beforeEach(() => {
    props = {
      display: true,
      itemId: 'some-item-id',
      onAddItem: jest.fn(),
      onDeleteItem: jest.fn(),
      onEditItem: jest.fn(),
      shouldFlipY: false
    }
  })

  it('renders without error', () => {
    shallow(<ItemActions {...props} />)
  })
})

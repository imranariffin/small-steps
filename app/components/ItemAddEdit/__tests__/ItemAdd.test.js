/* eslint-env jest */

import { shallow } from 'enzyme'

import ItemAddEdit from 'ss/components/ItemAddEdit/ItemAddEdit'

describe('ItemAddEdit component', () => {
  let props

  beforeEach(() => {
    props = {
      addButtonTitle: 'some-title-0',
      adding: false,
      cancelButtonTitle: 'some-title-1',
      onHandleChangeText: jest.fn(),
      onHandlePressAdd: jest.fn(),
      onHandlePressCancel: jest.fn(),
      onHandleSubmit: jest.fn(),
      placeholder: 'some-placeholder',
      text: 'some-text'
    }
  })

  it('should render without error', () => {
    [
      false,
      true
    ].forEach(adding => {
      props.adding = adding

      shallow(<ItemAddEdit {...props} />)
    })
  })
})

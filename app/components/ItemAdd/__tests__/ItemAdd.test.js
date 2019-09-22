/* eslint-env jest */

import { shallow } from 'enzyme'

import ItemAdd from 'ss/components/ItemAdd/ItemAdd'

describe('ItemAdd component', () => {
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

      shallow(<ItemAdd {...props} />)
    })
  })
})

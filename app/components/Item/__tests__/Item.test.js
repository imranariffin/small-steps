/* eslint-env jest */

import { shallow } from 'enzyme'

import Item from 'ss/components/Item/Item'

describe('Item component', () => {
  let props

  beforeEach(() => {
    props = {
      depth: 123,
      item: {
        id: 'some-id',
        created: 'some-created-date',
        status: 'some-status',
        text: 'some-text'
      },
      onHandleLongPress: jest.fn(),
      subItems: []
    }
  })

  it('should render without error', () => {
    [
      'in-progress',
      'completed',
      'not-started'
    ].forEach(status => {
      props.item.status = status

      shallow(<Item {...props} />)
    })
  })
})

/* eslint-env jest */

import { shallow } from 'enzyme'

import Item from 'mg/components/Item/Item'

describe('Item component', () => {
  let props

  beforeEach(() => {
    props = {
      item: {
        id: 'some-id',
        created: 'some-created-date',
        status: 'some-status',
        text: 'some-text'
      }
    }
  })

  it('should render without error', () => {
    props.item.status = 'in-progress'

    shallow(<Item {...props} />)

    props.item.status = 'not-started'

    shallow(<Item {...props} />)
  })
})

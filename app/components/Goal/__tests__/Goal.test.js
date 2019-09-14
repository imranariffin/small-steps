/* eslint-env jest */

import { shallow } from 'enzyme'

import Goal from 'mg/components/Goal/Goal'

describe('Goal component', () => {
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

    shallow(<Goal {...props} />)

    props.item.status = 'not-started'

    shallow(<Goal {...props} />)
  })
})

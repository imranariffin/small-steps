/* eslint-env jest */

import { shallow } from 'enzyme'

import TaskUpdateStatus from 'ss/components/TaskUpdateStatus/TaskUpdateStatus'

describe('TaskUpdateStatus component', () => {
  let props

  beforeEach(() => {
    props = {}
  })

  test('render without error', () => {
    shallow(<TaskUpdateStatus {...props} />)
  })
})

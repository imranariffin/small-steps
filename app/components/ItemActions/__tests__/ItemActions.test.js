/* eslint-env jest */

import { shallow } from 'enzyme'

import ItemActions from 'ss/components/ItemActions'

describe('ItemActions component', () => {
  let props

  beforeEach(() => {
    props = { shouldFlipY: false }
  })

  it('renders without error', () => {
    shallow(<ItemActions {...props} />)
  })
})

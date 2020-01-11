/* eslint-env jest */

import ItemSetStatusButton from 'ss/components/ItemSetStatusButton'

describe('ItemSetStatusButton component', () => {
  let props

  beforeEach(() => {
    props = {}
  })

  test('render without error', () => {
    shallow(<ItemSetStatusButton {...props} />)
  })
})

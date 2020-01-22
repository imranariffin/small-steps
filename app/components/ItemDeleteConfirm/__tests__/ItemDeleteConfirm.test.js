/* eslint-env jest */

import { shallow } from 'enzyme'

import ItemDeleteConfirm from 'ss/components/ItemDeleteConfirm/ItemDeleteConfirm'

describe('ItemDeleteConfirm component', () => {
  let props

  beforeEach(() => {
    props = {
      active: false,
      handleDeleteItem: jest.fn(),
      taskId: 'some-task-id',
      title: 'some-title'
    }
  })

  test('render without error', () => {
    shallow(<ItemDeleteConfirm {...props} />)
  })
})

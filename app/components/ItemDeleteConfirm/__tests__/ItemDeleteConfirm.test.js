/* eslint-env jest */

import { shallow } from 'enzyme'

import ItemDeleteConfirm from 'ss/components/ItemDeleteConfirm/ItemDeleteConfirm'

describe('ItemDeleteConfirm component', () => {
  let props

  beforeEach(() => {
    props = {
      active: false,
      buttonText: 'some-button-text',
      buttonTextSecondary: 'some-secondary-button-text',
      handleClickCancel: jest.fn(),
      handleDeleteItem: jest.fn(),
      taskId: 'some-task-id'
    }
  })

  test('render without error', () => {
    jest.spyOn(window.console, 'error')

    shallow(<ItemDeleteConfirm {...props} />)

    expect(window.console.error.mock.calls).toEqual([])
  })
})

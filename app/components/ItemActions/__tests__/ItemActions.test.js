/* eslint-env jest */

import { shallow } from 'enzyme'

import ItemActions from 'ss/components/ItemActions/ItemActions'
import { mapDispatchToProps } from 'ss/components/ItemActions/presenters'

describe('ItemActions component', () => {
  let dispatch, ownProps, props

  beforeEach(() => {
    ownProps = {
      display: true,
      itemId: 'some-item-id-0',
      shouldFlipY: false
    }
    dispatch = jest.fn()
    props = {
      ...ownProps,
      ...mapDispatchToProps(dispatch, ownProps)
    }
  })

  it('renders without error', () => {
    jest.spyOn(window.console, 'error')

    shallow(<ItemActions {...props} />)

    expect(window.console.error.mock.calls).toEqual([])
  })

  test('onUpdateItemStatus activate update task status form', () => {
    const wrapper = shallow(<ItemActions {...props} />)

    wrapper.instance().handleUpdateItemStatus()

    expect(dispatch.mock.calls).toEqual([
      [
        {
          type: 'ss/forms/FORMS_ACTIVATE',
          payload: {
            formData: {
              taskId: 'some-item-id-0'
            },
            formId: 'task-update-status'
          }
        }
      ]
    ])
  })
})

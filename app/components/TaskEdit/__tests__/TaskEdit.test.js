/* eslint-env jest */

import { shallow } from 'enzyme'

import TaskEdit from 'ss/components/TaskEdit/TaskEdit'

describe('TaskEdit component', () => {
  let props

  beforeEach(() => {
    props = {
      active: true,
      handleChangeText: jest.fn(),
      handlePressAdd: jest.fn(),
      handlePressCancel: jest.fn(),
      handleSubmit: jest.fn(),
      taskId: 'some-task-id',
      text: 'some-text'
    }
  })

  it('should render without warnings or error', () => {
    shallow(<TaskEdit {...props} />)
  })
})

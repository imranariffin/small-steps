/* eslint-env jest */

import { shallow } from 'enzyme'

import TaskAdd from 'mg/components/TaskAdd/TaskAdd'

describe('TaskAdd component', () => {
  let props

  beforeEach(() => {
    props = {
      tasksSubmit: jest.fn()
    }
  })

  it('should render without error', () => {
    shallow(<TaskAdd {...props} />)
  })

  it('should reset text state after goal submission', () => {
    const text = 'some-text'
    props.tasksSubmit = jest.fn()
    const instance = shallow(<TaskAdd {...props} />).instance()

    instance.setState(
      { text },
      () => {
        instance.handleSubmit(text)

        expect(props.tasksSubmit).toHaveBeenCalledWith(text)
        expect(instance.state.text).toEqual('')
      }
    )
  })
})
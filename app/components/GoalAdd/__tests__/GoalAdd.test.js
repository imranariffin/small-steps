/* eslint-env jest */

import { shallow } from 'enzyme'

import GoalAdd from 'ss/components/GoalAdd/GoalAdd'

describe('GoalAdd component', () => {
  let props

  beforeEach(() => {
    props = {
      goalsSubmit: jest.fn()
    }
  })

  it('should render without error', () => {
    shallow(<GoalAdd {...props} />)
  })

  it('should reset text state after goal submission', () => {
    const text = 'some-text'
    props.goalsSubmit = jest.fn()
    const instance = shallow(<GoalAdd {...props} />).instance()

    instance.setState(
      { text },
      () => {
        instance.handleSubmit(text)

        expect(props.goalsSubmit).toHaveBeenCalledWith(text)
        expect(instance.state.text).toEqual('')
      }
    )
  })
})

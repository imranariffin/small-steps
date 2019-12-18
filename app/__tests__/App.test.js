/* eslint-env jest */

import 'react-native'
import React from 'react'
import { shallow } from 'enzyme'
import { App } from '../App'

describe('App', () => {
  it('renders correctly with correct props', () => {
    const props = {
      goals: [],
      handleComponentDidMount: jest.fn()
    }

    shallow(<App {...props} />)

    expect(props.handleComponentDidMount.mock.calls).toEqual([[]])
  })

  it('should call handleComponentDidUpdate when props updated', () => {
    const props = {
      goals: [],
      handleComponentDidMount: jest.fn(),
      handleComponentDidUpdate: jest.fn()
    }
    const newGoal = {
      created: 'some-created',
      id: 'some-goal-id',
      status: 'some-status',
      text: 'some-text'
    }

    const wrapper = shallow(<App {...props} />)

    expect(props.handleComponentDidUpdate.mock.calls).toEqual([])

    wrapper.setProps({ goals: [newGoal] })

    expect(props.handleComponentDidUpdate.mock.calls).toEqual([
      [props, { ...props, goals: [newGoal] }]
    ])
  })
})

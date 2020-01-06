/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'
import { App } from '../App'

describe('App', () => {
  let props

  beforeEach(() => {
    props = {
      goals: [],
      isGoalAddActive: false,
      isGoalsStorageReady: false,
      isTaskAddActive: false,
      isTaskEditActive: false,
      isTasksStorageReady: false,
      handleComponentDidMount: jest.fn(),
      handleComponentDidUpdate: jest.fn()
    }
  })

  it('renders correctly with correct props', () => {
    shallow(<App {...props} />)
  })

  it('calls handleComponentDidMount correctly', () => {
    shallow(<App {...props} />)

    expect(props.handleComponentDidMount).toHaveBeenCalled()
  })

  it('calls handleComponentDidUpdate correctly', () => {
    const wrapper = shallow(<App {...props} />)
    const nextProps = { goals: ['some-goals-0'], ...props }

    expect(props.handleComponentDidUpdate.mock.calls).toEqual([])

    wrapper.setProps(nextProps)

    expect(props.handleComponentDidUpdate.mock.calls).toEqual([
      [props, nextProps]
    ])
  })
})

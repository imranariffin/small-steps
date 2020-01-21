/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'
import SplashScreen from 'react-native-splash-screen'

import { App } from '../App'

jest.mock('react-native-splash-screen', () => {
  return {
    hide: jest.fn()
  }
})

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
    SplashScreen.hide.mockClear()
  })

  it('renders correctly with correct props', () => {
    jest.spyOn(window.console, 'error')

    shallow(<App {...props} />)

    expect(window.console.error.mock.calls).toEqual([])
  })

  it('calls handleComponentDidMount on mount', () => {
    shallow(<App {...props} />)

    expect(props.handleComponentDidMount.mock.calls).toEqual([[]])
  })

  it('delays hiding of splash screen', () => {
    jest.useFakeTimers()

    shallow(<App {...props} />)

    expect(SplashScreen.hide.mock.calls).toEqual([])

    jest.runAllTimers()

    expect(SplashScreen.hide.mock.calls).toEqual([[]])
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

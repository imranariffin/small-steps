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

    expect(props.handleComponentDidMount).toHaveBeenCalled()
  })
})

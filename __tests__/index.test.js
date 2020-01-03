/* eslint-env jest */

import { mount } from 'enzyme'
import React from 'react'
import { Provider } from 'react-redux'

import App from 'ss/App'
import store from 'ss/store'

jest.mock('@react-native-community/async-storage', () => {
  return {
    getItem: jest.fn(() => Promise.resolve(null)),
    setItem: jest.fn(() => Promise.resolve())
  }
})
jest.mock('ss/services/logger', () => {
  return {
    log: jest.fn()
  }
})

describe('App integration test', () => {
  let originalConsole

  beforeEach(() => {
    originalConsole = global.console
    global.console = { error: () => {} }
  })

  afterEach(() => {
    global.console = originalConsole
  })

  it('should render whole app without error', async () => {
    mount(
      <Provider store={store}>
        <App />
      </Provider>
    )
  })
})

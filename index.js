import React from 'react'
import { AppRegistry, YellowBox } from 'react-native'
import { Provider } from 'react-redux'

import store from 'ss/store'
import utils from 'ss/utils'

import App from './app/App'
import { name as appName } from './app.json'

// Setups
YellowBox.ignoreWarnings(['Remote debugger'])
utils.setupMockFetch()

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <App />
  </Provider>
))

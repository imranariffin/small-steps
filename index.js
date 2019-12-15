import React from 'react'
import { AppRegistry, YellowBox } from 'react-native'
import { Provider } from 'react-redux'
const SQLite = require('react-native-sqlite-storage')

import store from 'ss/store'
import utils from 'ss/utils'

import App from './app/App'
import { name as appName } from './app.json'

// Setups
YellowBox.ignoreWarnings(['Remote debugger'])
utils.setupMockFetch()
const db = SQLite.openDatabase({
  name: 'my.db',
  location: 'default',
  androidDatabaseProvider: 'system'
})

console.log(db)

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <App />
  </Provider>
))

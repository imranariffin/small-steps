import { AppRegistry, YellowBox } from 'react-native'

import utils from 'mg/utils'

import App from './app/App'
import { name as appName } from './app.json'

// Setups
YellowBox.ignoreWarnings(['Remote debugger'])
utils.setupMockFetch()

AppRegistry.registerComponent(appName, () => App)

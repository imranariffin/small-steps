import { AppRegistry } from 'react-native'

import utils from 'mg/utils'

import App from './app/App'
import { name as appName } from './app.json'

utils.setupMockFetch()

AppRegistry.registerComponent(appName, () => App)

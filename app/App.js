import React, { Fragment } from 'react'
import {
  StatusBar,
  StyleSheet,
  Text,
  View
} from 'react-native'
import Config from 'react-native-config'

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle='dark-content' />
      <View style={styles.container}>
        <Text style={styles.env}>{Config.NODE_ENV}</Text>
      </View>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  env: {
    fontSize: 30
  }
})

export default App

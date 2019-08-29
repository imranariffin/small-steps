import React, { Fragment } from 'react'
import {
  StyleSheet,
  View,
  Text,
  StatusBar
} from 'react-native'

const App = () => {
  return (
    <Fragment>
      <StatusBar barStyle='dark-content' />
      <View style={styles.container}>
        <Text style={styles.env}>{'environment'}</Text>
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

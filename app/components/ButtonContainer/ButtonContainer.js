import React from 'react'
import { View, StyleSheet } from 'react-native'

class ButtonContainer extends React.Component {
  render () {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    container: {
      marginHorizontal: 10,
      marginVertical: 5
    }
  }
)

export default ButtonContainer

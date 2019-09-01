import React from 'react'
import {
  StyleSheet,
  Text,
  View
} from 'react-native'

class Goal extends React.PureComponent {
  render() {
    const {
      item: {
        text
      }
    } = this.props
    
    return (
      <View style={styles.listItem}>
        <Text>{text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listItem: {
    width: '100%'
  }
})

export default Goal

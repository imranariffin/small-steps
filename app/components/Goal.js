import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
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
      <TouchableHighlight onPress={this.handlePress}>
        <View style={styles.listItem}>
          <Text>{text}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  handlePress = () => {
    console.log('handlePress')
  }
}

const styles = StyleSheet.create({
  listItem: {
    marginHorizontal: 10,
    height: 50,
    width: '100%'
  }
})

export default Goal

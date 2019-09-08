import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import DeviceInfo from 'react-native-device-info'

class Goal extends React.PureComponent {
  render() {
    const {
      item: {
        created,
        text
      }
    } = this.props
    const createdLocale = new Date(created).toLocaleString(
      'en-GB',
      {
        timeZone: DeviceInfo.getTimezone()
      }
    )
    
    return (
      <TouchableHighlight onPress={this.handlePress} underlayColor={'grey'} style={styles.container}>
        <View>
          <Text style={styles.text}>{text}</Text>
          <Text style={styles.created}>{createdLocale}</Text>
        </View>
      </TouchableHighlight>
    )
  }

  handlePress = () => {
    console.log('handlePress')
  }
}

const styles = StyleSheet.create({
  created: {
    fontSize: 10,
    color: 'grey'
  },
  container: {
    paddingHorizontal: 10,
    paddingVertical: 7
  },
  text: {
    fontSize: 14
  }
})

export default Goal

import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import DeviceInfo from 'react-native-device-info'

class Goal extends React.PureComponent {
  render () {
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
      <TouchableHighlight onPress={this.handlePress} underlayColor='grey' style={styles.touchableContainer}>
        <View style={styles.container}>
          <View style={styles.icon}>
          </View>
          <View style={styles.textAndCreated}>
            <Text style={styles.text}>{text}</Text>
            <Text style={styles.created}>{createdLocale}</Text>
          </View>
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
    flexDirection: 'row',
    // backgroundColor: 'purple'
  },
  touchableContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 7,
    // backgroundColor: 'yellow'
  },
  icon: {
    width: 20,
    height: '100%',
    // backgroundColor: 'blue',
  },
  text: {
    fontSize: 14
  },
  textAndCreated: {
    // backgroundColor: 'green',
    flex: 1,
    height: 'auto'
  }
})

export default Goal

import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import DeviceInfo from 'react-native-device-info'

class Goal extends React.PureComponent {
  state = {
    selected: false
  }

  render () {
    const {
      item: {
        created,
        status,
        text
      }
    } = this.props
    const createdLocale = new Date(created).toLocaleString(
      'en-GB',
      {
        timeZone: DeviceInfo.getTimezone()
      }
    )

    const leftIcon = this.state.selected
      ? require('./images/expanded.png')
      : require('./images/expand.png')
    const numberOfLines = this.state.selected
      ? 10
      : 1
    let rightIcon
    switch (status) {
      case 'in-progress':
        rightIcon = require('./images/in-progress.png')
        break
      case 'completed':
        rightIcon = require('./images/completed.png')
        break
      default:
        rightIcon = require('./images/not-started.png')
        break
    }

    return (
      <TouchableHighlight onPress={this.handlePress} underlayColor='grey' style={styles.touchableContainer}>
        <View style={styles.container}>
          <View style={styles.leftContainer}>
            <Image source={leftIcon} style={styles.icon} />
          </View>
          <View style={styles.textAndCreated}>
            <Text style={styles.text} numberOfLines={numberOfLines}>{text}</Text>
            <Text style={styles.created}>{createdLocale}</Text>
          </View>
          <View style={styles.rightContainer}>
            <Image source={rightIcon} style={styles.icon} />
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  handlePress = () => {
    this.setState({
      selected: !this.state.selected
    })
  }
}

const styles = StyleSheet.create({
  created: {
    fontSize: 10,
    color: 'grey'
  },
  container: {
    flexDirection: 'row'
    // backgroundColor: 'purple'
  },
  touchableContainer: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 7
    // backgroundColor: 'yellow'
  },
  icon: {
    alignSelf: 'center',
    width: 20,
    height: 20
  },
  leftContainer: {
    width: 20,
    height: '100%'
    // backgroundColor: 'blue',
  },
  rightContainer: {
    width: 20,
    height: '100%'
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

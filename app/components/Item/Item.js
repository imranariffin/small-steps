import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native'
import DeviceInfo from 'react-native-device-info'

import SubItem from 'mg/components/Item/SubItem'

class Item extends React.Component {
  static propTypes = {
  }

  state = {
    selected: false
  }

  render () {
    const {
      depth,
      subItems,
      item: {
        created,
        status,
        text
      }
    } = this.props
    const { selected } = this.state

    const createdLocale = new Date(created).toLocaleString(
      'en-GB',
      {
        timeZone: DeviceInfo.getTimezone()
      }
    )
    const leftIcon = selected
      ? require('./images/expanded.png')
      : require('./images/expand.png')
    const numberOfLines = selected
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
      <TouchableHighlight
        onPress={this.handlePress}
        style={styles.paddedFullWidth(depth)}
        underlayColor='grey'
      >
        <View style={styles.flexRow}>
          <View style={styles.fullHeightFixedWidth}>
            <Image source={leftIcon} style={styles.icon} />
          </View>
          <View style={styles.flexRowFull}>
            <View style={styles.flexRowFullWidth}>
              <View style={styles.flexFull}>
                <Text style={styles.text} numberOfLines={numberOfLines}>
                  {text}
                </Text>
                <Text style={styles.smallGreyText}>{createdLocale}</Text>
              </View>
              <View style={styles.fullHeightFixedWidth}>
                <Image source={rightIcon} style={styles.icon} />
              </View>
            </View>
            <View style={styles.flexRowFullWidth}>
              {
                selected && depth < 2
                  ? (
                    subItems.map(
                      subItem => (
                        <SubItem
                          depth={depth + 1}
                          item={subItem}
                          key={subItem.id}
                        />
                      )
                    )
                  )
                  : null
              }
            </View>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  handlePress = () => {
    this.setState(
      {
        selected: !this.state.selected
      }
    )
  }
}

const styles = StyleSheet.create({
  smallGreyText: {
    color: 'grey',
    fontSize: 10
  },
  flexRow: {
    flexDirection: 'row'
  },
  paddedFullWidth: depth => ({
    paddingVertical: 7,
    width: '100%',
    transform: depth === 0 ? [{ scaleY: -1 }] : []
  }),
  icon: {
    alignSelf: 'center',
    width: 20,
    height: 20
  },
  fullHeightFixedWidth: {
    width: 20,
    height: '100%'
  },
  flexRowFull: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  flexRowFullWidth: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%'
  },
  text: {
    fontSize: 14
  },
  flexFull: {
    flex: 1
  }
})

export default Item

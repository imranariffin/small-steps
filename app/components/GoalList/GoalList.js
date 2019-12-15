import PropTypes from 'prop-types'
import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import Item from 'ss/components/Item'

class GoalList extends React.PureComponent {
  static propTypes = {
    goals: PropTypes.arrayOf(
      PropTypes.shape(
        {
          // FIXME: Change to string once done porting all goals
          // thunks from using client to using storage goals.
          created: PropTypes.oneOf(PropTypes.string, PropTypes.number).isRequired,
          id: PropTypes.string.isRequired,
          text: PropTypes.string.isRequired,
          status: PropTypes.string.isRequired
        }
      )
    )
  }

  render () {
    const { goals } = this.props
    return (
      <FlatList
        style={styles.flatList}
        data={goals}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItem}
      />
    )
  }

  _keyExtractor = (item) => {
    return item.id
  }

  _renderItem = ({ item }) => {
    return (
      <View style={styles.padding}>
        <Item depth={0} item={item} />
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    flatList: {
      flex: 1,
      transform: [{ scaleY: -1 }]
    },
    padding: {
      paddingLeft: 2,
      paddingRight: 7
    }
  }
)

export default GoalList

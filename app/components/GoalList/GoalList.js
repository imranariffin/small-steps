import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import Item from 'mg/components/Item'

class GoalList extends React.PureComponent {
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
      <View style={styles.paddingHorizontal}>
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
    paddingHorizontal: {
      paddingHorizontal: 7
    }
  }
)

export default GoalList

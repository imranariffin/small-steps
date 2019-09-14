import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import Goal from 'mg/components/Goal'

class GoalList extends React.PureComponent {
  render () {
    const { goals } = this.props
    return (
      <FlatList
        style={styles.flatList}
        contentContainerStyle={styles.contentContainer}
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
        <Goal depth={0} item={item} />
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    flatList: {
      flex: 1
    },
    contentContainer: {
      flex: 1,
      flexDirection: 'column-reverse'
    },
    paddingHorizontal: {
      paddingHorizontal: 7
    }
  }
)

export default GoalList

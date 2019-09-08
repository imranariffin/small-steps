import React from 'react'
import { FlatList, StyleSheet } from 'react-native'

class GoalList extends React.PureComponent {
  render () {
    const { children, goals } = this.props
    return (
      <FlatList
        style={styles.flatList}
        contentContainerStyle={styles.contentContainer}
        data={goals}
        keyExtractor={this._keyExtractor}
        renderItem={this._renderItemWithComponent(children)}
      />
    )
  }

  _keyExtractor = (item) => {
    return item.id
  }

  _renderItemWithComponent = (Component) => ({ item }) => {
    return (
      <Component item={item} />
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
    }
  }
)

export default GoalList

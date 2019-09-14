import React from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

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
      <View style={styles.paddingHorizontal}>
        <Component depth={0} item={item} subtasks={[item]} />
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

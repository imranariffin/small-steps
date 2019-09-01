import React from 'react'
import { FlatList } from 'react-native'

import Goal from 'mg/components/Goal'

class GoalList extends React.PureComponent {
  render() {
    const { goals } = this.props
    return (
      <FlatList
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
      <Goal item={item}/>
    )
  }
}

export default GoalList

import PropTypes from 'prop-types'
import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import ItemSetStatusButton from 'ss/common/components/ItemSetStatusButton'
import Colors from 'ss/common/constants/colors'

class ItemActions extends React.Component {
  static propTypes = {
    display: PropTypes.bool.isRequired,
    itemId: PropTypes.string.isRequired,
    shouldDisplaySetStatus: PropTypes.bool.isRequired,
    shouldDisplaySetStatusNotStarted: PropTypes.bool.isRequired,
    shouldDisplaySetStatusInProgress: PropTypes.bool.isRequired,
    shouldDisplaySetStatusCompleted: PropTypes.bool.isRequired,
    shouldFlipY: PropTypes.bool.isRequired,
    onAddItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onEditItem: PropTypes.func.isRequired,
    onUpdateItemStatus: PropTypes.func.isRequired
  }

  render () {
    const {
      display,
      itemId,
      onAddItem,
      shouldDisplaySetStatus,
      shouldDisplaySetStatusCompleted,
      shouldDisplaySetStatusInProgress,
      shouldDisplaySetStatusNotStarted,
      shouldFlipY
    } = this.props

    if (!display) {
      return null
    }

    return (
      <View style={styles.container(shouldFlipY)}>
        <TouchableOpacity style={styles.button} onPress={onAddItem}>
          <Text style={styles.buttonText}>add task</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.handleEditItem}>
          <Text style={styles.buttonText}>edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={this.handleDeleteItem}>
          <Text style={styles.buttonText}>delete</Text>
        </TouchableOpacity>
        {shouldDisplaySetStatus && <Text style={styles.button}>|</Text>}
        <ItemSetStatusButton
          onPress={this.props.onUpdateItemStatus(itemId, 'not-started')}
          shouldDisplay={shouldDisplaySetStatusNotStarted}
          status='not-started'
        />
        <ItemSetStatusButton
          onPress={this.props.onUpdateItemStatus(itemId, 'in-progress')}
          shouldDisplay={shouldDisplaySetStatusInProgress}
          status='in-progress'
        />
        <ItemSetStatusButton
          onPress={this.props.onUpdateItemStatus(itemId, 'completed')}
          shouldDisplay={shouldDisplaySetStatusCompleted}
          status='completed'
        />
      </View>
    )
  }

  handleDeleteItem = () => {
    this.props.onDeleteItem(this.props.itemId)
  }

  handleEditItem = () => {
    this.props.onEditItem(this.props.itemId)
  }
}

const styles = StyleSheet.create(
  {
    container: shouldFlipY => ({
      flexDirection: shouldFlipY ? 'row' : 'row'
    }),
    button: {
      color: Colors.Grey,
      fontSize: 13,
      height: 30,
      marginTop: 5,
      marginRight: 15
    },
    buttonText: {
      color: Colors.Grey,
      fontSize: 13
    }
  }
)

export default ItemActions

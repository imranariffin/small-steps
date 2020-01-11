import PropTypes from 'prop-types'
import React from 'react'
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import Colors from 'ss/constants/colors'

class ItemActions extends React.Component {
  static propTypes = {
    display: PropTypes.bool.isRequired,
    itemId: PropTypes.string.isRequired,
    itemStatus: PropTypes.string.isRequired,
    shouldFlipY: PropTypes.bool.isRequired,
    onAddItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onEditItem: PropTypes.func.isRequired,
    onUpdateItemStatus: PropTypes.func.isRequired
  }

  render () {
    const {
      display,
      itemStatus,
      onAddItem,
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
        <Text style={styles.button}>|</Text>
        {
          itemStatus === 'in-progress' && (
            <TouchableOpacity style={styles.button} onPress={() => this.handleUpdateItemStatus('not-started')}>
              <Image
                resizeMode='contain'
                source={require('ss/components/Item/images/not-started.png')}
                style={{
                  height: 15,
                  justifyContent: 'flex-start',
                  marginTop: 3,
                  width: 15,
                }}
              />
            </TouchableOpacity>
          )
        }
        {
          (itemStatus === 'completed' || itemStatus === 'not-started') && (
            <TouchableOpacity style={styles.button} onPress={() => this.handleUpdateItemStatus('in-progress')}>
              <Image
                resizeMode='contain'
                source={require('ss/components/Item/images/in-progress.png')}
                style={{
                  height: 15,
                  justifyContent: 'flex-start',
                  marginTop: 3,
                  width: 15,
                }}
              />
            </TouchableOpacity>
          )
        }
        {
          itemStatus === 'in-progress' && (
            <TouchableOpacity style={styles.button} onPress={() => this.handleUpdateItemStatus('completed')}>
              <Image
                resizeMode='contain'
                source={require('ss/components/Item/images/completed.png')}
                style={{
                  height: 15,
                  justifyContent: 'flex-start',
                  marginTop: 3,
                  width: 15,
                }}
              />
            </TouchableOpacity>
          )
        }
      </View>
    )
  }

  handleDeleteItem = () => {
    this.props.onDeleteItem(this.props.itemId)
  }

  handleEditItem = () => {
    this.props.onEditItem(this.props.itemId)
  }

  handleUpdateItemStatus = (nextStatus) => {
    this.props.onUpdateItemStatus(this.props.itemId, nextStatus)
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

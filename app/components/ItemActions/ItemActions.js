import PropTypes from 'prop-types'
import React from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import Colors from 'ss/constants/colors'

class ItemActions extends React.Component {
  static propTypes = {
    display: PropTypes.bool.isRequired,
    shouldFlipY: PropTypes.bool.isRequired,
    onAddItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onEditItem: PropTypes.func.isRequired
  }

  render () {
    const {
      display,
      shouldFlipY
    } = this.props

    if (!display) {
      return null
    }

    return (
      <View style={styles.container(shouldFlipY)}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>add task</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>delete</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    container: shouldFlipY => ({
      flexDirection: shouldFlipY ? 'row' : 'row'
    }),
    button: {
      paddingTop: 5,
      paddingRight: 15
    },
    buttonText: {
      color: Colors.Grey,
      fontSize: 13
    }
  }
)

export default ItemActions

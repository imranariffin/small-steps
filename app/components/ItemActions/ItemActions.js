import PropTypes from 'prop-types'
import React from 'react'
import { Button, StyleSheet, View } from 'react-native'

class ItemActions extends React.Component {
  static propTypes = {
    display: PropTypes.bool.isRequired,
    shouldFlipY: PropTypes.bool.isRequired
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
        <Button title='add subtask' />
        <Button title='edit task' />
        <Button title='delete task' />
        <Button title='cancel' />
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    container: shouldFlipY => ({
      flexDirection: 'row',
      transform: shouldFlipY ? [{ scaleY: -1 }] : []
    })
  }
)

export default ItemActions

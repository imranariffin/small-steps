import PropTypes from 'prop-types'
import React from 'react'
import { View, StyleSheet } from 'react-native'

class ButtonContainer extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  }

  render () {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create(
  {
    container: {
      marginHorizontal: 10,
      marginVertical: 5
    }
  }
)

export default ButtonContainer

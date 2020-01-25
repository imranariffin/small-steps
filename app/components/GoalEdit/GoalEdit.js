import React from 'react'

import ItemAddEdit from 'ss/components/ItemAddEdit'
import Colors from 'ss/constants/colors'

class GoalEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = { text: '' }
  }

  render () {
    const {
      active,
      handlePressCancel,
      text: propsText
    } = this.props
    const { text } = this.state
  
    return (
      <ItemAddEdit
        active={active}
        addButtonTitle='edit goal'
        adding
        buttonColor={Colors.DeepSkyBlue}
        cancelButtonTitle='Cancel'
        onHandleChangeText={this.onHandleChangeText}
        onHandlePressAdd={() => {}}
        onHandlePressCancel={handlePressCancel}
        onHandleSubmit={() => {}}
        placeholder='Edit a Goal'
        text={text || propsText}
      />
    )
  }

  onHandleChangeText = (text) => {
    this.setState({ text })
  }
}

export default GoalEdit

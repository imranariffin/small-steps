import React from 'react'

import ItemAdd from 'ss/components/ItemAdd'
import Colors from 'ss/constants/colors'

class TaskEdit extends React.Component {
  state = {
    active: true,
    editing: true,
    text: this.props.text
  }

  render () {
    const { editing, text } = this.state
    const { active, handlePressCancel } = this.props

    console.log('!!!!!!!!!!')
    console.log('state.text', this.state.text)
    console.log('props.text', this.props.text)

    return (
      <ItemAdd
        active={active}
        addButtonTitle='edit task'
        adding={editing}
        buttonColor={Colors.DeepSkyBlue}
        cancelButtonTitle='Cancel'
        onHandleChangeText={this.handleChangeText}
        onHandlePressAdd={this.handlePressAdd}
        onHandlePressCancel={handlePressCancel}
        onHandleSubmit={this.handleSubmit}
        placeholder='Edit a task'
        text={text || this.props.text}
      />
    )
  }

  handleChangeText = text => {
    this.setState({ text })
  }

  handleSubmit = () => {
    const taskId = this.props.taskId
    const text = this.state.text
    this.setState(
      {
        active: false,
        text: ''
      },
      () => this.props.handleSubmit(taskId, text)
    )
  }

  handlePressAdd = () => {}

  handlePressCancel = () => {
    this.setState({ active: false })
  }
}

export default TaskEdit

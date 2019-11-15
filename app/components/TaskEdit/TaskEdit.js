import PropTypes from 'prop-types'
import React from 'react'

import ItemAdd from 'ss/components/ItemAdd'
import Colors from 'ss/constants/colors'

class TaskEdit extends React.Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    handleChangeText: PropTypes.func.isRequired,
    handlePressAdd: PropTypes.func.isRequired,
    handlePressCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    taskId: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }

  state = {
    active: true,
    editing: true,
    text: this.props.text
  }

  render () {
    const { editing, text } = this.state
    const { active, handlePressCancel } = this.props

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

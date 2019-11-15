import PropTypes from 'prop-types'
import React from 'react'

import ItemAddEdit from 'ss/components/ItemAddEdit'
import Colors from 'ss/constants/colors'

class TaskEdit extends React.Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    handlePressCancel: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    taskId: PropTypes.string,
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
      <ItemAddEdit
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
}

export default TaskEdit

import PropTypes from 'prop-types'
import React from 'react'

import ItemAdd from 'ss/components/ItemAdd'

class TaskAdd extends React.Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    parentId: PropTypes.string,
    tasksSubmit: PropTypes.func.isRequired
  }

  state = {
    text: ''
  }

  render () {
    const { active } = this.props
    const {
      text
    } = this.state

    return (
      <ItemAdd
        active={active}
        addButtonTitle='add task'
        adding
        cancelButtonTitle='Cancel'
        onHandleChangeText={this.handleChangeText}
        onHandlePressAdd={this.handlePressAdd}
        onHandlePressCancel={this.handlePressCancel}
        onHandleSubmit={this.handleSubmit}
        placeholder='Add a new task'
        text={text}
      />
    )
  }

  handleChangeText = text => {
    this.setState(
      {
        text
      }
    )
  }

  handlePressAdd = () => {
    this.setState(
      {
        adding: !this.state.adding
      }
    )
  }

  handlePressCancel = () => {
    this.setState(
      {
        adding: false
      }
    )
  }

  handleSubmit = () => {
    const { text } = this.state
    const { parentId, tasksSubmit } = this.props

    this.setState(
      {
        text: ''
      }
    )
    tasksSubmit(text, parentId)
  }
}

export default TaskAdd

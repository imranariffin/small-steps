import PropTypes from 'prop-types'
import React from 'react'

import ItemAdd from 'mg/components/ItemAdd'

class TaskAdd extends React.Component {
  static propTypes = {
    tasksSubmit: PropTypes.func.isRequired
  }

  state = {
    adding: false,
    text: ''
  }

  render () {
    const {
      adding,
      text
    } = this.state

    return (
      <ItemAdd
        addButtonTitle='add task'
        adding={adding}
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
    const { tasksSubmit } = this.props

    this.setState(
      {
        adding: false,
        text: ''
      }
    )
    tasksSubmit(text)
  }
}

export default TaskAdd

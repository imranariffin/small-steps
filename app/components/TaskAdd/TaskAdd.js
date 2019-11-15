import PropTypes from 'prop-types'
import React from 'react'

import ItemAddEdit from 'ss/components/ItemAddEdit'
import Colors from 'ss/constants/colors'

class TaskAdd extends React.Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    onHandlePressCancel: PropTypes.func.isRequired,
    parentId: PropTypes.string,
    tasksSubmit: PropTypes.func.isRequired
  }

  state = {
    adding: false,
    text: ''
  }

  render () {
    const { active } = this.props
    const {
      adding,
      text
    } = this.state

    return (
      <ItemAddEdit
        active={active}
        addButtonTitle='add task'
        adding={adding}
        buttonColor={Colors.DeepSkyBlue}
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
    this.props.onHandlePressCancel()
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

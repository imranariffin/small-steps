import PropTypes from 'prop-types'
import React from 'react'

import ItemAddEdit from 'ss/forms/components/ItemAddEdit'
import Colors from 'ss/common/constants/colors'

class TaskAdd extends React.Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    onHandlePressCancel: PropTypes.func.isRequired,
    parentId: PropTypes.string,
    tasksSubmit: PropTypes.func.isRequired
  }

  state = { text: '' }

  render () {
    const { active } = this.props
    const { text } = this.state

    return (
      <ItemAddEdit
        active={active}
        addButtonTitle='add task'
        adding
        buttonColor={Colors.DeepSkyBlue}
        cancelButtonTitle='Cancel'
        onHandleChangeText={this.handleChangeText}
        onHandlePressAdd={() => {}}
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

  handlePressCancel = () => {
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
    tasksSubmit(parentId, text)
  }
}

export default TaskAdd

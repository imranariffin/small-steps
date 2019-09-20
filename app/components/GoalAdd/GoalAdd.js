import React from 'react'

import ItemAdd from 'mg/components/ItemAdd'

class GoalAdd extends React.Component {
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
        addButtonTitle='add'
        adding={adding}
        cancelButtonTitle='Cancel'
        onHandleChangeText={this.handleChangeText}
        onHandlePressAdd={this.handlePressAdd}
        onHandlePressCancel={this.handlePressCancel}
        onHandleSubmit={this.handleSubmit}
        placeholder='Add a new goal'
        text={text}
      />
    )
  }

  handleChangeText = text => {
    this.setState({ text })
  }

  handlePressAdd = () => {
    this.setState({ adding: true })
  }

  handleSubmit = () => {
    const { text } = this.state
    const { goalsSubmit } = this.props

    this.setState(
      {
        adding: false,
        text: ''
      }
    )
    goalsSubmit(text)
  }

  handlePressCancel = () => {
    this.setState({ adding: false })
  }
}

export default GoalAdd

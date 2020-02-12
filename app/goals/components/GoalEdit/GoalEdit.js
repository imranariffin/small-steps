import PropTypes from 'prop-types'
import React from 'react'

import ItemAddEdit from 'ss/forms/components/ItemAddEdit'
import Colors from 'ss/common/constants/colors'

class GoalEdit extends React.Component {
  static propTypes = {
    editGoalText: PropTypes.func.isRequired,
    goalId: PropTypes.string
  }

  constructor (props) {
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
        onHandleChangeText={this.handleChangeText}
        onHandlePressAdd={() => {}}
        onHandlePressCancel={handlePressCancel}
        onHandleSubmit={this.handleSubmit}
        placeholder='Edit a Goal'
        text={text || propsText}
      />
    )
  }

  handleChangeText = (text) => {
    this.setState({ text })
  }

  handleSubmit = () => {
    const { editGoalText, goalId } = this.props
    const { text } = this.state

    editGoalText(goalId, text)
    this.setState({ text: '' })
  }
}

export default GoalEdit

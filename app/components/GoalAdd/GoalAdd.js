import React from 'react'
import { Button, TextInput } from 'react-native'

import ButtonContainer from 'mg/components/ButtonContainer'
import Colors from 'mg/constants/colors'

class GoalAdd extends React.Component {
  state = {
    adding: false,
    text: ''
  }

  render () {
    if (this.state.adding) {
      return (
        <>
          <ButtonContainer>
            <TextInput
              onChangeText={this.handleChangeText}
              onSubmitEditing={this.handleSubmit}
              placeholder='Write your new goal'
              underlineColorAndroid={Colors.Teal}
              value={this.state.title}
            />
          </ButtonContainer>
          <ButtonContainer>
            <Button
              onPress={this.handlePressCancel}
              title='Cancel'
              color={Colors.SunsetOrange}
            />
          </ButtonContainer>
        </>
      )
    }

    return (
      <ButtonContainer>
        <Button
          onPress={this.handlePressAdd}
          title='Add a new goal'
          color={Colors.Teal}
        />
      </ButtonContainer>
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

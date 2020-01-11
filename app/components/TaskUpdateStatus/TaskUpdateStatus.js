import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'react-native'

import ButtonContainer from 'ss/components/ButtonContainer'
import Colors from 'ss/constants/colors'

class TaskUpdateStatus extends React.Component {
  static propTypes = {
    handleSetStatusDown: PropTypes.func.isRequired,
    handleSetStatusUp: PropTypes.func.isRequired,
    statusDown: PropTypes.string.isRequired,
    statusUp: PropTypes.string.isRequired
  }

  render () {
    const {
      handleSetStatusDown,
      handleSetStatusUp,
      statusDown,
      statusUp
    } = this.props

    return (
      <>
        <ButtonContainer>
          <Button
            onPress={handleSetStatusUp}
            title={statusUp}
            color={Colors.Teal}
          />
        </ButtonContainer>
        <ButtonContainer>
          <Button
            onPress={handleSetStatusDown}
            title={statusDown}
            color={Colors.Teal}
          />
        </ButtonContainer>
      </>
    )
  }
}

export default TaskUpdateStatus

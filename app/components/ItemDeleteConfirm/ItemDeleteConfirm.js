import PropTypes from 'prop-types'
import React from 'react'
import { Button } from 'react-native'

import ButtonContainer from 'ss/components/ButtonContainer'
import Colors from 'ss/constants/colors'

const ItemDeleteConfirm = (props) => {
  const { active, handleDeleteTask, taskId, title } = props

  if (!active) {
    return null
  }

  return (
    <ButtonContainer>
      <Button
        color={Colors.SunsetOrange}
        onPress={() => handleDeleteTask(taskId)}
        title={title}
      />
    </ButtonContainer>
  )
}

ItemDeleteConfirm.propTypes = {
  active: PropTypes.bool.isRequired,
  handleDeleteTask: PropTypes.func.isRequired,
  taskId: PropTypes.string,
  title: PropTypes.string.isRequired
}

export default ItemDeleteConfirm

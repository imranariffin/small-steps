import PropTypes from 'prop-types'
import React from 'react'

import Colors from 'ss/constants/colors'

import { Button, Container } from './styles'

const ItemDeleteConfirm = (props) => {
  const {
    active,
    handleClickCancel,
    handleDeleteItem,
    itemId,
    buttonText,
    buttonTextSecondary
  } = props

  if (!active) {
    return null
  }

  return (
    <>
      <Container>
        <Button
          color={Colors.SunsetOrange}
          onPress={() => handleDeleteItem(itemId)}
          title={buttonText}
        />
      </Container>
      <Container>
        <Button
          color={Colors.Teal}
          onPress={handleClickCancel}
          title={buttonTextSecondary}
        />
      </Container>
    </>
  )
}

ItemDeleteConfirm.propTypes = {
  active: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  buttonTextSecondary: PropTypes.string.isRequired,
  handleClickCancel: PropTypes.func.isRequired,
  handleDeleteItem: PropTypes.func.isRequired,
  itemId: PropTypes.string
}

export default ItemDeleteConfirm

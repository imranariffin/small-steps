import React from 'react'

import ItemDeleteConfirm from 'ss/forms/components/ItemDeleteConfirm'

const GoalDeleteConfirm = (props) => {
  const {
    active,
    buttonText,
    buttonTextSecondary,
    handleClickCancel,
    handleDeleteItem,
    itemId
  } = props

  return (
    <ItemDeleteConfirm
      active={active}
      buttonText={buttonText}
      buttonTextSecondary={buttonTextSecondary}
      handleClickCancel={handleClickCancel}
      handleDeleteItem={handleDeleteItem}
      itemId={itemId}
    />
  )
}

export default GoalDeleteConfirm

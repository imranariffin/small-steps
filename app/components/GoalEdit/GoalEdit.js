import React from 'react'

import ItemAddEdit from 'ss/components/ItemAddEdit'
import Colors from 'ss/constants/colors'

const GoalEdit = (props) => {
  const {
    active,
    handlePressCancel
  } = props

  return (
    <ItemAddEdit
      active={active}
      addButtonTitle='edit goal'
      adding
      buttonColor={Colors.DeepSkyBlue}
      cancelButtonTitle='Cancel'
      onHandleChangeText={() => {}}
      onHandlePressAdd={() => {}}
      onHandlePressCancel={handlePressCancel}
      onHandleSubmit={() => {}}
      placeholder='Edit a Goal'
      text='some-text'
    />
  )
}

export default GoalEdit

import React from 'react'

import ItemDeleteConfirm from 'ss/components/ItemDeleteConfirm'

const TaskDeleteConfirm = (props) => {
  const { active, handleDeleteItem, itemId, title } = props
  return (
    <ItemDeleteConfirm
      active={active}
      handleDeleteItem={handleDeleteItem}
      itemId={itemId}
      title={title}
    />
  )
}

export default TaskDeleteConfirm

import formsActions from 'ss/models/forms/actions'

export const mapDispatchToProps = (dispatch, ownProps) => {
  const itemId = ownProps.itemId
  return {
    onAddItem: () => {
      dispatch(
        formsActions.formsActivate(
          'task-add',
          {
            parentId: itemId
          }
        )
      )
    },
    onDeleteItem: () => {},
    onEditItem: taskId => {
      dispatch(
        formsActions.formsActivate(
          'task-edit',
          {
            taskId: taskId
          }
        )
      )
    }
  }
}

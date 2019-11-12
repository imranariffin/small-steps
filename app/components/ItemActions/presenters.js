import formsActions from 'ss/models/forms/actions'

export const mapDispatchToProps = dispatch => {
  return {
    onAddItem: () => {},
    onDeleteItem: () => {},
    onEditItem: (taskId) => {
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

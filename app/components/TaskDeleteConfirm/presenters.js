import formsActions from 'ss/models/forms/actions'
import formsSelectors from 'ss/models/forms/selectors'
import tasksThunks from 'ss/models/tasks/thunks'

export const mapDispatchToProps = (dispatch) => {
  return {
    handleClickCancel: () => {
      dispatch(formsActions.formsDeactivate('task-delete'))
      dispatch(formsActions.formsActivate('goal-add'))
    },
    handleDeleteItem: (itemId) => {
      dispatch(tasksThunks.deleteTask(itemId))
      dispatch(formsActions.formsDeactivate('task-delete'))
      dispatch(formsActions.formsActivate('goal-add'))
    }
  }
}

export const mapStateToProps = (state) => {
  const { taskId: itemId } = formsSelectors.getFormData('task-delete')(state)
  const isActive = formsSelectors.isFormActive('task-delete')(state)
  return {
    active: isActive,
    buttonText: 'Confirm delete task',
    buttonTextSecondary: 'Cancel',
    itemId
  }
}

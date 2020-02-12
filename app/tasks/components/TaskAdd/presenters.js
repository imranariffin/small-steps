import formsActions from 'ss/forms/actions'
import formsSelector from 'ss/forms/selectors'
import tasksThunks from 'ss/tasks/thunks'

export const mapDispatchToProps = dispatch => {
  return {
    onHandlePressCancel: () => {
      dispatch(formsActions.formsDeactivate('task-add'))
      dispatch(formsActions.formsActivate('goal-add'))
    },
    tasksSubmit: (parent, text) => {
      dispatch(tasksThunks.createTask(parent, text))
      dispatch(formsActions.formsDeactivate('task-add'))
      dispatch(formsActions.formsActivate('goal-add'))
    }
  }
}

export const mapStateToProps = state => {
  const formData = formsSelector.getFormData('task-add')(state)
  const parentId = formData.parentId

  return {
    parentId
  }
}

import formsActions from 'ss/models/forms/actions'
import formsSelector from 'ss/models/forms/selectors'
import tasksThunks from 'ss/models/tasks/thunks'

export const mapDispatchToProps = dispatch => {
  return {
    onHandlePressCancel: () => {
      dispatch(formsActions.formsDeactivate('task-add'))
      dispatch(formsActions.formsActivate('goal-add'))
    },
    tasksSubmit: (text, parent) => {
      dispatch(tasksThunks.createTask(text, parent))
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

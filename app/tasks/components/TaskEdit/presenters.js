import formsActions from 'ss/forms/actions'
import formsSelectors from 'ss/forms/selectors'
import tasksThunks from 'ss/tasks/thunks'
import tasksSelectors from 'ss/tasks/selectors'

export const mapStateToProps = (state) => {
  const active = formsSelectors.isFormActive('task-edit')(state)
  const { taskId } = formsSelectors.getFormData('task-edit')(state)
  const task = tasksSelectors.getById(taskId)(state) || {}
  const text = task.text || ''

  return {
    active,
    taskId,
    text
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    handleSubmit: (id, text) => {
      dispatch(tasksThunks.editTaskText(id, text))
      dispatch(formsActions.formsDeactivate('task-edit'))
      dispatch(formsActions.formsActivate('goal-add'))
    },
    handlePressCancel: () => {
      dispatch(formsActions.formsDeactivate('task-edit'))
      dispatch(formsActions.formsActivate('goal-add'))
    }
  }
}

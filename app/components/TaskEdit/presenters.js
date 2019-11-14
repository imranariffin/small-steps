import formsActions from 'ss/models/forms/actions'
import formsSelectors from 'ss/models/forms/selectors'
import tasksThunks from 'ss/models/tasks/thunks'
import tasksSelectors from 'ss/models/tasks/selectors'

export const mapStateToProps = (state, ownProps) => {
  const { taskId } = formsSelectors.getFormData('task-edit')(state)

  console.log('$$$$$')
  console.log(taskId)

  const task = tasksSelectors.getById(taskId)(state) || {}
  const text = task.text || ''
  console.log(text)

  return {
    ...ownProps,
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

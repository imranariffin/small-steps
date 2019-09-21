import formsSelector from 'mg/models/forms/selectors'
import tasksThunks from 'mg/models/tasks/thunks'

export const mapDispatchToProps = dispatch => {
  return {
    tasksSubmit: (text, parent) => {
      dispatch(tasksThunks.createTask(text, parent))
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

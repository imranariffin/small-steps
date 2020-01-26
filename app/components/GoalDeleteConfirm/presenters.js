import formsActions from 'ss/models/forms/actions'
import formsSelectors from 'ss/models/forms/selectors'
import goalsThunks from 'ss/models/goals/thunks'

export const mapDispatchToProps = (dispatch) => {
  return {
    handleClickCancel: () => {
      dispatch(formsActions.formsDeactivate('goal-delete'))
      dispatch(formsActions.formsActivate('goal-add'))
    },
    handleDeleteItem: (itemId) => {
      dispatch(goalsThunks.deleteGoal(itemId))
      dispatch(formsActions.formsDeactivate('goal-delete'))
      dispatch(formsActions.formsActivate('goal-add'))
    }
  }
}

export const mapStateToProps = (state) => {
  const { goalId: itemId } = formsSelectors.getFormData('goal-delete')(state)
  const isActive = formsSelectors.isFormActive('goal-delete')(state)
  return {
    active: isActive,
    buttonText: 'Confirm delete goal',
    buttonTextSecondary: 'Cancel',
    itemId
  }
}

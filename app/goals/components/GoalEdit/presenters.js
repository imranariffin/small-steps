import formsSelectors from 'ss/forms/selectors'
import formsActions from 'ss/forms/actions'
import goalsSelectors from 'ss/goals/selectors'
import goalsThunks from 'ss/goals/thunks'

export const mapStateToProps = (state) => {
  const active = formsSelectors.isFormActive('goal-edit')(state)
  const { goalId } = formsSelectors.getFormData('goal-edit')(state)
  const goal = goalsSelectors.getById(goalId)(state) || {}
  const text = goal.text || ''

  return {
    active,
    goalId,
    text
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    handlePressCancel: () => {
      dispatch(formsActions.formsDeactivate('goal-edit'))
      dispatch(formsActions.formsActivate('goal-add'))
    },
    editGoalText: (id, text) => {
      dispatch(goalsThunks.editGoalText(id, text))
      dispatch(formsActions.formsDeactivate('goal-edit'))
      dispatch(formsActions.formsActivate('goal-add'))
    }
  }
}

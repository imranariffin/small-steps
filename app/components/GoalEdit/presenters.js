import formsSelectors from 'ss/models/forms/selectors'
import formsActions from 'ss/models/forms/actions'
import goalsSelectors from 'ss/models/goals/selectors'
import goalsThunks from 'ss/models/goals/thunks'

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

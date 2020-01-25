import formsSelectors from 'ss/models/forms/selectors'
import formsActions from 'ss/models/forms/actions'

export const mapStateToProps = (state) => {
  const active = formsSelectors.isFormActive('goal-edit')(state)

  return {
    active
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    handlePressCancel: () => {
      dispatch(formsActions.formsDeactivate('goal-edit'))
      dispatch(formsActions.formsActivate('goal-add'))
    }
  }
}

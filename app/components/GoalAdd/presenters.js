import goalsThunks from 'ss/models/goals/thunks'

export const mapDispatchToProps = dispatch => (
  {
    goalsSubmit: text => {
      dispatch(goalsThunks.submitGoal(text))
    }
  }
)

import goalsThunks from 'ss/goals/thunks'

export const mapDispatchToProps = dispatch => (
  {
    goalsSubmit: text => {
      dispatch(goalsThunks.submitGoal(text))
    }
  }
)

import goalsActions from 'ss/models/goals/actions'

const fetchGoals = () => async (getState, dispatch, { goalsService }) => {
  dispatch(goalsActions.fetchGoalsRequest())

  goalsService
    .getAll()
    .then(goals => {
      dispatch(goalsActions.fetchGoalsSuccess(goals))
    })
    .catch(error => {
      dispatch(goalsActions.fetchGoalsFailure(error))
    })
}

const submitGoal = text => async (getState, dispatch, { goalsService }) => {
  dispatch(goalsActions.submitGoalsRequest(text))

  const options = { text }
  goalsService
    .create(options)
    .then(goal => {
      dispatch(
        goalsActions.submitGoalsSuccess(
          {
            id: goal.id,
            text: goal.text,
            created: goal.created,
            status: goal.status
          }
        )
      )
    })
    .catch(error => {
      dispatch(goalsActions.submitGoalsFailure(error))
    })
}

export default {
  fetchGoals,
  submitGoal
}

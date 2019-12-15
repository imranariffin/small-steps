import goalsActions from 'ss/models/goals/actions'

const fetchGoals = () => async (getState, dispatch, { client }) => {
  dispatch(goalsActions.fetchGoalsRequest())

  client
    .get('https://small-steps-api.com/v1/goals/')
    .then(response => {
      const {
        body: {
          goals
        }
      } = response
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

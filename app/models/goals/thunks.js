import goalsActions from 'ss/models/goals/actions'

const fetchGoals = () => async (getState, dispatch, { client }) => {
  dispatch(goalsActions.fetchGoalsRequest())

  client
    .get('https://ma-goals-api.com/v1/goals/')
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

const submitGoal = text => async (getState, dispatch, { client }) => {
  dispatch(goalsActions.submitGoalsRequest(text))

  const options = {
    body: {
      text
    }
  }
  client
    .post('https://ma-goals-api.com/v1/goals/', options)
    .then(response => {
      const {
        body: {
          id,
          text,
          created,
          status
        }
      } = response
      dispatch(
        goalsActions.submitGoalsSuccess(
          {
            id,
            text,
            created,
            status
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

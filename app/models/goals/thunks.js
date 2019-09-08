import goalsActions from 'mg/models/goals/actions'

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

export default {
  fetchGoals
}

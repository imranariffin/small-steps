const fetchGoalsRequest = () => (
  {
    type: 'mg/goals/FETCH_GOALS_REQUEST',
    payload: {}
  }
)

const fetchGoalsSuccess = goals => (
  {
    type: 'mg/goals/FETCH_GOALS_SUCCESS',
    payload: {
      goals
    }
  }
)

const fetchGoalsFailure = error => (
  {
    type: 'mg/goals/FETCH_GOALS_FAILURE',
    payload: {
      error
    }
  }
)

export default {
  fetchGoalsRequest,
  fetchGoalsSuccess,
  fetchGoalsFailure
}

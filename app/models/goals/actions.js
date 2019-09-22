const fetchGoalsRequest = () => (
  {
    type: 'ss/goals/FETCH_GOALS_REQUEST',
    payload: {}
  }
)

const fetchGoalsSuccess = goals => (
  {
    type: 'ss/goals/FETCH_GOALS_SUCCESS',
    payload: {
      goals
    }
  }
)

const fetchGoalsFailure = error => (
  {
    type: 'ss/goals/FETCH_GOALS_FAILURE',
    payload: {
      error
    }
  }
)

const submitGoalsRequest = text => (
  {
    type: 'ss/goals/SUBMIT_GOALS_REQUEST',
    payload: {
      text
    }
  }
)

const submitGoalsSuccess = ({ id, text, created, status }) => (
  {
    type: 'ss/goals/SUBMIT_GOALS_SUCCESS',
    payload: {
      id,
      text,
      created,
      status
    }
  }
)

const submitGoalsFailure = error => (
  {
    type: 'ss/goals/SUBMIT_GOALS_FAILURE',
    payload: {
      error
    }
  }
)

export default {
  fetchGoalsRequest,
  fetchGoalsSuccess,
  fetchGoalsFailure,
  submitGoalsRequest,
  submitGoalsSuccess,
  submitGoalsFailure
}

import createAction from 'ss/utils/create-action'

import actionTypes from './action-types'

const deleteGoal = createAction(
  'ss/goals/DELETE_GOALS',
  {
    init: (id) => ({ id }),
    success: (id) => ({ id }),
    failure: (error) => ({ error })
  }
)

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

const updateStatusRequest = (tasksStatuses) => (
  {
    type: actionTypes.UPDATE_STATUS_REQUEST,
    payload: {
      tasksStatuses
    }
  }
)

const updateStatusSuccess = (id, status) => (
  {
    type: actionTypes.UPDATE_STATUS_SUCCESS,
    payload: {
      id,
      status
    }
  }
)

const updateStatusFailure = () => (
  {
    type: actionTypes.UPDATE_STATUS_FAILURE,
    payload: {}
  }
)

export default {
  deleteGoal,
  fetchGoalsRequest,
  fetchGoalsSuccess,
  fetchGoalsFailure,
  submitGoalsRequest,
  submitGoalsSuccess,
  submitGoalsFailure,
  updateStatusRequest,
  updateStatusSuccess,
  updateStatusFailure
}

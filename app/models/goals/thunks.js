import goalsActions from 'ss/models/goals/actions'
import goalsSelectors from 'ss/models/goals/selectors'

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

const updateStatus = (tasksStatuses) => async (getState, dispatch, { goalsService }) => {
  const state = getState()
  dispatch(goalsActions.updateStatusRequest(tasksStatuses))

  const { id: taskId, status: statusNext } = tasksStatuses.find(
    ({ id }) => goalsSelectors.getByTaskId(state, id) !== undefined
  ) || {}
  const goal = goalsSelectors.getByTaskId(state, taskId)

  if (!goal) {
    dispatch(
      goalsActions.updateStatusFailure(
        Error('No goal found to update status')
      )
    )
    return
  }

  goal.status = statusNext

  try {
    await goalsService.update(goal)
  } catch (error) {
    dispatch(goalsActions.updateStatusFailure(error))
    return
  }

  dispatch(goalsActions.updateStatusSuccess(goal.id, goal.status))
}

export default {
  fetchGoals,
  submitGoal,
  updateStatus
}

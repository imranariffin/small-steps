import goalsActions from 'ss/models/goals/actions'
import goalsSelectors from 'ss/models/goals/selectors'

const deleteGoal = (id) => async (getState, dispatch, { goalsService }) => {
  dispatch(goalsActions.deleteGoal.init(id))

  goalsService
    .delete(id)
    .then(() => {
      dispatch(goalsActions.deleteGoal.success(id))
    })
    .catch((error) => {
      dispatch(goalsActions.deleteGoal.failure(error))
    })
}

const editGoalText = (id, text) => async (getState, dispatch, { goalsService }) => {
  dispatch(goalsActions.editGoalText.init(id, text))

  goalsService
    .update(id, { text })
    .then(goal => {
      dispatch(goalsActions.editGoalText.success(id, goal.text))
    })
    .catch(error => {
      dispatch(goalsActions.editGoalText.failure(error))
    })
}

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
  deleteGoal,
  editGoalText,
  fetchGoals,
  submitGoal,
  updateStatus
}

import appActions from 'mg/models/app/actions'
import formsActions from 'mg/models/forms/actions'
import formsSelectors from 'mg/models/forms/selectors'
import goalsSelectors from 'mg/models/goals/selectors'
import goalsThunks from 'mg/models/goals/thunks'
import tasksThunks from 'mg/models/tasks/thunks'

export const mapStateToProps = state => {
  const goals = goalsSelectors.getGoals(state)
  const isGoalAddActive = formsSelectors.isFormActive('goal-add')(state)
  const isTaskAddActive = formsSelectors.isFormActive('task-add')(state)

  return {
    goals,
    isGoalAddActive,
    isTaskAddActive
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    handleComponentDidMount: () => {
      dispatch(appActions.initApp())
      dispatch(formsActions.formsRegister('goal-add'))
      dispatch(formsActions.formsRegister('task-add'))
      dispatch(formsActions.formsActivate('goal-add'))
      dispatch(goalsThunks.fetchGoals())
      dispatch(tasksThunks.fetchTasks())
    }
  }
}

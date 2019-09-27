import appActions from 'ss/models/app/actions'
import formsActions from 'ss/models/forms/actions'
import formsSelectors from 'ss/models/forms/selectors'
import goalsSelectors from 'ss/models/goals/selectors'
import goalsThunks from 'ss/models/goals/thunks'
import tasksThunks from 'ss/models/tasks/thunks'

export const mapStateToProps = state => {
  const goals = goalsSelectors.getGoals(state)
  const isGoalAddActive = formsSelectors.isFormActive('goal-add')(state)

  return {
    goals,
    isGoalAddActive
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

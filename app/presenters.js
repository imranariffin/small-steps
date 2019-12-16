import appActions from 'ss/models/app/actions'
import formsActions from 'ss/models/forms/actions'
import formsSelectors from 'ss/models/forms/selectors'
import goalsSelectors from 'ss/models/goals/selectors'
import goalsThunks from 'ss/models/goals/thunks'
import migrationsThunks from 'ss/models/migrations/thunks'
import tasksThunks from 'ss/models/tasks/thunks'

export const mapStateToProps = state => {
  const goals = goalsSelectors.getGoals(state)
  const isGoalAddActive = formsSelectors.isFormActive('goal-add')(state)
  const isTaskEditActive = formsSelectors.isFormActive('task-edit')(state)

  return {
    goals,
    isGoalAddActive,
    isTaskEditActive
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    handleComponentDidMount: () => {
      dispatch(migrationsThunks.setupStorage())
      dispatch(migrationsThunks.runMigrations())
      dispatch(appActions.initApp())
      dispatch(formsActions.formsRegister('goal-add'))
      dispatch(formsActions.formsRegister('task-add'))
      dispatch(formsActions.formsRegister('task-edit'))
      dispatch(formsActions.formsActivate('goal-add'))
      dispatch(goalsThunks.fetchGoals())
      dispatch(tasksThunks.fetchTasks())
    }
  }
}

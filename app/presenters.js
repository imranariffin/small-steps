import appActions from 'ss/models/app/actions'
import formsActions from 'ss/models/forms/actions'
import formsSelectors from 'ss/models/forms/selectors'
import goalsSelectors from 'ss/models/goals/selectors'
import goalsThunks from 'ss/models/goals/thunks'
import storagesSelectors from 'ss/models/storages/selectors'
import storagesThunks from 'ss/models/storages/thunks'
import tasksThunks from 'ss/models/tasks/thunks'

export const mapStateToProps = state => {
  const goals = goalsSelectors.getGoals(state)
  const isGoalAddActive = formsSelectors.isFormActive('goal-add')(state)
  const isGoalsStorageReady = storagesSelectors.isStorageReady(state, 'goals')
  const isTaskEditActive = formsSelectors.isFormActive('task-edit')(state)

  return {
    goals,
    isGoalAddActive,
    isGoalsStorageReady,
    isTaskEditActive
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    handleComponentDidMount: () => {
      dispatch(appActions.initApp())
      dispatch(storagesThunks.initStorage())
      dispatch(formsActions.formsRegister('goal-add'))
      dispatch(formsActions.formsRegister('task-add'))
      dispatch(formsActions.formsRegister('task-edit'))
      dispatch(formsActions.formsActivate('goal-add'))
      dispatch(tasksThunks.fetchTasks())
    },
    handleComponentDidUpdate: (prevProps, nextProps) => {
      if (!prevProps.isGoalsStorageReady && nextProps.isGoalsStorageReady) {
        dispatch(goalsThunks.fetchGoals())
      }
    }
  }
}

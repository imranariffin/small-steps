import appActions from 'ss/common/actions'
import formsActions from 'ss/forms/actions'
import formsSelectors from 'ss/forms/selectors'
import goalsSelectors from 'ss/goals/selectors'
import goalsThunks from 'ss/goals/thunks'
import storagesSelectors from 'ss/storages/selectors'
import storagesThunks from 'ss/storages/thunks'
import tasksThunks from 'ss/tasks/thunks'

export const mapStateToProps = state => {
  const goals = goalsSelectors.getGoals(state)
  const isGoalAddActive = formsSelectors.isFormActive('goal-add')(state)
  const isGoalsStorageReady = storagesSelectors.isStorageReady(state, 'goals')
  const isTaskAddActive = formsSelectors.isFormActive('task-add')(state)
  const isTasksStorageReady = storagesSelectors.isStorageReady(state, 'tasks')
  const isTaskUpdateStatusActive = formsSelectors.isFormActive('task-update-status')(state)

  return {
    goals,
    isGoalAddActive,
    isGoalsStorageReady,
    isTaskAddActive,
    isTasksStorageReady,
    isTaskUpdateStatusActive
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    handleComponentDidMount: () => {
      dispatch(appActions.initApp())
      dispatch(storagesThunks.initStorages())
      dispatch(formsActions.formsRegister('goal-add'))
      dispatch(formsActions.formsRegister('task-add'))
      dispatch(formsActions.formsRegister('task-delete'))
      dispatch(formsActions.formsRegister('task-edit'))
      dispatch(formsActions.formsRegister('task-update-status'))
      dispatch(formsActions.formsActivate('goal-add'))
    },
    handleComponentDidUpdate: (prevProps, nextProps) => {
      if (!prevProps.isGoalsStorageReady && nextProps.isGoalsStorageReady) {
        dispatch(goalsThunks.fetchGoals())
      }
      if (!prevProps.isTasksStorageReady && nextProps.isTasksStorageReady) {
        dispatch(tasksThunks.fetchTasks())
      }
    }
  }
}

import appActions from 'mg/models/app/actions'
import goalsSelectors from 'mg/models/goals/selectors'
import goalsThunks from 'mg/models/goals/thunks'
import tasksThunks from 'mg/models/tasks/thunks'

export const mapStateToProps = state => {
  const goals = goalsSelectors.getGoals(state)

  return {
    goals
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    handleComponentDidMount: () => {
      dispatch(appActions.initApp())
      dispatch(goalsThunks.fetchGoals())
      dispatch(tasksThunks.fetchTasks())
    }
  }
}

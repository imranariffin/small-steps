import React from 'react'
import { StatusBar } from 'react-native'
import { connect } from 'react-redux'

import Goal from 'mg/components/Goal'
import GoalAdd from 'mg/components/GoalAdd'
import GoalList from 'mg/components/GoalList'
import appActions from 'mg/models/app/actions'
import goalsSelectors from 'mg/models/goals/selectors'
import goalsThunks from 'mg/models/goals/thunks'
import tasksThunks from 'mg/models/tasks/thunks'

export class App extends React.Component {
  render () {
    const { goals } = this.props
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <GoalList goals={goals}>
          {Goal}
        </GoalList>
        <GoalAdd />
      </>
    )
  }

  componentDidMount () {
    this.props.handleComponentDidMount()
  }
}

export const mapStateToProps = state => {
  const goals = goalsSelectors.getGoals(state)
  const { tasks } = state

  return {
    goals,
    tasks: tasks.allIds.map(taskId => tasks.byId[taskId])
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

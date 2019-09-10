import React from 'react'
import { StatusBar } from 'react-native'
import { connect } from 'react-redux'

import Goal from 'mg/components/Goal'
import GoalAdd from 'mg/components/GoalAdd'
import GoalList from 'mg/components/GoalList'
import appActions from 'mg/models/app/actions'
import goalsSelectors from 'mg/models/goals/selectors'
import goalsThunks from 'mg/models/goals/thunks'

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

  return {
    goals
  }
}

export const mapDispatchToProps = dispatch => {
  return {
    handleComponentDidMount: () => {
      dispatch(appActions.initApp())
      dispatch(goalsThunks.fetchGoals())
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

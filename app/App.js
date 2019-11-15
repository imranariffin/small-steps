import React from 'react'
import { StatusBar } from 'react-native'
import { connect } from 'react-redux'

import GoalAdd from 'ss/components/GoalAdd'
import GoalList from 'ss/components/GoalList'
import TaskEdit from 'ss/components/TaskEdit'
import { mapStateToProps, mapDispatchToProps } from 'ss/presenters'

export class App extends React.Component {
  render () {
    const {
      isGoalAddActive,
      isTaskEditActive,
      goals
    } = this.props

    return (
      <>
        <StatusBar barStyle='dark-content' />
        <GoalList goals={goals} />
        <GoalAdd active={isGoalAddActive} />
        <TaskEdit active={isTaskEditActive} />
      </>
    )
  }

  componentDidMount () {
    this.props.handleComponentDidMount()
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

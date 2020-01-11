import PropTypes from 'prop-types'
import React from 'react'
import { StatusBar } from 'react-native'
import { connect } from 'react-redux'

import GoalAdd from 'ss/components/GoalAdd'
import GoalList from 'ss/components/GoalList'
import TaskAdd from 'ss/components/TaskAdd'
import ItemDeleteConfirm from 'ss/components/ItemDeleteConfirm'
import TaskEdit from 'ss/components/TaskEdit'
import { mapStateToProps, mapDispatchToProps } from 'ss/presenters'
import TaskUpdateStatus from 'ss/components/TaskUpdateStatus'

export class App extends React.Component {
  static propTypes = {
    goals: PropTypes.array.isRequired,
    handleComponentDidMount: PropTypes.func.isRequired,
    handleComponentDidUpdate: PropTypes.func.isRequired,
    isGoalAddActive: PropTypes.bool.isRequired,
    isGoalsStorageReady: PropTypes.bool.isRequired,
    isTaskAddActive: PropTypes.bool.isRequired,
    isTaskEditActive: PropTypes.bool.isRequired,
    isTasksStorageReady: PropTypes.bool.isRequired,
    isTaskUpdateStatusActive: PropTypes.bool.isRequired
  }

  render () {
    const {
      isGoalAddActive,
      isTaskAddActive,
      isTaskEditActive,
      isTaskUpdateStatusActive,
      goals
    } = this.props

    return (
      <>
        <StatusBar barStyle='dark-content' />
        <GoalList goals={goals} />
        <GoalAdd active={isGoalAddActive} />
        <TaskAdd active={isTaskAddActive} />
        <ItemDeleteConfirm />
        <TaskEdit active={isTaskEditActive} />
        <TaskUpdateStatus active={isTaskUpdateStatusActive} />
      </>
    )
  }

  componentDidMount () {
    this.props.handleComponentDidMount()
  }

  componentDidUpdate (prevProps) {
    this.props.handleComponentDidUpdate(prevProps, this.props)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

import PropTypes from 'prop-types'
import React from 'react'
import { StatusBar } from 'react-native'
import SplashScreen from 'react-native-splash-screen'
import { connect } from 'react-redux'

import GoalAdd from 'ss/components/GoalAdd'
import GoalDeleteConfirm from 'ss/components/GoalDeleteConfirm'
import GoalEdit from 'ss/components/GoalEdit'
import GoalList from 'ss/components/GoalList'
import TaskAdd from 'ss/components/TaskAdd'
import TaskDeleteConfirm from 'ss/components/TaskDeleteConfirm'
import TaskEdit from 'ss/components/TaskEdit'
import constants from 'ss/constants'

import { mapStateToProps, mapDispatchToProps } from './presenters'
import { Container } from './styles'

export class App extends React.Component {
  static propTypes = {
    goals: PropTypes.array.isRequired,
    handleComponentDidMount: PropTypes.func.isRequired,
    handleComponentDidUpdate: PropTypes.func.isRequired,
    isGoalAddActive: PropTypes.bool.isRequired,
    isGoalsStorageReady: PropTypes.bool.isRequired,
    isTaskAddActive: PropTypes.bool.isRequired,
    isTaskEditActive: PropTypes.bool.isRequired,
    isTasksStorageReady: PropTypes.bool.isRequired
  }

  render () {
    const {
      isGoalAddActive,
      isTaskAddActive,
      isTaskEditActive,
      goals
    } = this.props

    return (
      <Container>
        <StatusBar barStyle='dark-content' />
        <GoalList goals={goals} />
        <GoalAdd active={isGoalAddActive} />
        <TaskAdd active={isTaskAddActive} />
        <TaskDeleteConfirm />
        <GoalDeleteConfirm />
        <TaskEdit active={isTaskEditActive} />
        <GoalEdit />
      </Container>
    )
  }

  componentDidMount () {
    setTimeout(() => {
      SplashScreen.hide()
    }, constants.SplashScreenDelayMs)
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

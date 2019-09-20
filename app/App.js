import React from 'react'
import { StatusBar } from 'react-native'
import { connect } from 'react-redux'

import GoalAdd from 'mg/components/GoalAdd'
import GoalList from 'mg/components/GoalList'
import { mapStateToProps, mapDispatchToProps } from 'mg/presenters'

export class App extends React.Component {
  render () {
    const { goals } = this.props
    return (
      <>
        <StatusBar barStyle='dark-content' />
        <GoalList goals={goals} />
        <GoalAdd />
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

import React, { Fragment } from 'react'
import { StatusBar } from 'react-native'

import GoalList from 'mg/components/GoalList'
import client from 'mg/services/client'

class App extends React.Component {
  state = {
    goals: []
  }

  render() {
    return (
      <Fragment>
        <StatusBar barStyle='dark-content' />
        <GoalList goals={this.state.goals} />
      </Fragment>
    )
  }

  componentDidMount() {
    client
      .get('https://ma-goals-api.com/v1/goals/')
      .then(this.handleGoalsGet)
  }

  handleGoalsGet = response => {
    const { goals } = response
    console.log(response)
    this.setState({ goals })
  }
}

export default App

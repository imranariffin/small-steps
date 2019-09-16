import React from 'react'
import { connect } from 'react-redux'

import Goal from './Goal'
import { mapStateToProps } from './presenters'

const GoalChild = props => {
  return <Goal {...props} />
}

export default connect(mapStateToProps)(GoalChild)

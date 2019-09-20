import React from 'react'
import { connect } from 'react-redux'

import Item from './Item'
import { mapStateToProps } from './presenters'

const SubItem = props => {
  return <Item {...props} />
}

export default connect(mapStateToProps)(SubItem)

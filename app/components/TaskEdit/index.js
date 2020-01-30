import { connect } from 'react-redux'

import TaskEdit from './TaskEdit'
import { mapDispatchToProps, mapStateToProps } from './presenters'

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskEdit)

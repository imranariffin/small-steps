import { connect } from 'react-redux'

import TaskUpdateStatus from 'ss/components/TaskUpdateStatus/TaskUpdateStatus'
import { mapStateToProps, mapDispatchToProps } from 'ss/components/TaskUpdateStatus/presenters'

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskUpdateStatus)

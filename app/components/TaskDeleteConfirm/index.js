import { connect } from 'react-redux'

import TaskDeleteConfirm from './TaskDeleteConfirm'
import { mapDispatchToProps, mapStateToProps } from './presenters'

export default connect(mapStateToProps, mapDispatchToProps)(TaskDeleteConfirm)

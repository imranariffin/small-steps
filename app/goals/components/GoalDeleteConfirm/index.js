import { connect } from 'react-redux'

import GoalDeleteConfirm from './GoalDeleteConfirm'
import { mapDispatchToProps, mapStateToProps } from './presenters'

export default connect(mapStateToProps, mapDispatchToProps)(GoalDeleteConfirm)

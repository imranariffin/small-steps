import { connect } from 'react-redux'

import GoalEdit from './GoalEdit'
import { mapStateToProps, mapDispatchToProps } from './presenters'

export default connect(mapStateToProps, mapDispatchToProps)(GoalEdit)

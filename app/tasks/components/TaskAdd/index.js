import { connect } from 'react-redux'

import TaskAdd from './TaskAdd'
import { mapDispatchToProps, mapStateToProps } from './presenters'

export default connect(mapStateToProps, mapDispatchToProps)(TaskAdd)

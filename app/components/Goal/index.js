import { connect } from 'react-redux'

import Goal from './Goal'
import { mapStateToProps } from './presenters'

export default connect(mapStateToProps)(Goal)

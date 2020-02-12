import { connect } from 'react-redux'

import GoalAdd from './GoalAdd'
import { mapDispatchToProps } from './presenters'

export default connect(() => ({}), mapDispatchToProps)(GoalAdd)

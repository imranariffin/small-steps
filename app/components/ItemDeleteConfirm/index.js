import { connect } from 'react-redux'

import ItemDeleteConfirm from './ItemDeleteConfirm'
import { mapDispatchToProps, mapStateToProps } from './presenters'

export default connect(mapStateToProps, mapDispatchToProps)(ItemDeleteConfirm)

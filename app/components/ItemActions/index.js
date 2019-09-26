import { connect } from 'react-redux'

import ItemActions from './ItemActions'
import { mapDispatchToProps } from './presenters'

export default connect(
  undefined,
  mapDispatchToProps
)(ItemActions)

import { connect } from 'react-redux'

import ItemActions from './ItemActions'
import { mapStateToProps, mapDispatchToProps } from './presenters'

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ItemActions)

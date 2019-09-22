import { connect } from 'react-redux'

import Item from './Item'
import { mapDispatchToProps, mapStateToProps } from 'mg/components/Item/presenters'

export default connect(mapStateToProps, mapDispatchToProps)(Item)

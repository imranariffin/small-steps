import { connect } from 'react-redux'

import Item from './Item'
import { mapStateToProps } from 'mg/components/Item/presenters'

export default connect(mapStateToProps)(Item)

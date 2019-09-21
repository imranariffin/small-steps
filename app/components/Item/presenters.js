import DeviceInfo from 'react-native-device-info'

import formsActions from 'mg/models/forms/actions'
import tasksSelectors from 'mg/models/tasks/selectors'

export const mapStateToProps = (state, ownProps) => {
  const {
    depth,
    item: {
      created,
      id: parentId
    }
  } = ownProps

  const subItems = tasksSelectors.getByParentId(parentId)(state)
  const createdLocalized = new Date(created).toLocaleString(
    'en-GB',
    {
      timeZone: DeviceInfo.getTimezone()
    }
  )
  const item = {
    ...ownProps.item,
    created: createdLocalized
  }

  return {
    depth,
    item,
    parentId,
    subItems
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  const {
    item: {
      id
    }
  } = ownProps
  return {
    onHandleLongPress: () => {
      dispatch(formsActions.formsActivate('task-add', { parentId: id }))
    }
  }
}

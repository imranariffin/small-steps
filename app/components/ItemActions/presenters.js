import formsActions from 'ss/models/forms/actions'
import tasksSelectors from 'ss/models/tasks/selectors'
import tasksThunks from 'ss/models/tasks/thunks'

export const mapStateToProps = (state, ownProps) => {
  const { itemId } = ownProps
  const item = tasksSelectors.getById(itemId)(state)
  const itemStatus = (item && item.status) || ''
  const shouldDisplaySetStatus = tasksSelectors.isInnermost(state, itemId)

  return {
    shouldDisplaySetStatus,
    shouldDisplaySetStatusNotStarted: shouldDisplaySetStatus && itemStatus === 'in-progress',
    shouldDisplaySetStatusInProgress: shouldDisplaySetStatus && (
      itemStatus === 'not-started' ||
      itemStatus === 'completed'
    ),
    shouldDisplaySetStatusCompleted: shouldDisplaySetStatus && itemStatus === 'in-progress'
  }
}

export const mapDispatchToProps = (dispatch, ownProps) => {
  const itemId = ownProps.itemId
  return {
    onAddItem: () => {
      dispatch(
        formsActions.formsActivate(
          'task-add',
          {
            parentId: itemId
          }
        )
      )
    },
    onDeleteItem: taskId => {
      dispatch(
        formsActions.formsActivate(
          'task-delete',
          {
            taskId: taskId
          }
        )
      )
    },
    onEditItem: taskId => {
      dispatch(
        formsActions.formsActivate(
          'task-edit',
          {
            taskId: taskId
          }
        )
      )
    },
    onUpdateItemStatus: (taskId, nextStatus) => () => {
      dispatch(tasksThunks.setTaskStatus(taskId, nextStatus))
    }
  }
}

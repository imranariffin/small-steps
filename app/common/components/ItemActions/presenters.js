import formsActions from 'ss/forms/actions'
import goalsSelectors from 'ss/goals/selectors'
import tasksSelectors from 'ss/tasks/selectors'
import tasksThunks from 'ss/tasks/thunks'

export const mapStateToProps = (state, ownProps) => {
  const { itemId, type } = ownProps
  const item = {
    goal: goalsSelectors.getById,
    task: tasksSelectors.getById
  }[type](itemId)(state)
  const itemStatus = (item && item.status) || ''
  const shouldDisplaySetStatus = type === 'task' && tasksSelectors.isInnermost(state, itemId)

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
  const { itemId, type } = ownProps
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
    onDeleteItem: itemId => {
      if (type === 'task') {
        dispatch(formsActions.formsActivate('task-delete', { taskId: itemId }))
      } else if (type === 'goal') {
        dispatch(formsActions.formsActivate('goal-delete', { goalId: itemId }))
      }
    },
    onEditItem: itemId => {
      dispatch(formsActions.formsDeactivate('goal-add'))
      if (type === 'task') {
        dispatch(formsActions.formsActivate('task-edit', { taskId: itemId }))
      } else if (type === 'goal') {
        dispatch(formsActions.formsActivate('goal-edit', { goalId: itemId }))
      }
    },
    onUpdateItemStatus: (taskId, nextStatus) => () => {
      dispatch(tasksThunks.setTaskStatus(taskId, nextStatus))
    }
  }
}

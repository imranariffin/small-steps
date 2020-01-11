import formsActions from 'ss/models/forms/actions'
import tasksSelectors from 'ss/models/tasks/selectors'
import tasksThunks from 'ss/models/tasks/thunks'

export const mapStateToProps = (state, ownProps) => {
  const { itemId } = ownProps
  const item = tasksSelectors.getById(itemId)(state)

  console.log('*****')
  console.log(state)
  console.log(tasksSelectors.getById(itemId)(state))

  return {
    itemStatus: (item && item.status) || ''
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
    onUpdateItemStatus: (taskId, nextStatus) => {
      // dispatch(
      //   formsActions.formsActivate(
      //     'task-update-status',
      //     {
      //       taskId: taskId
      //     }
      //   )
      // )
      dispatch(tasksThunks.setTaskStatus(taskId, nextStatus))
    }
  }
}

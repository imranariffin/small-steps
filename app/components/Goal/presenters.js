import tasksSelectors from 'mg/models/tasks/selectors'

export const mapStateToProps = (state, ownProps) => {
  const {
    item: {
      id: parentId
    }
  } = ownProps
  const subtasks = tasksSelectors.getByParentId(parentId)(state)

  return {
    ...ownProps,
    subtasks
  }
}

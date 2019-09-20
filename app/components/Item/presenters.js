import tasksSelectors from 'mg/models/tasks/selectors'

export const mapStateToProps = (state, ownProps) => {
  const {
    item: {
      id: parentId
    }
  } = ownProps
  const subItems = tasksSelectors.getByParentId(parentId)(state)

  return {
    ...ownProps,
    subItems
  }
}

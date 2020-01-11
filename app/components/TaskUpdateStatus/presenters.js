export const mapStateToProps = (state) => {
  return {
    statusDown: 'Mark to do',
    statusUp: 'Mark completed'
  }
}

export const mapDispatchToProps = (dispatch) => {
  return {
    handleSetStatusDown: () => {},
    handleSetStatusUp: () => {}
  }
}

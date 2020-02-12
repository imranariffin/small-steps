/* eslint-env jest */

import { shallow } from 'enzyme'

import { mapDispatchToProps, mapStateToProps } from 'ss/tasks/components/TaskAdd/presenters'
import TaskAdd from 'ss/tasks/components/TaskAdd/TaskAdd'
import store from 'ss/store'

jest.mock('@react-native-community/async-storage', () => {
  return {}
})

describe('TaskAdd presenters', () => {
  let dispatch, state

  beforeEach(() => {
    state = store.getState()
  })

  test('provide all required props', () => {
    const ownProps = { active: false }
    const stateProps = mapStateToProps(state)
    const dispatchProps = mapDispatchToProps(dispatch)
    const props = { ...ownProps, ...dispatchProps, ...stateProps }

    shallow(<TaskAdd {...props} />)
  })
})

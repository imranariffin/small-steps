/* eslint-env jest */

import { shallow } from 'enzyme'
import React from 'react'

import { mapStateToProps, mapDispatchToProps } from 'ss/components/GoalEdit/presenters'
import GoalEdit from 'ss/components/GoalEdit/GoalEdit'
import formsActions from 'ss/models/forms/actions'
import store from 'ss/store'

describe('GoalEdit', () => {
  let dispatch, props, state

  beforeEach(() => {
    dispatch = jest.fn()
    state = store.getState()
    state.goals.byId = {
      'some-goal-id': { id: 'some-goal-id', text: 'some-text' }
    }
    props = { ...mapStateToProps(state), ...mapDispatchToProps(dispatch) }
  })

  test('provided with all required props', () => {
    jest.spyOn(window.console, 'error')

    shallow(<GoalEdit {...props} />)

    expect(window.console.error.mock.calls).toEqual([])
  })

  test('display/hide form correctly', () => {
    const testCases = [
      { form: { active: true, formData: {} }, expected: true },
      { form: { active: false, formData: {} }, expected: false },
      { form: undefined, expected: false }
    ]

    testCases.forEach(({ form, expected }) => {
      state.forms['goal-edit'] = form

      props = { ...mapStateToProps(state), ...mapDispatchToProps(dispatch) }

      expect(props.active).toEqual(expected)
    })
  })

  test('swap goal-edit form with goal-add form', () => {
    expect(dispatch.mock.calls).toEqual([])

    props.handlePressCancel()

    expect(dispatch.mock.calls).toEqual([
      [formsActions.formsDeactivate('goal-edit')],
      [formsActions.formsActivate('goal-add')]
    ])
  })

  test('provide correct initial text', () => {
    state.forms['goal-edit'] = {
      active: true,
      formData: { goalId: 'some-goal-id' }
    }
    state.goals.byId['some-goal-id'] = {
      ...state.goals.byId['some-goal-id'],
      text: 'some-goal-text'
    }

    props = { ...mapStateToProps(state), ...mapDispatchToProps(dispatch) }

    expect(props.text).toEqual('some-goal-text')
  })

  test('handle text changes', () => {
    const instance = shallow(<GoalEdit {...props} />).instance()

    expect(instance.state.text).toEqual('')
    
    instance.onHandleChangeText('some-new-text')

    expect(instance.state.text).toEqual('some-new-text')
  })
})

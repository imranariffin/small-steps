/* eslint-env jest */

import { shallow } from 'enzyme'

import ItemActions from 'ss/components/ItemActions/ItemActions'
import { mapStateToProps, mapDispatchToProps } from 'ss/components/ItemActions/presenters'
import formsActions from 'ss/models/forms/actions'

describe('ItemActions presenters', () => {
  let dispatch, ownProps, props, state

  beforeEach(() => {
    dispatch = jest.fn()
    ownProps = {
      display: false,
      itemId: 'some-item-id-0',
      shouldFlipY: false,
      type: 'task'
    }
    state = {
      goals: {
        allIds: ['some-goal-id-0'],
        byId: {
          'some-goal-id-0': {
            status: 'completed'
          }
        }
      },
      tasks: {
        allIds: ['some-task-id-0'],
        byId: {
          'some-task-id-0': {
            status: 'completed'
          }
        }
      }
    }
    props = {
      ...ownProps,
      ...mapStateToProps(state, ownProps),
      ...mapDispatchToProps(dispatch, ownProps)
    }
  })

  test('provide all required props', () => {
    jest.spyOn(window.console, 'error')

    shallow(<ItemActions {...props} />)

    expect(window.console.error.mock.calls).toEqual([])
  })

  test('provide correct on delete callback', () => {
    ownProps = { ...ownProps, type: 'goal' }
    props = {
      ...ownProps,
      ...mapStateToProps(state, ownProps),
      ...mapDispatchToProps(dispatch, ownProps)
    }

    props.onDeleteItem('some-goal-id')

    ownProps = { ...ownProps, type: 'task' }
    props = {
      ...ownProps,
      ...mapStateToProps(state, ownProps),
      ...mapDispatchToProps(dispatch, ownProps)
    }

    props.onDeleteItem('some-task-id')

    expect(dispatch.mock.calls).toEqual([
      [formsActions.formsActivate('goal-delete', { goalId: 'some-goal-id' })],
      [formsActions.formsActivate('task-delete', { taskId: 'some-task-id' })]
    ])
  })

  test('onEditItem deactivate goal-add form and activate goal-edit form', () => {
    ownProps = { ...ownProps, type: 'goal' }
    props = {
      ...ownProps,
      ...mapStateToProps(state, ownProps),
      ...mapDispatchToProps(dispatch, ownProps)
    }

    props.onEditItem('some-goal-id')

    expect(dispatch.mock.calls).toEqual([
      [formsActions.formsDeactivate('goal-add')],
      [formsActions.formsActivate('goal-edit', { goalId: 'some-goal-id' })]
    ])
  })

  test('onEditItem deactivate goal-add form and activate task-edit form', () => {
    ownProps = { ...ownProps, type: 'task' }
    props = {
      ...ownProps,
      ...mapStateToProps(state, ownProps),
      ...mapDispatchToProps(dispatch, ownProps)
    }

    props.onEditItem('some-task-id')

    expect(dispatch.mock.calls).toEqual([
      [formsActions.formsDeactivate('goal-add')],
      [formsActions.formsActivate('task-edit', { taskId: 'some-task-id' })]
    ])
  })
})

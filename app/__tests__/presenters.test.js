/* eslint-env jest */

import React from 'react'
import { shallow } from 'enzyme'

import { mapDispatchToProps, mapStateToProps } from 'ss/presenters'
import { App } from 'ss/App'

describe('App presenters', () => {
  let dispatch, state

  beforeEach(() => {
    dispatch = jest.fn()
    state = {
      forms: {
        'goal-add': {
          active: true
        }
      },
      goals: {
        allIds: ['some-goal-id-0', 'some-goal-id-1', 'some-goal-id-2'],
        byId: {
          'some-goal-id-0': {
            id: 'some-goal-id-0',
            created: 100,
            status: 'not_started',
            text: 'some-goal-text-0'
          },
          'some-goal-id-1': {
            id: 'some-goal-id-1',
            created: 101,
            status: 'in_progress',
            text: 'some-goal-text-1'
          },
          'some-goal-id-2': {
            id: 'some-goal-id-2',
            created: 10,
            status: 'completed',
            text: 'some-goal-text-2'
          }
        }
      },
      storages: {
        statuses: {
          goals: 'not-initialized'
        }
      }
    }
  })

  test('provides all required props', () => {
    const props = {
      ...mapDispatchToProps(dispatch),
      ...mapStateToProps(state)
    }

    shallow(<App {...props} />)
  })
})

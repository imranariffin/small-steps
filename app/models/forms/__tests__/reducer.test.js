/* eslint-env jest */

import reducer from 'mg/models/forms/reducer'

describe('forms reducer', () => {
  let prevState, action

  beforeEach(() => {
    prevState = {}
    action = {}
  })

  describe('initially', () => {
    prevState = undefined

    it('should return correct initial state', () => {
      const state = reducer(prevState, action)

      expect(state).toEqual({})
    })
  })

  describe('action is `mg/forms/FORMS_ACTIVATE`', () => {
    beforeEach(() => {
      action = {
        type: 'mg/forms/FORMS_ACTIVATE',
        payload: {
          form: 'some-form-0'
        }
      }
      prevState = {
        'some-form-0': {
          active: false
        },
        'some-form-1': {
          active: false
        },
        'some-form-2': {
          active: true
        }
      }
    })

    it('should set `active` field of the specified form to true', () => {
      const state = reducer(prevState, action)

      expect(state['some-form-0'].active).toEqual(true)
    })

    it('should set `active` field of all others forms to false', () => {
      const state = reducer(prevState, action)

      expect(state['some-form-1'].active).toEqual(false)
      expect(state['some-form-2'].active).toEqual(false)
    })
  })

  describe('action is `mg/forms/FORMS_REGISTER`', () => {
    beforeEach(() => {
      action = {
        type: 'mg/forms/FORMS_REGISTER',
        payload: {
          formId: 'some-new-form-3'
        }
      }
      prevState = {
        'some-form-0': {
          active: false
        },
        'some-form-1': {
          active: false
        },
        'some-form-2': {
          active: true
        }
      }
    })

    it('should add another form by the provided `formId`', () => {
      const formsCount = Object.keys(prevState).length
      const state = reducer(prevState, action)

      expect(Object.keys(state).length).toEqual(formsCount + 1)
      expect(state['some-new-form-3']).toEqual(
        {
          active: false
        }
      )
    })
  })
})

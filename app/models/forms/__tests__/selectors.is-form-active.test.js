/* eslint-env jest */

import selectors from 'mg/models/forms/selectors'

describe('forms selectors isFormActive', () => {
  let state

  beforeEach(() => {
    state = {
      forms: {
        'some-form': {}
      }
    }
  })

  describe('form does not exist', () => {
    beforeEach(() => {
      state.forms['some-form-does-not-exist'] = undefined
    })

    it('should return false', () => {
      const form = 'some-form-does-not-exist'

      expect(selectors.isFormActive(form)(state)).toEqual(false)
    })
  })

  describe('form is not active', () => {
    beforeEach(() => {
      state.forms['some-form'].active = false
    })

    it('should return false', () => {
      const form = 'some-form'

      expect(selectors.isFormActive(form)(state)).toEqual(false)
    })
  })

  describe('form is active', () => {
    beforeEach(() => {
      state.forms['some-form'].active = true
    })

    it('should return true', () => {
      const form = 'some-form'

      expect(selectors.isFormActive(form)(state)).toEqual(true)
    })
  })
})

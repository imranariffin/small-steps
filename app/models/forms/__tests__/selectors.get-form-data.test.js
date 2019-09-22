/* eslint-env jest */

import selectors from 'mg/models/forms/selectors'

describe('forms selectors getFormData', () => {
  let state

  beforeEach(() => {
    state = {
      forms: {
        'some-form-0': {
          active: false,
          formData: {
            'some-form-data-0': 'some-form-data-value-0',
            'some-form-data-1': 'some-form-data-value-1'
          }
        }
      }
    }
  })

  it('should return correct formData given formId', () => {
    const formId = 'some-form-0'

    const formData = selectors.getFormData(formId)(state)

    expect(formData).toEqual(
      {
        'some-form-data-0': 'some-form-data-value-0',
        'some-form-data-1': 'some-form-data-value-1'
      }
    )
  })
})

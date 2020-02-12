/* eslint-env jest */

import reducer from 'ss/common/reducer'

describe('app reducer', () => {
  describe('initially', () => {
    it('should return correct initial state', () => {
      const prevState = undefined
      const action = {}

      const state = reducer(prevState, action)

      expect(state).toEqual(
        {
          deviceId: '',
          timezone: ''
        }
      )
    })
  })

  describe('action is `ss/common/INIT_APP`', () => {
    let prevState, action

    beforeEach(() => {
      prevState = {}
      action = {
        type: 'ss/common/INIT_APP',
        payload: {
          deviceId: 'some-device-id',
          timezone: 'some-timezone'
        }
      }
    })

    it('should return correct state', () => {
      const state = reducer(prevState, action)

      expect(state).toEqual(
        {
          deviceId: 'some-device-id',
          timezone: 'some-timezone'
        }
      )
    })
  })
})

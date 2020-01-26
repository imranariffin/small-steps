/* eslint-env jest */

import logger from 'ss/services/logger'

describe('logger services', () => {
  beforeEach(() => {
    jest.spyOn(window.console, 'log')
    window.console.log.mockImplementation(() => {})
    window.console.log.mockClear()
  })

  test('log using console log', () => {
    logger.log('a')

    expect(window.console.log.mock.calls).toEqual([['a']])
  })

  test('support variable arguments', () => {
    logger.log('a', 'b', 1, [], {})

    expect(window.console.log.mock.calls).toEqual([['a', 'b', 1, [], {}]])
  })
})

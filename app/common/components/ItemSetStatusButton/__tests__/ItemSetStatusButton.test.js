/* eslint-env jest */

import { shallow } from 'enzyme'

import ItemSetStatusButton from 'ss/common/components/ItemSetStatusButton'

describe('ItemSetStatusButton component', () => {
  let props

  beforeEach(() => {
    props = {
      onPress: jest.fn(),
      shouldDisplay: false,
      status: 'completed'
    }
  })

  test('render without error', () => {
    const testCases = [
      { status: 'not-started', shouldDisplay: false },
      { status: 'not-started', shouldDisplay: true },
      { status: 'in-progress', shouldDisplay: false },
      { status: 'in-progress', shouldDisplay: true },
      { status: 'completed', shouldDisplay: false },
      { status: 'completed', shouldDisplay: true }
    ]
    testCases.forEach((testCase) => {
      jest.spyOn(window.console, 'error')
      props = { ...props, ...testCase }

      shallow(<ItemSetStatusButton {...props} />)

      expect(window.console.error.mock.calls).toEqual([])
    })
  })
})

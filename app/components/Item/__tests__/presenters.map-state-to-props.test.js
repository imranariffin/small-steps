/* eslint-env jest */

import { mapStateToProps } from 'ss/components/Item/presenters'

describe('Item presenter mapStateToProps', () => {
  let state, ownProps

  beforeEach(() => {
    state = {
      tasks: {
        allIds: ['some-child-task-id-1', 'some-child-task-id-0'],
        byId: {
          'some-child-task-id-0': {
            created: 0,
            id: 'some-child-task-id-0',
            parent: 'some-task-id-0'
          },
          'some-child-task-id-1': {
            created: 1,
            id: 'some-child-task-id-1',
            parent: 'some-task-id-0'
          }
        }
      }
    }
    ownProps = {
      depth: 123,
      item: {
        id: 'some-task-id-0',
        created: 0
      }
    }
  })

  it('should convert `created` to a localized date', () => {
    const {
      item: {
        created
      }
    } = mapStateToProps(state, ownProps)

    expect(created).toEqual('01/01/1970, 00:00:00')
  })

  it('should provide correct `subItems` in correct order', () => {
    const { subItems } = mapStateToProps(state, ownProps)

    expect(subItems).toEqual(
      [
        {
          created: 0,
          id: 'some-child-task-id-0',
          parent: 'some-task-id-0'
        },
        {
          created: 1,
          id: 'some-child-task-id-1',
          parent: 'some-task-id-0'
        }
      ]
    )
  })

  it('should provide correct `depth` from props', () => {
    const { depth } = mapStateToProps(state, ownProps)

    expect(depth).toEqual(123)
  })
})

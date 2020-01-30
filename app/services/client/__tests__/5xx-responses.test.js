/* eslint-env jest */

import client from 'ss/services/client'

const mockFetch = mockResponse => {
  const mockFetch = () => Promise.resolve(mockResponse)
  mockResponse.json = jest.fn(
    () => Promise.resolve(JSON.parse(mockResponse.body))
  )
  mockResponse.text = jest.fn(() => Promise.resolve(mockResponse.body))
  global.fetch = jest.fn(mockFetch)
}

describe('client 5xx-response', () => {
  beforeAll(() => {
    const mockResponse = {
      ok: false,
      status: 500,
      body: '<html></html>'
    }
    mockFetch(mockResponse)
  })

  it('should return 5xx response correctly', async () => {
    const response = await client.get('https://google.ca')

    expect(response.ok).toBe(false)
    expect(response.status).toEqual(500)
    expect(response.body).toEqual(undefined)
    expect(response.bodyText).toEqual('<html></html>')
    expect(response.error).toEqual(
      {
        message: 'Response is not JSON parse-able'
      }
    )
  })
})

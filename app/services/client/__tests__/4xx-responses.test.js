/* eslint-env jest */

import client from 'mg/services/client'

const mockFetch = mockResponse => {
  const mockFetch = () => Promise.resolve(mockResponse)
  mockResponse.json = jest.fn(
    () => Promise.resolve(JSON.parse(mockResponse.body))
  )
  mockResponse.text = jest.fn(() => Promise.resolve(mockResponse.body))
  global.fetch = jest.fn(mockFetch)
}

describe('client 4xx-response', () => {
  beforeAll(() => {
    const mockResponse = {
      ok: false,
      status: 403,
      body: `{
        "error": "some-error"
      }`
    }
    mockFetch(mockResponse)
  })

  it('should return 4xx error response correctly', async () => {
    const response = await client.get('/v1/some-endpoints')

    expect(response.ok).toBe(false)
    expect(response.status).toBe(403)
    expect(response.body).toBe(undefined)
    expect(response.error).toEqual(
      {
        error: 'some-error'
      }
    )
  })
})

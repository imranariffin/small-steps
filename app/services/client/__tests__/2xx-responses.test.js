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

describe('client success-response', () => {
  beforeAll(() => {
    const mockResponse = {
      ok: true,
      status: 200,
      body: `{
        "data": "some-data"
      }`
    }
    mockFetch(mockResponse)
  })

  it('should return successful response correctly', async () => {
    const response = await client.get('/v1/some-endpoints')

    expect(response.ok).toBe(true)
    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      {
        data: 'some-data'
      }
    )
  })
})

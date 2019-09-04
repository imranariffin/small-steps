import client from 'mg/services/client'

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

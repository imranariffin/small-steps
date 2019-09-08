const defaultOptions = {
  method: 'GET'
}

const setupMockFetch = () => {
  global.fetch = (url, options = defaultOptions) => {
    const { method } = options
    const fullUrl = `${method.toUpperCase()} ${url}`

    switch (fullUrl) {
      case 'GET https://ma-goals-api.com/v1/goals/': {
        const mockResponseJson = {
          goals: [
            {
              id: 'some-uuid-0',
              created: 1567297466678,
              text: 'Hike Kilamanjaro'
            },
            {
              id: 'some-uuid-1',
              created: 1367297466678,
              text: 'Get shahadah certificate'
            },
            {
              id: 'some-uuid-3',
              created: 1567597466678,
              text: (
                'A goal with a very long description. ' +
                'This item should span multiple lines. In fact, it should ' +
                'span at least 3 lines. This is useful for testing.'
              )
            },
            {
              id: 'some-uuid-2',
              created: 1567597466678,
              text: 'Work at Google'
            }
          ]
        }
        const mockResponse = {
          status: 200,
          ok: true,
          json: () => Promise.resolve(mockResponseJson),
          text: () => Promise.resolve(JSON.stringify(mockResponseJson))
        }
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(mockResponse)
          }, 500)
        })
      }
      default: {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(Error())
          })
        })
      }
    }
  }
}

export default setupMockFetch

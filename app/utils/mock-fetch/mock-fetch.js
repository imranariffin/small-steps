import goalsCreateResponse from './goals-create.json'
import goalsListResponse from './goals-list.json'
import tasksListResponse from './tasks-list.json'

const defaultOptions = {
  method: 'GET'
}

const createMockResponseDelayed = (response, delayMs) => {
  const {
    status,
    statusText,
    ok,
    body
  } = response

  return new Promise(
    resolve => {
      setTimeout(
        () => {
          resolve(
            {
              status,
              statusText,
              ok,
              json: () => Promise.resolve(body),
              text: () => Promise.resolve(JSON.stringify(body))
            }
          )
        },
        delayMs
      )
    }
  )
}

const setupMockFetch = () => {
  global.fetch = (url, options = defaultOptions) => {
    const { method } = options
    const fullUrl = `${method.toUpperCase()} ${url}`

    switch (fullUrl) {
      case 'GET https://ma-goals-api.com/v1/goals/': {
        return createMockResponseDelayed(goalsListResponse, 500)
      }
      case 'POST https://ma-goals-api.com/v1/goals/': {
        const {
          body: {
            text
          }
        } = options

        goalsCreateResponse.body.created = Date.now()
        goalsCreateResponse.body.id = (
          `some-uuid-${Math.floor(Math.random() * 1000)}`
        )
        goalsCreateResponse.body.text = text

        return createMockResponseDelayed(goalsCreateResponse, 600)
      }
      case 'GET https://ma-goals-api.com/v1/tasks/': {
        return createMockResponseDelayed(tasksListResponse, 500)
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

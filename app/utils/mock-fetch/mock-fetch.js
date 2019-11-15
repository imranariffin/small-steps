import goalsCreateResponse from './goals-create.json'
import goalsListResponse from './goals-list.json'
import tasksCreateResponse from './tasks-create.json'
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
    let id
    if (options.body) {
      id = options.body.id
    }

    if (fullUrl === `PATCH https://small-steps-api.com/v1/tasks/${id}/`) {
      const { body: { text } } = options

      tasksCreateResponse.body.id = id
      tasksCreateResponse.body.modified = Date.now()
      tasksCreateResponse.body.text = text

      return createMockResponseDelayed(tasksCreateResponse, 300)
    }

    switch (fullUrl) {
      case 'GET https://small-steps-api.com/v1/goals/': {
        return createMockResponseDelayed(goalsListResponse, 500)
      }
      case 'POST https://small-steps-api.com/v1/goals/': {
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
      case 'GET https://small-steps-api.com/v1/tasks/': {
        return createMockResponseDelayed(tasksListResponse, 500)
      }
      case 'POST https://small-steps-api.com/v1/tasks/': {
        const {
          body: {
            parent,
            text
          }
        } = options

        tasksCreateResponse.body.created = Date.now()
        tasksCreateResponse.body.id = (
          `some-uuid-${Math.floor(Math.random() * 1000)}`
        )
        tasksCreateResponse.body.parent = parent
        tasksCreateResponse.body.text = text

        return createMockResponseDelayed(tasksCreateResponse, 500)
      }
      default: {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            reject(Error('End point not implemented'))
          })
        })
      }
    }
  }
}

export default setupMockFetch

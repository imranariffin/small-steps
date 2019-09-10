import goalsCreate from './goals-create.json'
import goalsList from './goals-list.json'

const defaultOptions = {
  method: 'GET'
}

const createMockResponseDelayed = ({ status, ok, bodyJson }, delayMs) =>
  new Promise(
    resolve => {
      setTimeout(
        () => {
          resolve(
            {
              status,
              ok,
              json: () => Promise.resolve(bodyJson),
              text: () => Promise.resolve(JSON.stringify(bodyJson))
            }
          )
        },
        delayMs
      )
    }
  )

const setupMockFetch = () => {
  global.fetch = (url, options = defaultOptions) => {
    const { method } = options
    const fullUrl = `${method.toUpperCase()} ${url}`

    switch (fullUrl) {
      case 'GET https://ma-goals-api.com/v1/goals/': {
        return createMockResponseDelayed(
          {
            status: 200,
            ok: true,
            bodyJson: goalsList
          },
          500
        )
      }
      case 'POST https://ma-goals-api.com/v1/goals/': {
        const {
          body: {
            text
          }
        } = options

        goalsCreate.created = Date.now()
        goalsCreate.id = `some-uuid-${Math.floor(Math.random() * 1000)}`
        goalsCreate.text = text

        return createMockResponseDelayed(
          {
            status: 201,
            ok: true,
            bodyJson: goalsCreate
          },
          600
        )
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

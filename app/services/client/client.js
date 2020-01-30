class Client {
  get = async url => {
    const response = await fetch(url)
    const responseJson = {}
    let responseBodyText

    try {
      responseBodyText = await response.text()
      responseJson.body = JSON.parse(responseBodyText)
    } catch (_) {
      responseJson.error = {
        message: 'Response is not JSON parse-able'
      }
      responseJson.bodyText = responseBodyText
    }
    responseJson.status = response.status
    responseJson.ok = response.ok

    if (response.status < 500 && !response.ok) {
      responseJson.error = responseJson.body
      responseJson.body = undefined
    }

    return responseJson
  }

  patch = async (url, options = {}) => {
    options = {
      ...options,
      method: 'PATCH'
    }
    const response = await fetch(url, options)
    const responseJson = {}
    let responseBodyText

    try {
      responseBodyText = await response.text()
      responseJson.body = JSON.parse(responseBodyText)
    } catch (_) {
      responseJson.error = {
        message: 'Response is not JSON parse-able'
      }
      responseJson.bodyText = responseBodyText
    }
    responseJson.status = response.status
    responseJson.ok = response.ok

    if (response.status < 500 && !response.ok) {
      responseJson.error = responseJson.body
      responseJson.body = undefined
    }

    return responseJson
  }

  post = async (url, options = {}) => {
    options = {
      ...options,
      method: 'POST'
    }
    const response = await fetch(url, options)
    const responseJson = {}
    let responseBodyText

    try {
      responseBodyText = await response.text()
      responseJson.body = JSON.parse(responseBodyText)
    } catch (_) {
      responseJson.error = {
        message: 'Response is not JSON parse-able'
      }
      responseJson.bodyText = responseBodyText
    }
    responseJson.status = response.status
    responseJson.ok = response.ok

    if (response.status < 500 && !response.ok) {
      responseJson.error = responseJson.body
      responseJson.body = undefined
    }

    return responseJson
  }
}

const client = new Client()

export default client

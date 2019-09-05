class Client {
  get = async url => {
    const response = await fetch(url)
    let responseJson = {}
    let responseBodyText

    try {
      responseBodyText = await response.text()
      responseJson.body = JSON.parse(responseBodyText)
    }
    catch (_) {
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

client = new Client()

export default client

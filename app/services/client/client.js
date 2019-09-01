class Client {
  get = () => 
    new Promise(resolve => {
      setTimeout(
        () => {
          resolve(
            {
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
                  id: 'some-uuid-2',
                  created: 1567597466678,
                  text: 'Work at Google'
                }
              ]
            }
          )
        },
        700 // 0.7 seconds
      )
    })
}

client = new Client()

export default client
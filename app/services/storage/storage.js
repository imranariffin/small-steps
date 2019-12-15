const Goal = {
  save: async goal => {
    return Promise.resolve(goal)
  }
}

const storage = {
  models: {
    Goal
  }
}

export default storage

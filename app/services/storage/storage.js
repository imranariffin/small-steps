import AsyncStorage from '@react-native-community/async-storage'

const Goal = {
  KEY: 'ss:goals',
  create: async goal => {
    const goals = (await Goal.getAll()).concat(goal)
    await AsyncStorage.setItem(Goal.KEY, JSON.stringify(goals))
    return goal
  },
  getAll: async () => {
    const goalsStr = await AsyncStorage.getItem(Goal.KEY)
    if (goalsStr === null || goalsStr === undefined) {
      return null
    }
    return JSON.parse(goalsStr)
  },
  init: async () => {
    const goals = await AsyncStorage.getItem(Goal.KEY)
    if (goals === null) {
      await AsyncStorage.setItem(Goal.KEY, JSON.stringify([]))
    }
  }
}

const storage = {
  models: {
    Goal
  }
}

export default storage

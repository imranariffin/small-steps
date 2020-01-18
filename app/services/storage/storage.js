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
  getById: async (id) => {
    const goals = await Goal.getAll(id)
    if (!goals) {
      return undefined
    }
    return goals.find(g => g.id === id)
  },
  update: async (goalToBeUpdated) => {
    const goals = await Goal.getAll(goalToBeUpdated.id)
    const goal = goals.find(t => t.id === goalToBeUpdated.id)

    if (goal === undefined) {
      throw Error(`Goal '${goalToBeUpdated.id}' does not exist`)
    }

    const goalsNew = goals
      .filter(g => g.id !== goal.id)
      .concat(goalToBeUpdated)
      .sort((a, b) => {
        const idA = a.id.toUpperCase()
        const idB = b.id.toUpperCase()
        if (idA < idB) {
          return -1
        }
        if (idA > idB) {
          return 1
        }
        return 0
      })
    await AsyncStorage.setItem(Goal.KEY, JSON.stringify(goalsNew))
  },
  init: async () => {
    const goals = await AsyncStorage.getItem(Goal.KEY)
    if (goals === null) {
      await AsyncStorage.setItem(Goal.KEY, JSON.stringify([]))
    }
  }
}

const Task = {
  KEY: 'ss:tasks',
  create: async task => {
    const tasks = (await Task.getAll()).concat(task)
    await AsyncStorage.setItem(Task.KEY, JSON.stringify(tasks))
    return task
  },
  delete: async (id) => {
    const tasks = await Task.getAll()
    const finalTasks = tasks.filter(t => t.id !== id)
    await AsyncStorage.setItem(Task.KEY, JSON.stringify(finalTasks))
  },
  getAll: async () => {
    const tasksStr = await AsyncStorage.getItem(Task.KEY)
    if (tasksStr === null || tasksStr === undefined) {
      return null
    }
    return JSON.parse(tasksStr)
  },
  getById: async (id) => {
    const tasks = await Task.getAll(id)
    if (!tasks) {
      return undefined
    }
    return tasks.find(t => t.id === id)
  },
  init: async () => {
    const tasks = await AsyncStorage.getItem(Task.KEY)
    if (tasks === null) {
      await AsyncStorage.setItem(Task.KEY, JSON.stringify([]))
    }
  },
  update: async (taskToBeUpdated) => {
    const tasks = await Task.getAll(taskToBeUpdated.id)
    const task = tasks.find(t => t.id === taskToBeUpdated.id)

    if (task === undefined) {
      throw Error(`Task '${taskToBeUpdated.id}' does not exist`)
    }

    const tasksNew = tasks
      .filter(t => t.id !== task.id)
      .concat(taskToBeUpdated)
      .sort((a, b) => {
        const idA = a.id.toUpperCase()
        const idB = b.id.toUpperCase()
        if (idA < idB) {
          return -1
        }
        if (idA > idB) {
          return 1
        }
        return 0
      })
    await AsyncStorage.setItem(Task.KEY, JSON.stringify(tasksNew))

    return taskToBeUpdated
  }
}

const storage = {
  models: {
    Goal,
    Task
  }
}

export default storage

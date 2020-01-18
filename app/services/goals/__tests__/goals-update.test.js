import AsyncStorage from '@react-native-community/async-storage'

import goalsService from 'ss/services/goals'

describe('goals service update', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
  })

  test('storage stores successfully', async () => {
    const goals = [{ id: 'goal-id-0', status: 'in-progress' }]
    await AsyncStorage.setItem('ss:goals', JSON.stringify(goals))

    await goalsService.update({ id: 'goal-id-0', status: 'completed' })

    const goalsNext = JSON.parse(await AsyncStorage.getItem('ss:goals'))
    expect(new Set(goalsNext)).toEqual(new Set([{ id: 'goal-id-0', status: 'completed' }]))
  })

  test('storage throws error', () => {})
  test('goal not found', () => {})
  test('goal fields invalid', () => {})
})

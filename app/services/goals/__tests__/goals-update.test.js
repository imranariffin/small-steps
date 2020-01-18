/* eslint-env jest */

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

  test('storage throws error', async () => {
    const goals = [{ id: 'goal-id-0', status: 'in-progress' }]
    await AsyncStorage.setItem('ss:goals', JSON.stringify(goals))
    jest
      .spyOn(AsyncStorage, 'setItem')
      .mockImplementationOnce(() => Promise.reject(Error('some-error')))

    const badPromise = goalsService.update({ id: 'goal-id-0', status: 'completed' })

    await expect(badPromise).rejects.toThrow(Error('some-error'))
  })

  test('goal not found', async () => {
    const goals = [{ id: 'goal-id-0', status: 'in-progress' }]
    await AsyncStorage.setItem('ss:goals', JSON.stringify(goals))

    const badPromise = goalsService.update({ id: 'does-not-exist-id', status: 'completed' })

    await expect(badPromise).rejects.toThrow(Error('Goal \'does-not-exist-id\' does not exist'))
  })

  test('goal fields invalid', async () => {
    const goals = [{ id: 'goal-id-0', status: 'in-progress' }]
    await AsyncStorage.setItem('ss:goals', JSON.stringify(goals))

    const badPromise = goalsService.update({ id: 'goal-id-0', parent: 'parent-id' })

    await expect(badPromise).rejects.toThrow(Error('Goal field \'parent\' is not valid'))
  })
})

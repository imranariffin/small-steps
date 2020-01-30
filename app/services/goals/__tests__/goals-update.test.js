/* eslint-env jest */

import AsyncStorage from '@react-native-community/async-storage'

import goalsService from 'ss/services/goals'

describe('goals service update', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
  })

  test('storage stores successfully', async () => {
    const id = 'goal-id-0'
    const goals = [{ id: 'goal-id-0', status: 'in-progress' }]
    await AsyncStorage.setItem('ss:goals', JSON.stringify(goals))

    await goalsService.update(id, { status: 'completed', text: 'some-new-text' })

    const goalsNext = JSON.parse(await AsyncStorage.getItem('ss:goals'))
    expect(new Set(goalsNext)).toEqual(
      new Set([{ id: 'goal-id-0', status: 'completed', text: 'some-new-text' }])
    )
  })

  test('storage throws error', async () => {
    const id = 'goal-id-0'
    const goals = [{ id: 'goal-id-0', status: 'in-progress' }]
    await AsyncStorage.setItem('ss:goals', JSON.stringify(goals))
    jest
      .spyOn(AsyncStorage, 'setItem')
      .mockImplementationOnce(() => Promise.reject(Error('some-error')))

    const badPromise = goalsService.update(id, { status: 'completed' })

    await expect(badPromise).rejects.toThrow(Error('some-error'))
  })

  test('goal not found', async () => {
    const id = 'does-not-exist-id'
    const goals = [{ id: 'goal-id-0', status: 'in-progress' }]
    await AsyncStorage.setItem('ss:goals', JSON.stringify(goals))

    const badPromise = goalsService.update(id, { status: 'completed' })

    await expect(badPromise).rejects.toThrow(Error('Goal \'does-not-exist-id\' does not exist'))
  })

  test('goal fields invalid', async () => {
    const id = 'goal-id-0'
    const goals = [{ id: 'goal-id-0', status: 'in-progress' }]
    await AsyncStorage.setItem('ss:goals', JSON.stringify(goals))

    const badPromise = goalsService.update(id, { parent: 'parent-id' })

    await expect(badPromise).rejects.toThrow(Error('Goal field \'parent\' is not valid'))
  })
})

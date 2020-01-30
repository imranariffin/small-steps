/* eslint-env jest */

import AsyncStorage from '@react-native-community/async-storage'

import goalsService from 'ss/services/goals'

describe('goals service delete', () => {
  beforeEach(async () => {
    await AsyncStorage.clear()
    const goals = JSON.stringify([
      { id: 'goal-id-0', status: 'in-progress' },
      { id: 'goal-id-1', status: 'in-progress' }
    ])
    await AsyncStorage.setItem('ss:goals', goals)
  })

  test('delete existing goal', async () => {
    await goalsService.delete('goal-id-0')

    const goals = JSON.parse(await AsyncStorage.getItem('ss:goals'))

    expect(goals.length).toEqual(1)
    expect(goals[0]).toEqual({ id: 'goal-id-1', status: 'in-progress' })
  })

  test('delete non-existing goal', async () => {
    const promise = goalsService.delete('non-existent-goal')

    await expect(promise).rejects.toThrow(Error('Goal \'non-existent-goal\' does not exist'))
  })

  test('storage throws error', async () => {
    AsyncStorage.getItem.mockImplementationOnce(() => { throw Error('some-error') })

    const promise = goalsService.delete('goal-id-0')

    await expect(promise).rejects.toThrow(Error('some-error'))
  })
})

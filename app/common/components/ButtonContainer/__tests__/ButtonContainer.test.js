/* eslint-env jest */

import { View } from 'react-native'
import { shallow } from 'enzyme'

import ButtonContainer from 'ss/common/components/ButtonContainer/ButtonContainer'

describe('ButtonContainer component', () => {
  it('should render without error', () => {
    const children = [shallow(<View />)]

    shallow(<ButtonContainer>{children}</ButtonContainer>)
  })
})

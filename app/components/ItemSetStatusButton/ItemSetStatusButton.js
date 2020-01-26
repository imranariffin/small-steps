import PropTypes from 'prop-types'
import React from 'react'
import styled from 'styled-components/native'
import RN from 'react-native'

const Container = styled(RN.TouchableOpacity)`
  margin-top: 4px;
  margin-right: 15px;
`
const Image = styled(RN.Image)`
  height: 15px;
  justify-content: flex-start;
  margin-top: 3px;
  width: 15px;
`

const imageSources = {
  completed: require('ss/components/Item/images/completed.png'),
  'in-progress': require('ss/components/Item/images/in-progress.png'),
  'not-started': require('ss/components/Item/images/not-started.png')
}

const ItemSetStatusButton = (props) => {
  const {
    onPress,
    shouldDisplay,
    status
  } = props

  if (!shouldDisplay) {
    return null
  }

  return (
    <Container onPress={onPress}>
      <Image resizeMode='contain' source={imageSources[status]} />
    </Container>
  )
}

ItemSetStatusButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  shouldDisplay: PropTypes.bool.isRequired,
  status: PropTypes.oneOf(['completed', 'in-progress', 'not-started']).isRequired
}

export default ItemSetStatusButton

import React from 'react'
import { Container, Title } from './style'

import { Entypo } from '@expo/vector-icons'

export const PublishButton: React.FC = () => {
  return (
    <Container>
      <Entypo name="plus" size={28} color="#fff" />
      <Title>Publicar</Title>
    </Container>
  )
}

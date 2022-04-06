import React from 'react'
import { Container, Title, Button, ButtonText } from './style'
import auth from '@react-native-firebase/auth'

export const Timeline: React.FC = () => {
  const handleLogOut = () => {
    auth().signOut()
  }

  return (
    <Container>
      <Title>Você está logado</Title>
      <Button onPress={handleLogOut}>
        <ButtonText>LogOut</ButtonText>
      </Button>
    </Container>
  )
}

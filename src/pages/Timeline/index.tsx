import React from 'react'
import { Container, Title, Button, ButtonText } from './style'
import { useNavigate } from '../../contexts/NavigateContext'
import { signOut } from 'firebase/auth'
import { auth } from '../../../firebase'

export const Timeline: React.FC = () => {
  const handleLogOut = () => {
    signOut(auth)
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

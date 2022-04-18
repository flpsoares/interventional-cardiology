import React from 'react'
import { auth } from '../../../firebase'
import { signOut } from 'firebase/auth'
import { Button, ButtonText, Container } from './style'

export const Account: React.FC = () => {
  const logOut = () => {
    signOut(auth)
  }

  return (
    <Container>
      <Button onPress={logOut}>
        <ButtonText>LogOut</ButtonText>
      </Button>
    </Container>
  )
}

import React from 'react'
import { LanguageDropdown } from '../../components/LanguageDropdown'
import { useNavigate } from '../../contexts/NavigateContext'
import {
  Banner,
  ButtonText,
  Container,
  LoginButton,
  RegisterButton,
  Title,
  Wrapper
} from './style'

export const ChooseAuth: React.FC = () => {
  const { navigateToLogin, navigateToRegister, navigateToInitial } = useNavigate()

  return (
    <Container>
      <Banner source={require('../../../assets/choose-auth/banner.png')} />
      <LanguageDropdown isOpen={false} />
      <Wrapper>
        <Title>Escolha uma opção para continuar...</Title>
        <LoginButton onPress={navigateToLogin}>
          <ButtonText>Faça o Login</ButtonText>
        </LoginButton>
        <LoginButton onPress={navigateToRegister}>
          <ButtonText>Cadastre-se</ButtonText>
        </LoginButton>
        <RegisterButton onPress={navigateToInitial}>
          <ButtonText>Entenda como funciona</ButtonText>
        </RegisterButton>
      </Wrapper>
    </Container>
  )
}

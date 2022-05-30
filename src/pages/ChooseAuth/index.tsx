import i18n from 'i18n-js'
import React from 'react'
import { LanguageDropdown } from '../../components/LanguageDropdown'
import { useLanguage } from '../../contexts/LanguageContext'
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
  const { language } = useLanguage()

  i18n.translations = {
    pt: {
      title: 'Escolha uma opção para continuar...',
      login: 'Faça o Login',
      register: 'Cadastre-se',
      phrase: 'Entenda como funciona'
    },
    en: {
      title: 'Choose an option to continue...',
      login: 'Login',
      register: 'Register',
      phrase: 'Understand how it works'
    },
    es: {
      title: 'Elija una opción para continuar...',
      login: 'Aceso',
      register: 'Registro',
      phrase: 'Entender cómo funciona'
    }
  }

  i18n.locale = language

  return (
    <Container>
      <Banner source={require('../../../assets/choose-auth/banner.png')} />
      <LanguageDropdown isOpen={false} />
      <Wrapper>
        <Title>{i18n.t('title')}</Title>
        <LoginButton onPress={navigateToLogin}>
          <ButtonText>{i18n.t('login')}</ButtonText>
        </LoginButton>
        <LoginButton onPress={navigateToRegister}>
          <ButtonText>{i18n.t('register')}</ButtonText>
        </LoginButton>
        <RegisterButton onPress={navigateToInitial}>
          <ButtonText>{i18n.t('phrase')}</ButtonText>
        </RegisterButton>
      </Wrapper>
    </Container>
  )
}

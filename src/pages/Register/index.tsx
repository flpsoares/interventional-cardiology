import React, { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native'
import {
  Container,
  Banner,
  Wrapper,
  Title,
  InputItem,
  InputIcon,
  Input,
  InputIconPassword,
  SubmitButton,
  SubmitButtonText,
  LoginButton,
  LoginButtonText,
  ScrollableContainer
} from './style'

import { FontAwesome, Entypo, Fontisto, Foundation } from '@expo/vector-icons'
import { useNavigate } from '../../contexts/NavigateContext'

import { primary } from '../../styles/globalCssVar'
import { LanguageDropdown } from '../../components/LanguageDropdown'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase'

export const Register: React.FC = () => {
  const { navigateToLogin, navigateToTimeline } = useNavigate()
  const [passwordIsHide, setPasswordIsHide] = useState(true)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [isClicked, setIsClicked] = useState(false)

  const toggleHidePassword = () => setPasswordIsHide(!passwordIsHide)

  const handleNewAccount = () => {
    navigateToTimeline()
    setIsClicked(true)
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => Alert.alert('Sucesso', 'Conta criada com sucesso'))
      .catch((error) => console.log(error))
      .finally(() => setIsClicked(false))
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
      keyboardVerticalOffset={40}
    >
      <ScrollableContainer
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <SafeAreaView>
          <Container onPress={Keyboard.dismiss}>
            <LanguageDropdown isOpen={false} />
            <Banner source={require('../../../assets/register/banner.png')} />
            <Wrapper>
              <Title>Faça seu Cadastro</Title>
              <InputItem style={{ elevation: 10 }}>
                <InputIcon>
                  <FontAwesome
                    name="user"
                    size={28}
                    color="rgba(77, 86, 109, 0.46)"
                  />
                </InputIcon>
                <Input placeholder="Nome Completo" />
              </InputItem>
              <InputItem style={{ elevation: 10 }}>
                <InputIcon>
                  <Entypo
                    name="newsletter"
                    size={28}
                    color="rgba(77, 86, 109, 0.46)"
                  />
                </InputIcon>
                <Input keyboardType="number-pad" placeholder="CPF" />
              </InputItem>
              <InputItem style={{ elevation: 10 }}>
                <InputIcon>
                  <Fontisto name="email" size={28} color="rgba(77, 86, 109, 0.46)" />
                </InputIcon>
                <Input onChangeText={setEmail} value={email} placeholder="E-mail" />
              </InputItem>
              <InputItem style={{ elevation: 10 }}>
                <InputIcon>
                  <Foundation
                    name="telephone"
                    size={28}
                    color="rgba(77, 86, 109, 0.46)"
                  />
                </InputIcon>
                <Input keyboardType="number-pad" placeholder="Telefone" />
              </InputItem>
              <InputItem style={{ elevation: 10 }}>
                <InputIcon>
                  <FontAwesome
                    name="key"
                    size={28}
                    color="rgba(77, 86, 109, 0.46)"
                  />
                </InputIcon>
                <Input
                  onChangeText={setPassword}
                  value={password}
                  placeholder="Digite sua senha"
                  secureTextEntry={passwordIsHide}
                />
                <InputIconPassword onPress={toggleHidePassword}>
                  {passwordIsHide ? (
                    <FontAwesome
                      name="eye"
                      size={28}
                      color="rgba(77, 86, 109, 0.46)"
                    />
                  ) : (
                    <FontAwesome
                      name="eye-slash"
                      size={28}
                      color="rgba(77, 86, 109, 0.46)"
                    />
                  )}
                </InputIconPassword>
              </InputItem>
              {isClicked ? (
                <ActivityIndicator size="large" color={primary} />
              ) : (
                <SubmitButton onPress={handleNewAccount}>
                  <SubmitButtonText>Cadastrar</SubmitButtonText>
                </SubmitButton>
              )}
              <LoginButton onPress={navigateToLogin}>
                <LoginButtonText>Login</LoginButtonText>
              </LoginButton>
            </Wrapper>
          </Container>
        </SafeAreaView>
      </ScrollableContainer>
    </KeyboardAvoidingView>
  )
}

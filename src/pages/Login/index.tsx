import React, { useState } from 'react'
import {
  Container,
  Banner,
  Wrapper,
  Title,
  InputItem,
  InputIcon,
  Input,
  InputIconPassword,
  ForgotPassword,
  ForgotPasswordText,
  SubmitButton,
  SubmitButtonText,
  RegisterButton,
  RegisterButtonText,
  ScrollableContainer
} from './style'

import { FontAwesome } from '@expo/vector-icons'
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigate } from '../../contexts/NavigateContext'

import auth from '@react-native-firebase/auth'
import { primary } from '../../styles/globalCssVar'

export const Login: React.FC = () => {
  const { navigateToRegister } = useNavigate()
  const [passwordIsHide, setPasswordIsHide] = useState(true)
  const [forgotPasswordIsActive, setForgotPasswordIsActive] = useState(false)

  const [isClicked, setIsClicked] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const toggleHidePassword = () => setPasswordIsHide(!passwordIsHide)

  const handleLogin = () => {
    if (email !== '' && password !== '') {
      setIsClicked(true)
      auth()
        .signInWithEmailAndPassword(email, password)
        .catch(() => {
          Alert.alert('Erro', 'Email ou senha inválidos')
          setPassword('')
        })
        .finally(() => setIsClicked(false))
    } else {
      Alert.alert('Erro', 'Preencha todos os campos')
    }
  }

  const handleForgotPassword = () => {
    if (email !== '') {
      setIsClicked(true)
      auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert('Redefinir senha', 'Enviamos um email para você')
          setForgotPasswordIsActive(false)
          setIsClicked(false)
        })
        .catch(() => {
          Alert.alert('Erro', 'Confira o email e mande novamente')
          setIsClicked(false)
        })
    } else {
      Alert.alert('Erro', 'Preencha todos os campos')
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={30}
    >
      <ScrollableContainer
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <SafeAreaView>
          <Container onPress={Keyboard.dismiss}>
            <Banner source={require('../../../assets/login/banner.png')} />
            <Wrapper>
              {!forgotPasswordIsActive ? (
                <>
                  <Title>Faça seu Login</Title>
                  <InputItem style={{ elevation: 10 }}>
                    <InputIcon>
                      <FontAwesome
                        name="user"
                        size={28}
                        color="rgba(77, 86, 109, 0.46)"
                      />
                    </InputIcon>
                    <Input
                      onChangeText={setEmail}
                      value={email}
                      placeholder="E-mail"
                    />
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
                      placeholder="Senha"
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
                </>
              ) : (
                <>
                  <Title>Informe o email para recuperar sua senha</Title>
                  <InputItem style={{ elevation: 10 }}>
                    <InputIcon>
                      <FontAwesome
                        name="user"
                        size={28}
                        color="rgba(77, 86, 109, 0.46)"
                      />
                    </InputIcon>
                    <Input
                      onChangeText={setEmail}
                      value={email}
                      placeholder="E-mail"
                    />
                  </InputItem>
                </>
              )}

              {!forgotPasswordIsActive ? (
                <ForgotPassword
                  onPress={() => {
                    setPassword('')
                    setForgotPasswordIsActive(true)
                  }}
                >
                  <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
                </ForgotPassword>
              ) : (
                <ForgotPassword onPress={() => setForgotPasswordIsActive(false)}>
                  <ForgotPasswordText>Voltar ao Login</ForgotPasswordText>
                </ForgotPassword>
              )}

              {isClicked ? (
                <ActivityIndicator size="large" color={primary} />
              ) : (
                <>
                  {!forgotPasswordIsActive ? (
                    <SubmitButton onPress={handleLogin}>
                      <SubmitButtonText>Login</SubmitButtonText>
                    </SubmitButton>
                  ) : (
                    <SubmitButton onPress={handleForgotPassword}>
                      <SubmitButtonText>Enviar</SubmitButtonText>
                    </SubmitButton>
                  )}
                </>
              )}
              <RegisterButton onPress={navigateToRegister}>
                <RegisterButtonText>Cadastre-se</RegisterButtonText>
              </RegisterButton>
            </Wrapper>
          </Container>
        </SafeAreaView>
      </ScrollableContainer>
    </KeyboardAvoidingView>
  )
}

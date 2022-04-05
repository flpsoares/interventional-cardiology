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
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigate } from '../../contexts/NavigateContext'

export const Login: React.FC = () => {
  const { navigateToRegister } = useNavigate()
  const [passwordIsHide, setPasswordIsHide] = useState(true)

  const toggleHidePassword = () => setPasswordIsHide(!passwordIsHide)
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
              <Title>Faça seu Login</Title>
              <InputItem style={{ elevation: 10 }}>
                <InputIcon>
                  <FontAwesome
                    name="user"
                    size={28}
                    color="rgba(77, 86, 109, 0.46)"
                  />
                </InputIcon>
                <Input placeholder="E-mail" />
              </InputItem>
              <InputItem style={{ elevation: 10 }}>
                <InputIcon>
                  <FontAwesome
                    name="key"
                    size={28}
                    color="rgba(77, 86, 109, 0.46)"
                  />
                </InputIcon>
                <Input placeholder="Senha" secureTextEntry={passwordIsHide} />
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
              <ForgotPassword>
                <ForgotPasswordText>Esqueceu sua senha?</ForgotPasswordText>
              </ForgotPassword>
              <SubmitButton>
                <SubmitButtonText>Logar</SubmitButtonText>
              </SubmitButton>
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

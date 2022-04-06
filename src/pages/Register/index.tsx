import React, { useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native'
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

export const Register: React.FC = () => {
  const { navigateToLogin } = useNavigate()
  const [passwordIsHide, setPasswordIsHide] = useState(true)

  const toggleHidePassword = () => setPasswordIsHide(!passwordIsHide)

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
                <Input placeholder="E-mail" />
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
              <SubmitButton>
                <SubmitButtonText>Cadastrar</SubmitButtonText>
              </SubmitButton>
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

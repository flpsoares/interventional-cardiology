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
  ScrollableContainer,
  BannerArea,
  FirstSupportImage,
  SecondSupportImage
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

import firebase, { database } from '../../../firebase'
import { primary } from '../../styles/globalCssVar'
import { LanguageDropdown } from '../../components/LanguageDropdown'
import { useUser } from '../../contexts/UserContext'

export const Login: React.FC = () => {
  const { navigateToRegister } = useNavigate()
  const { setUser } = useUser()
  const [passwordIsHide, setPasswordIsHide] = useState(true)
  const [forgotPasswordIsActive, setForgotPasswordIsActive] = useState(false)

  const [isClicked, setIsClicked] = useState(false)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const toggleHidePassword = () => setPasswordIsHide(!passwordIsHide)

  const handleLogin = () => {
    if (email !== '' && password !== '') {
      setIsClicked(true)
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(async (res) => {
          const userInfo = await database.doc(`users/${res.user?.uid}`).get()
          if (userInfo.data()?.isDoctor === true) {
            const data = {
              email: userInfo.data()?.email,
              isDoctor: userInfo.data()?.isDoctor,
              name: userInfo.data()?.name,
              telephone: userInfo.data()?.telephone,
              crm: userInfo.data()?.crm,
              institution: userInfo.data()?.institution,
              isSubscriber: userInfo.data()?.isSubscriber
            }
            setUser(data)
          } else {
            const data = {
              email: userInfo.data()?.email,
              isDoctor: userInfo.data()?.isDoctor,
              name: userInfo.data()?.name,
              telephone: userInfo.data()?.telephone
            }
            setUser(data)
          }
        })
        .catch(() => {
          Alert.alert('Erro', 'Email ou senha inválidos')
          setIsClicked(false)
          setPassword('')
        })
        .catch((error) => Alert.alert(error))
    } else {
      Alert.alert('Erro', 'Preencha todos os campos')
    }
  }

  const handleForgotPassword = () => {
    if (email !== '') {
      setIsClicked(true)
      firebase
        .auth()
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
            <BannerArea>
              <LanguageDropdown isOpen={false} />
              <Banner
                resizeMode="cover"
                source={require('../../../assets/login/banner.png')}
              />
              {/* <FirstSupportImage
                source={require('../../../assets/support_02.png')}
              />
              <SecondSupportImage
                source={require('../../../assets/support_01.png')}
              /> */}
            </BannerArea>
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
                      autoCapitalize="none"
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
                      autoCapitalize="none"
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
                  <Title style={{ width: '80%' }}>
                    Informe o email para recuperar sua senha
                  </Title>
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

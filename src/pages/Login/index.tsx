import { FontAwesome } from '@expo/vector-icons'
import i18n from 'i18n-js'
import React, { useState } from 'react'
import { ActivityIndicator, Alert, Keyboard } from 'react-native'
import firebase, { database } from '../../../firebase'
import { LanguageDropdown } from '../../components/LanguageDropdown'
import { useLanguage } from '../../contexts/LanguageContext'
import { useNavigate } from '../../contexts/NavigateContext'
import { useUser } from '../../contexts/UserContext'
import { primary } from '../../styles/globalCssVar'
import {
  Banner,
  Container,
  ForgotPassword,
  ForgotPasswordText,
  Input,
  InputIcon,
  InputIconPassword,
  InputItem,
  RegisterButton,
  RegisterButtonText,
  SubmitButton,
  SubmitButtonText,
  Title,
  Wrapper
} from './style'

export const Login: React.FC = () => {
  const { navigateToRegister } = useNavigate()
  const { setUser } = useUser()
  const { language } = useLanguage()

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
              isSubscriber: userInfo.data()?.isSubscriber,
              dataCriacao: userInfo.data()?.dataCriacao
            }
            setUser(data)
          } else {
            const data = {
              email: userInfo.data()?.email,
              isDoctor: userInfo.data()?.isDoctor,
              name: userInfo.data()?.name,
              telephone: userInfo.data()?.telephone,
              dataCriacao: userInfo.data()?.dataCriacao
            }
            setUser(data)
          }
        })
        .catch(() => {
          Alert.alert(i18n.t('error'), i18n.t('invalid'))
          setIsClicked(false)
          setPassword('')
        })
        .catch((error) => Alert.alert(error))
    } else {
      Alert.alert(i18n.t('error'), i18n.t('fill'))
    }
  }

  const handleForgotPassword = () => {
    if (email !== '') {
      setIsClicked(true)
      firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(() => {
          Alert.alert(i18n.t('redefine'), i18n.t('emailSent'))
          setForgotPasswordIsActive(false)
          setIsClicked(false)
        })
        .catch(() => {
          Alert.alert(i18n.t('error'), i18n.t('checkEmail'))
          setIsClicked(false)
        })
    } else {
      Alert.alert(i18n.t('error'), i18n.t('fill'))
    }
  }

  i18n.translations = {
    pt: {
      title: 'Faça seu Login',
      password: 'Senha',
      forgot: 'Esqueceu sua senha?',
      login: 'Login',
      register: 'Cadastre-se',
      email: 'Informe o email para recuperar sua senha',
      back: 'Voltar ao Login',
      send: 'Enviar',
      error: 'Erro',
      fill: 'Preencha todos os campos',
      invalid: 'Email ou senha inválidos',
      checkEmail: 'Confira o email e tente novamente',
      redefine: 'Redefinir senha',
      emailSent: 'Enviamos um email para você'
    },
    en: {
      title: 'Login',
      password: 'Password',
      forgot: 'Forgot your password?',
      login: 'Login',
      register: 'Register',
      email: 'Enter your email to recover your password',
      back: 'Back to Login',
      send: 'Send',
      error: 'Error',
      fill: 'Fill in all fields',
      invalid: 'Invalid email or password',
      checkEmail: 'Check the email and try again',
      redefine: 'Redefine password',
      emailSent: 'We sent you an email'
    },
    es: {
      title: 'Acceso',
      password: 'Clave',
      forgot: 'Olvidaste tu contraseña?',
      login: 'Acceso',
      register: 'Registro',
      email: 'Introduce tu email para recuperar tu contraseña',
      back: 'Atrás para iniciar sesión',
      send: 'Enviar',
      error: 'Error',
      fill: 'Rellene todos los campos',
      invalid: 'Correo electrónico o contraseña no válidos',
      checkEmail: 'Revisa el correo electrónico e inténtalo de nuevo',
      redefine: 'Redefinir contraseña',
      emailSent: 'Te enviamos un correo electrónico'
    }
  }

  return (
    <Container onPress={Keyboard.dismiss}>
      <LanguageDropdown isOpen={false} />
      <Banner source={require('../../../assets/login/banner.png')} />
      <Wrapper>
        {!forgotPasswordIsActive ? (
          <>
            <Title>{i18n.t('title')}</Title>
            <InputItem style={{ elevation: 10 }}>
              <InputIcon>
                <FontAwesome name="user" size={28} color="rgba(77, 86, 109, 0.46)" />
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
                <FontAwesome name="key" size={28} color="rgba(77, 86, 109, 0.46)" />
              </InputIcon>
              <Input
                autoCapitalize="none"
                onChangeText={setPassword}
                value={password}
                placeholder={i18n.t('password')}
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
            <Title style={{ width: '80%' }}>{i18n.t('email')}</Title>
            <InputItem style={{ elevation: 10 }}>
              <InputIcon>
                <FontAwesome name="user" size={28} color="rgba(77, 86, 109, 0.46)" />
              </InputIcon>
              <Input onChangeText={setEmail} value={email} placeholder="E-mail" />
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
            <ForgotPasswordText>{i18n.t('forgot')}</ForgotPasswordText>
          </ForgotPassword>
        ) : (
          <ForgotPassword onPress={() => setForgotPasswordIsActive(false)}>
            <ForgotPasswordText>{i18n.t('back')}</ForgotPasswordText>
          </ForgotPassword>
        )}

        {isClicked ? (
          <ActivityIndicator
            style={{ marginTop: 12 }}
            size="large"
            color={primary}
          />
        ) : (
          <>
            {!forgotPasswordIsActive ? (
              <SubmitButton onPress={handleLogin}>
                <SubmitButtonText>{i18n.t('login')}</SubmitButtonText>
              </SubmitButton>
            ) : (
              <SubmitButton onPress={handleForgotPassword}>
                <SubmitButtonText>{i18n.t('send')}</SubmitButtonText>
              </SubmitButton>
            )}
          </>
        )}
        <RegisterButton onPress={navigateToRegister}>
          <RegisterButtonText>{i18n.t('register')}</RegisterButtonText>
        </RegisterButton>
      </Wrapper>
    </Container>
  )
}

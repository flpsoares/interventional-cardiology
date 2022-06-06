import {
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialCommunityIcons
} from '@expo/vector-icons'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'
import i18n from 'i18n-js'
import moment from 'moment'
import 'moment-timezone'
import React, { useState } from 'react'
import {
  ActivityIndicator,
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView
} from 'react-native'
import firebase, { database } from '../../../firebase'
import { LanguageDropdown } from '../../components/LanguageDropdown'
import { useLanguage } from '../../contexts/LanguageContext'
import { useNavigate } from '../../contexts/NavigateContext'
import { primary } from '../../styles/globalCssVar'
import {
  Banner,
  BannerArea,
  Container,
  Input,
  InputIcon,
  InputIconPassword,
  InputItem,
  LoginButton,
  LoginButtonText,
  PickerButton,
  ScrollableContainer,
  SubmitButton,
  SubmitButtonText,
  Title,
  Wrapper
} from './style'

export const Register: React.FC = () => {
  const { navigateToLogin } = useNavigate()
  const { language } = useLanguage()

  const [passwordIsHide, setPasswordIsHide] = useState(true)

  const [name, setName] = useState('')
  const [isDoctor, setIsDoctor] = useState(true)
  const [crm, setCrm] = useState('')
  const [institution, setInstitution] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [password, setPassword] = useState('')

  const [isClicked, setIsClicked] = useState(false)

  const toggleHidePassword = () => setPasswordIsHide(!passwordIsHide)

  i18n.translations = {
    pt: {
      title: 'Faça seu cadastro',
      name: 'Nome Completo',
      doctor: 'Médico',
      student: 'Estudante',
      institution: 'Instituição',
      telephone: 'Telefone',
      password: 'Digite sua senha',
      register: 'Cadastrar',
      error: 'Erro',
      fill: 'Preencha todos os campos',
      success: 'Sucesso',
      created: 'Conta criada com sucesso',
      inUse: 'Email já está em uso',
      warning: 'Aviso',
      invalid: 'Email inválido',
      sixDigits: 'A senha deve contem pelo menos 6 dígitos',
      validCrm: 'Por favor, informe um CRM válido'
    },
    en: {
      title: 'Register',
      name: 'Full Name',
      doctor: 'Doctor',
      student: 'Student',
      institution: 'Institution',
      telephone: 'Telephone',
      password: 'Type your password',
      register: 'Register',
      error: 'Error',
      fill: 'Fill in all fields',
      success: 'Success',
      created: 'Account created successfully',
      inUse: 'Email is already in use',
      warning: 'Warning',
      invalid: 'Invalid email',
      sixDigits: 'The password must contain at least 6 digits',
      validCrm: 'Please enter a valid CRM'
    },
    es: {
      title: 'Haz tu registro',
      name: 'Nombre Completo',
      doctor: 'Médico',
      student: 'Alumno',
      institution: 'Institución',
      telephone: 'Teléfono',
      password: 'Escribe tu contraseña',
      register: 'Registrar',
      error: 'Error',
      fill: 'Rellene todos los campos',
      success: 'Éxito',
      created: 'Cuenta creada con éxito',
      inUse: 'Correo electrónico ya está en uso',
      warning: 'Advertencia',
      invalid: 'Email inválido',
      sixDigits: 'La contraseña debe contener al menos 6 dígitos',
      validCrm: 'Introduce un CRM válido'
    }
  }

  const isValidated = (value: string) => {
    return value !== ''
  }

  const validatedDoctor = () => {
    if (
      isValidated(name) &&
      isValidated(crm) &&
      isValidated(institution) &&
      isValidated(email) &&
      isValidated(telephone) &&
      isValidated(password)
    ) {
      return true
    } else {
      setIsClicked(false)
      return Alert.alert(i18n.t('error'), i18n.t('fill'))
    }
  }

  const validatedStudent = () => {
    if (
      isValidated(name) &&
      isValidated(email) &&
      isValidated(telephone) &&
      isValidated(password)
    ) {
      return true
    } else {
      setIsClicked(false)
      return Alert.alert(i18n.t('error'), i18n.t('fill'))
    }
  }

  const verifyCrm = () => {
    axios
      .post(
        `https://www.consultacrm.com.br/api/index.php?tipo=crm&q=${crm}&chave=8209154390&destino=json`
      )
      .then((res) => {
        if (res.data.total !== 0) {
          handleNewAccount()
        } else {
          Alert.alert(i18n.t('error'), i18n.t('validCrm'))
        }
      })
  }

  const handleNewAccount = async () => {
    setIsClicked(true)
    if (isDoctor) {
      if (validatedDoctor()) {
        if (password.length >= 6) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((res) => {
              const uid = res.user?.uid
              const users = firebase.firestore().collection('users')
              users.doc(uid).set({
                name,
                isDoctor,
                isSubscriber: false,
                crm,
                institution,
                email,
                telephone,
                dataCriacao: moment().tz('America/Sao_Paulo').format('DD/MM/YYYY')
              })
            })
            .then(() => Alert.alert(i18n.t('success'), i18n.t('created')))
            .catch((error) => {
              if (error.code === 'auth/email-already-in-use') {
                Alert.alert(i18n.t('warning'), i18n.t('inUse'))
              }
              if (error.code === 'auth/invalid-email') {
                Alert.alert(i18n.t('error'), i18n.t('invalid'))
              }
            })
            .finally(() => setIsClicked(false))
        } else {
          setIsClicked(false)
          Alert.alert(i18n.t('error'), i18n.t('sixDigits'))
        }
      }
    } else {
      if (validatedStudent()) {
        if (password.length >= 6) {
          firebase
            .auth()
            .createUserWithEmailAndPassword(email, password)
            .then((res) => {
              const uid = res.user?.uid
              const users = database.collection('users')
              users.doc(uid).set({
                name,
                email,
                isDoctor,
                isSubscriber: false,
                telephone,
                dataCriacao: moment().subtract(3, 'hours').format('DD/MM/YYYY')
              })
            })
            .then(() => Alert.alert('Sucesso', 'Conta criada com sucesso'))
            .catch((error) => {
              if (error.code === 'auth/email-already-in-use') {
                Alert.alert(i18n.t('warning'), i18n.t('inUse'))
              }
              if (error.code === 'auth/invalid-email') {
                Alert.alert(i18n.t('error'), i18n.t('invalid'))
              }
            })
            .finally(() => setIsClicked(false))
        } else {
          setIsClicked(false)
          Alert.alert(i18n.t('error'), i18n.t('sixDigits'))
        }
      }
    }
  }

  i18n.locale = language

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
            <BannerArea>
              <LanguageDropdown isOpen={false} />
              <Banner source={require('../../../assets/register/banner.png')} />
            </BannerArea>
            <Wrapper>
              <Title>{i18n.t('title')}</Title>
              <InputItem style={{ elevation: 3 }}>
                <InputIcon>
                  <FontAwesome
                    autoCapitalize="none"
                    name="user"
                    size={28}
                    color="rgba(77, 86, 109, 0.46)"
                  />
                </InputIcon>
                <Input
                  onChangeText={setName}
                  value={name}
                  placeholder={i18n.t('name')}
                />
              </InputItem>
              <InputItem style={{ elevation: 3 }}>
                <PickerButton>
                  <Picker
                    style={{ color: 'rgba(77, 86, 109, 1)' }}
                    dropdownIconColor="rgba(77, 86, 109, 1)"
                    selectedValue={isDoctor}
                    onValueChange={(value) => setIsDoctor(value)}
                  >
                    <Picker.Item label={i18n.t('doctor')} value={true} />
                    <Picker.Item label={i18n.t('student')} value={false} />
                  </Picker>
                </PickerButton>
              </InputItem>
              {isDoctor ? (
                <>
                  <InputItem style={{ elevation: 3 }}>
                    <InputIcon>
                      <Ionicons
                        name="document-outline"
                        size={28}
                        color="rgba(77, 86, 109, 0.46)"
                      />
                    </InputIcon>
                    <Input onChangeText={setCrm} value={crm} placeholder="CRM" />
                  </InputItem>
                  <InputItem style={{ elevation: 3 }}>
                    <InputIcon>
                      <FontAwesome
                        name="institution"
                        size={28}
                        color="rgba(77, 86, 109, 0.46)"
                      />
                    </InputIcon>
                    <Input
                      onChangeText={setInstitution}
                      value={institution}
                      placeholder={i18n.t('institution')}
                    />
                  </InputItem>
                </>
              ) : (
                <></>
              )}
              <InputItem style={{ elevation: 3 }}>
                <InputIcon>
                  <MaterialCommunityIcons
                    name="email-open-outline"
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
              <InputItem style={{ elevation: 3 }}>
                <InputIcon>
                  <Foundation
                    name="telephone"
                    size={28}
                    color="rgba(77, 86, 109, 0.46)"
                  />
                </InputIcon>
                <Input
                  onChangeText={setTelephone}
                  value={telephone}
                  keyboardType="number-pad"
                  placeholder={i18n.t('telephone')}
                />
              </InputItem>
              <InputItem style={{ elevation: 3 }}>
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
              {isClicked ? (
                <ActivityIndicator size="large" color={primary} />
              ) : (
                <SubmitButton onPress={verifyCrm}>
                  <SubmitButtonText>{i18n.t('register')}</SubmitButtonText>
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

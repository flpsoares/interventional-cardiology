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
  ScrollableContainer,
  PickerButton,
  BannerArea,
  FirstSupportImage,
  SecondSupportImage
} from './style'

import { Picker } from '@react-native-picker/picker'

import {
  FontAwesome,
  MaterialCommunityIcons,
  Foundation,
  Ionicons
} from '@expo/vector-icons'
import { useNavigate } from '../../contexts/NavigateContext'

import { primary } from '../../styles/globalCssVar'
import { LanguageDropdown } from '../../components/LanguageDropdown'

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../firebase'

export const Register: React.FC = () => {
  const { navigateToLogin } = useNavigate()
  const [passwordIsHide, setPasswordIsHide] = useState(true)

  const [name, setName] = useState('')
  const [isDoctor, setIsDoctor] = useState(false)
  const [isMedicineStudent, setIsMedicineStudent] = useState(false)
  const [others, setOthers] = useState('')
  const [crm, setCrm] = useState('')
  const [institution, setInstitution] = useState('')
  const [email, setEmail] = useState('')
  const [telephone, setTelephone] = useState('')
  const [password, setPassword] = useState('')

  const [isClicked, setIsClicked] = useState(false)

  const toggleHidePassword = () => setPasswordIsHide(!passwordIsHide)

  const handleNewAccount = () => {
    setIsClicked(true)
    if (email !== '' && password !== '') {
      if (password.length >= 6) {
        createUserWithEmailAndPassword(auth, email, password)
          .then(() => Alert.alert('Sucesso', 'Conta criada com sucesso'))
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              Alert.alert('Aviso', 'Esse email já está em uso')
            }
            if (error.code === 'auth/invalid-email') {
              Alert.alert('Erro', 'E-mail inválido')
            }
          })
          .finally(() => setIsClicked(false))
      } else {
        setIsClicked(false)
        Alert.alert('Erro', 'A senha deve conter pelo menso 6 dígitos')
      }
    } else {
      Alert.alert('Erro', 'Preencha todos os campos')
    }
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
            <BannerArea>
              <LanguageDropdown isOpen={false} />
              <Banner source={require('../../../assets/register/banner.png')} />
              <FirstSupportImage
                source={require('../../../assets/support_02.png')}
              />
              <SecondSupportImage
                source={require('../../../assets/support_01.png')}
              />
            </BannerArea>
            <Wrapper>
              <Title>Faça seu Cadastro</Title>
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
                  placeholder="Nome Completo"
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
                    <Picker.Item label="Paciente" value={false} />
                    <Picker.Item label="Médico" value={true} />
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
                      placeholder="Instituição"
                    />
                  </InputItem>
                </>
              ) : (
                <>
                  <InputItem style={{ elevation: 3 }}>
                    <PickerButton>
                      <Picker
                        style={{ color: 'rgba(77, 86, 109, 1)' }}
                        dropdownIconColor="rgba(77, 86, 109, 1)"
                        selectedValue={isMedicineStudent}
                        onValueChange={(value) => setIsMedicineStudent(value)}
                      >
                        <Picker.Item
                          label="Não sou estudante de medicina"
                          value={false}
                        />
                        <Picker.Item
                          label="Sou estudante de medicina"
                          value={true}
                        />
                      </Picker>
                    </PickerButton>
                  </InputItem>
                  <InputItem style={{ elevation: 3 }}>
                    <InputIcon>
                      <MaterialCommunityIcons
                        name="frequently-asked-questions"
                        size={28}
                        color="rgba(77, 86, 109, 0.46)"
                      />
                    </InputIcon>
                    <Input
                      onChangeText={setOthers}
                      value={others}
                      placeholder="Outros"
                    />
                  </InputItem>
                </>
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
                  placeholder="Telefone"
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

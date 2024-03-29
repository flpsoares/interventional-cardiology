import {
  AntDesign,
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import I18n from 'i18n-js'
import React, { useEffect, useState } from 'react'
import { Alert, Platform } from 'react-native'
import app, { database } from '../../../firebase'
import { ModalNotifications } from '../../components/ModalNotifications'
import { ModalPassword } from '../../components/ModalPassword'
import { useModal } from '../../contexts/ModalContext'
import { useNavigate } from '../../contexts/NavigateContext'
import { useUser } from '../../contexts/UserContext'
import {
  BackButton,
  Button,
  ButtonText,
  Container,
  Date,
  EditButton,
  Header,
  Icon,
  Info,
  Input,
  InputItem,
  Name,
  Notification,
  Title,
  UserPhoto,
  UserPhotoArea,
  Wrapper
} from './style'

export const EditAccount: React.FC = () => {
  const { user, userId } = useUser()
  const { editAccountGoBack } = useNavigate()
  const { openNotificationModal, openPasswordModal } = useModal()

  const [name, setName] = useState(user!.name)
  const [email, setEmail] = useState(user!.email)
  const [telephone, setTelephone] = useState(user!.telephone)

  const [crm, setCrm] = useState(user?.crm)
  const [institution, setInstitution] = useState(user?.institution)

  const [image, setImage] = useState<any>()

  I18n.translations = {
    pt: {
      title: 'Edite seus dados',
      registered: 'Cadastrado em',
      error: 'Erro',
      errorOccurred: 'Ocorreu algum erro',
      success: 'Sucesso',
      successfully: 'Dados alterados com sucesso',
      button: 'Atualizar Dados',
      changePassword: 'Alterar senha'
    },
    en: {
      title: 'Edit your data',
      registered: 'Registered in',
      error: 'Error',
      errorOccurred: 'Some error occurred',
      success: 'Success',
      successfully: 'Successfully changed data',
      button: 'Update Data',
      changePassword: 'Change Password'
    },
    es: {
      title: 'Edita tus datos',
      registered: 'Registrado en',
      error: 'Erro',
      errorOccurred: 'Ocurrió algún error',
      success: 'Éxito',
      successfully: 'Datos cambiados con éxito',
      button: 'Actualizar datos',
      changePassword: 'Cambiar contraseña'
    }
  }

  const success = I18n.t('success')
  const successfully = I18n.t('successfully')
  const error = I18n.t('error')
  const errorOccurred = I18n.t('errorOccurred')

  useEffect(() => {
    const verifyPermission = async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        if (status !== 'granted') {
          alert('Permission denied!')
        }
      }
    }
    verifyPermission()
  }, [])

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    })
    if (!result.cancelled) {
      setImage(result.uri)
      const uploadUri = result.uri
      const imageExtension = uploadUri.substring(uploadUri.lastIndexOf('.') + 1)

      const storageRef = app.storage().ref()

      const userPerfilRef = storageRef.child(`perfil/${userId}.${imageExtension}`)

      const img = fetch(uploadUri)
      const bytes = await (await img).blob()

      await userPerfilRef
        .put(bytes)
        .then((res) => {
          res.ref.getDownloadURL().then((url) => {
            database
              .collection('/users')
              .doc(userId)
              .set({ userPhoto: url }, { merge: true })
              .catch((e) => {
                Alert.alert(error, errorOccurred)
                console.log(e)
              })
          })
        })
        .catch((e) => {
          Alert.alert(error, errorOccurred)
          console.log(e)
        })
    }
  }

  const handleSubmit = () => {
    if (user!.isDoctor === false) {
      database
        .collection('users')
        .doc(userId)
        .set({ name, email, telephone }, { merge: true })
        .then(() => Alert.alert(success, successfully))
        .catch((e) => {
          Alert.alert(error, errorOccurred)
          console.log(e)
        })
    } else {
      database
        .collection('users')
        .doc(userId)
        .set({ name, email, telephone, crm, institution }, { merge: true })
        .then(() => Alert.alert(success, successfully))
        .catch((e) => {
          Alert.alert(error, errorOccurred)
          console.log(e)
        })
    }
  }

  return (
    <Container>
      <ModalNotifications />
      <ModalPassword />
      <Header>
        <BackButton onPress={editAccountGoBack}>
          <FontAwesome name="arrow-left" size={24} color="#777d8c" />
        </BackButton>
        <Notification onPress={openNotificationModal}>
          <Ionicons name="notifications-outline" size={22} color="#777d8c" />
        </Notification>
      </Header>
      <UserPhotoArea>
        {user?.userPhoto ? (
          <UserPhoto source={{ uri: user.userPhoto }} />
        ) : (
          <UserPhoto source={require('../../../assets/default-user.png')} />
        )}
        <EditButton onPress={pickImage}>
          <MaterialIcons name="edit" size={24} color="#fff" />
        </EditButton>
      </UserPhotoArea>
      <Info>
        <Name>{user!.name}</Name>
        <Date>
          {I18n.t('registered')} {user!.dataCriacao}
        </Date>
      </Info>
      <Wrapper>
        <Title>{I18n.t('title')}</Title>
        <InputItem style={{ elevation: 10 }}>
          <Icon>
            <FontAwesome name="user-o" size={28} color="rgba(77, 86, 109, 0.46)" />
          </Icon>
          <Input onChangeText={setName} value={name} />
        </InputItem>
        <InputItem style={{ elevation: 10 }}>
          <Icon>
            <MaterialCommunityIcons
              name="email-open-outline"
              size={28}
              color="rgba(77, 86, 109, 0.46)"
            />
          </Icon>
          <Input onChangeText={setEmail} value={email} />
        </InputItem>
        <InputItem style={{ elevation: 10 }}>
          <Icon>
            <Foundation name="telephone" size={28} color="rgba(77, 86, 109, 0.46)" />
          </Icon>
          <Input onChangeText={setTelephone} value={telephone} />
        </InputItem>
        {user!.isDoctor === true && (
          <>
            <InputItem style={{ elevation: 10 }}>
              <Icon>
                <AntDesign name="idcard" size={28} color="rgba(77, 86, 109, 0.46)" />
              </Icon>
              <Input onChangeText={setCrm} value={crm} />
            </InputItem>
            <InputItem style={{ elevation: 10 }}>
              <Icon>
                <FontAwesome
                  name="institution"
                  size={28}
                  color="rgba(77, 86, 109, 0.46)"
                />
              </Icon>
              <Input onChangeText={setInstitution} value={institution} />
            </InputItem>
          </>
        )}
        <Button onPress={handleSubmit}>
          <ButtonText>{I18n.t('button')}</ButtonText>
        </Button>
        <Button onPress={openPasswordModal}>
          <ButtonText>{I18n.t('changePassword')}</ButtonText>
        </Button>
      </Wrapper>
    </Container>
  )
}

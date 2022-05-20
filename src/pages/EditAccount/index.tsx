import {
  AntDesign,
  FontAwesome,
  Foundation,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons
} from '@expo/vector-icons'
import * as ImagePicker from 'expo-image-picker'
import React, { useEffect, useState } from 'react'
import { Alert, Platform } from 'react-native'
import app, { database } from '../../../firebase'
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

  const [name, setName] = useState(user!.name)
  const [email, setEmail] = useState(user!.email)
  const [telephone, setTelephone] = useState(user!.telephone)

  const [crm, setCrm] = useState(user?.crm)
  const [institution, setInstitution] = useState(user?.institution)

  const [image, setImage] = useState<any>()

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
                Alert.alert('Erro', 'Ocorreu algum erro')
                console.log(e)
              })
          })
        })
        .catch((e) => {
          Alert.alert('Erro', 'Ocorreu algum erro')
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
        .then(() => Alert.alert('Sucesso', 'Dados alterados com sucesso!'))
        .catch((e) => {
          Alert.alert('Aviso', 'Algo deu errado')
          console.log(e)
        })
    } else {
      database
        .collection('users')
        .doc(userId)
        .set({ name, email, telephone, crm, institution }, { merge: true })
        .then(() => Alert.alert('Sucesso', 'Dados alterados com sucesso!'))
        .catch((e) => {
          Alert.alert('Aviso', 'Algo deu errado')
          console.log(e)
        })
    }
  }

  return (
    <Container>
      <Header>
        <BackButton onPress={editAccountGoBack}>
          <FontAwesome name="arrow-left" size={24} color="#777d8c" />
        </BackButton>
        <Notification>
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
        <Date>Cadastrado em {user!.dataCriacao}</Date>
      </Info>
      <Wrapper>
        <Title>Edite seus dados</Title>
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
        {/* <InputItem style={{ elevation: 10 }}>
              <Icon>
                <FontAwesome name="key" size={28} color="rgba(77, 86, 109, 0.46)" />
              </Icon>
              <Input placeholder="Alterar Senha" secureTextEntry={passwordIsHide} />
              <PasswordIcon onPress={toggleHidePassword}>
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
              </PasswordIcon>
            </InputItem> */}

        <Button onPress={handleSubmit}>
          <ButtonText>Atualizar Dados</ButtonText>
        </Button>
      </Wrapper>
    </Container>
  )
}

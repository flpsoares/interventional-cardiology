import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState
} from 'react'
import {
  Button,
  ButtonImage,
  ButtonImageText,
  Container,
  Header,
  Input,
  InputTitle,
  PreviewImage,
  PreviewImageArea,
  SubmitButton,
  SubmitButtonText,
  Title,
  UserPhoto,
  Wrapper,
  Image,
  CloseButton
} from './style'

import { Ionicons, AntDesign } from '@expo/vector-icons'
import Constants from 'expo-constants'
import { v4 as uuid } from 'uuid'

import { Alert, Platform } from 'react-native'
import {
  RouteProp,
  useFocusEffect,
  useIsFocused,
  useRoute
} from '@react-navigation/core'
import { RootStackParamsList } from '../../routes/RootStackParamsList'
import app, { database } from '../../../firebase'
import { useUser } from '../../contexts/UserContext'
import firebase from 'firebase'
import { useNavigate } from '../../contexts/NavigateContext'

import * as ImagePicker from 'expo-image-picker'
import { secondary } from '../../styles/globalCssVar'

export const PublishTwo: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamsList, 'PublishTwo'>>()
  const { navigateToHome } = useNavigate()
  const { user, userId } = useUser()
  const isFocused = useIsFocused()

  const [text, setText] = useState('')
  const [images, setImages] = useState([''])
  const [storageFilesUrl, setStorageFilesUrl] = useState([''])

  const timestamp = firebase.firestore.FieldValue.serverTimestamp()

  useFocusEffect(
    useCallback(() => {
      if (route.params.area !== undefined) {
        // navigateToPublish()
      }
    }, [isFocused])
  )

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
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })
    if (!result.cancelled) {
      if (images.length <= 7) {
        const uploadUri = result.uri
        const filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)

        const storageRef = app.storage().ref()

        const PostImageRef = storageRef.child(`posts/${filename}`)

        const img = fetch(uploadUri)
        const bytes = await (await img).blob()

        if (images[0] === '') {
          await PostImageRef.put(bytes)
            .then((res) => {
              res.ref.getDownloadURL().then((url) => {
                if (storageFilesUrl[0] === '') {
                  setStorageFilesUrl([url])
                } else {
                  setStorageFilesUrl([...storageFilesUrl, url])
                }
              })
            })
            .then(() => setImages([result.uri]))
            .catch((e) => console.log(e))
        } else {
          await PostImageRef.put(bytes)
            .then((res) => {
              res.ref.getDownloadURL().then((url) => {
                if (storageFilesUrl[0] === '') {
                  setStorageFilesUrl([url])
                } else {
                  setStorageFilesUrl([...storageFilesUrl, url])
                }
              })
            })
            .then(() => setImages([...images, result.uri]))
            .catch((e) => console.log(e))
        }
      } else {
        Alert.alert('Erro', 'Você já selecionou 8 arquivos')
      }
    }
  }

  const deleteFile = (index: number) => {
    setImages([...images.slice(0, index), ...images.slice(index + 1)])
  }

  const handleSubmit = () => {
    if (text !== '') {
      const data: App.Post = {
        autorId: userId,
        autorNome: user?.name,
        autorFoto: user?.userPhoto,
        area: route.params.area,
        idade: route.params.idade,
        genero: route.params.genero,
        sintoma: route.params.sintoma,
        comorbidades: route.params.comorbidades,
        medicamentos: route.params.medicamentos,
        descricao: text,
        medias: storageFilesUrl,
        dataCriacao: timestamp
      }
      database
        .collection('posts')
        .add(data)
        .then(() => {
          navigateToHome()
          setImages([''])
          setStorageFilesUrl([''])
        })
        .catch((e) => {
          Alert.alert('Erro', 'Algo deu errado')
          console.log(e)
        })
    }
  }

  return (
    <Container>
      <Header>
        {user?.userPhoto ? (
          <UserPhoto source={{ uri: user.userPhoto }} />
        ) : (
          <UserPhoto source={require('../../../assets/default-user.png')} />
        )}
        <Title>Publicar caso clínico</Title>
        <Button></Button>
      </Header>
      <Wrapper>
        <InputTitle>Descreva o Caso</InputTitle>
        <Input
          onChangeText={setText}
          value={text}
          multiline={true}
          numberOfLines={4}
          placeholder="Digite aqui..."
          style={{ textAlignVertical: 'top' }}
        />
        <ButtonImage onPress={pickImage}>
          <Ionicons name="images" size={46} color="#596988" />
          <ButtonImageText>
            Insira até 8 imagens ou vídeos sobre o caso
          </ButtonImageText>
        </ButtonImage>
        {images[0] !== '' && (
          <PreviewImageArea>
            {images.map((url, index) => {
              return (
                <PreviewImage key={url}>
                  <CloseButton onPress={() => deleteFile(index)}>
                    <AntDesign name="close" color={secondary} size={26} />
                  </CloseButton>
                  <Image source={{ uri: url }} />
                </PreviewImage>
              )
            })}
          </PreviewImageArea>
        )}

        <SubmitButton onPress={handleSubmit}>
          <SubmitButtonText>Publicar</SubmitButtonText>
        </SubmitButton>
      </Wrapper>
    </Container>
  )
}

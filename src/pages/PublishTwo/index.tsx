import { AntDesign, Ionicons } from '@expo/vector-icons'
import { RouteProp, useRoute } from '@react-navigation/core'
import * as ImagePicker from 'expo-image-picker'
import firebase from 'firebase'
import I18n from 'i18n-js'
import moment from 'moment'
import 'moment-timezone'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, Platform, View } from 'react-native'
import app, { database } from '../../../firebase'
import { useNavigate } from '../../contexts/NavigateContext'
import { useUser } from '../../contexts/UserContext'
import { RootStackParamsList } from '../../routes/RootStackParamsList'
import { primary, secondary } from '../../styles/globalCssVar'
import {
  Button,
  ButtonImage,
  ButtonImageText,
  CloseButton,
  Container,
  Header,
  Image,
  Input,
  InputTitle,
  PreviewImage,
  PreviewImageArea,
  SubmitButton,
  SubmitButtonText,
  Title,
  UserPhoto,
  Wrapper
} from './style'

export const PublishTwo: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamsList, 'PublishTwo'>>()
  const { navigateToHome } = useNavigate()
  const { user, userId } = useUser()
  const [isLoading, setIsLoading] = useState(false)

  const [text, setText] = useState('')
  const [outcome, setOutcome] = useState('')
  const [files, setFiles] = useState([''])

  const timestamp = firebase.firestore.FieldValue.serverTimestamp()
  const dateNow = moment().tz('America/Sao_Paulo').format('DD/MM/YYYY H:mm:ss')

  I18n.translations = {
    pt: {
      title: 'Publicar caso clínico',
      firstInputTitle: 'Descreva o caso',
      firstInputPlaceholder: 'Digite aqui...',
      inputImagePlaceholder: 'Insira até 8 imagens ou vídeos sobre o caso',
      secondInputTitle: 'Desfecho do caso',
      secondInputPlaceholder: 'Digite aqui o desfecho do caso',
      button: 'Publicar',
      error: 'Erro',
      uploadError: 'Erro ao fazer o upload dos arquivos',
      maxSelected: 'Você já selecionou 8 arquivos',
      somethingWrong: 'Algo deu errado',
      fill: 'Preencha todos os campos'
    },
    en: {
      title: 'Publish clinical case',
      firstInputTitle: 'Describe the case',
      firstInputPlaceholder: 'Type here...',
      inputImagePlaceholder: 'Insert up to 8 images or videos about the case',
      secondInputTitle: 'Case outcome',
      secondInputPlaceholder: 'Enter case outcome here',
      button: 'Publish',
      error: 'Error',
      uploadError: 'Error uploading files',
      maxSelected: 'You have already selected 8 files',
      somethingWrong: 'Something went wrong',
      fill: 'Fill in all fields'
    },
    es: {
      title: 'Publicar caso clínico',
      firstInputTitle: 'Describir el caso',
      firstInputPlaceholder: 'Digite aquí...',
      inputImagePlaceholder: 'Inserta hasta 8 imágenes o videos sobre el caso',
      secondInputTitle: 'Resultado del caso',
      secondInputPlaceholder: 'Ingrese el resultado del caso aquí',
      button: 'Publicar',
      error: 'Error',
      uploadError: 'Error al cargar archivos',
      maxSelected: 'Ya has seleccionado 8 archivos',
      somethingWrong: 'Algo salió mal',
      fill: 'Rellene todos los campos'
    }
  }

  const error = I18n.t('error')
  const maxSelected = I18n.t('maxSelected')
  const uploadError = I18n.t('uploadError')
  const somethingWrong = I18n.t('somethingWrong')
  const fill = I18n.t('fill')

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
      if (files.length <= 7) {
        !files[0] ? setFiles([result.uri]) : setFiles([...files, result.uri])
      } else {
        Alert.alert(error, maxSelected)
      }
    }
  }

  const uploadFiles = async (uriList: string[]) => {
    let nextUrls: string[] = []

    if (uriList[0] !== '') {
      for (const uri of uriList) {
        const uploadUri = uri
        const filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1)

        const storageRef = app.storage().ref()

        const PostImageRef = storageRef.child(`posts/${filename}`)

        const img = await fetch(uploadUri)
        const bytes = await img.blob()

        try {
          const uploadedfile = await PostImageRef.put(bytes)

          const resolvedUrl = await uploadedfile.ref.getDownloadURL()
          nextUrls.push(resolvedUrl)
        } catch (e) {
          Alert.alert(error, uploadError)
          setIsLoading(false)
          setFiles([''])
          nextUrls = []
        }
      }
    }
    return nextUrls
  }

  const deleteFile = (index: number) => {
    setFiles([...files.slice(0, index), ...files.slice(index + 1)])
  }

  const handleSubmit = async () => {
    if (text !== '' && outcome !== '') {
      setIsLoading(true)
      const storageFiles = await uploadFiles(files)
      const data: App.Post = {
        autorId: userId,
        autorNome: user?.name,
        autorFoto: user?.userPhoto || '',
        area: route.params.area,
        idade: route.params.idade,
        genero: route.params.genero,
        sintoma: route.params.sintoma,
        comorbidades: route.params.comorbidades,
        medicamentos: route.params.medicamentos,
        descricao: text,
        desfecho: outcome,
        arquivos: storageFiles,
        favorites: 0,
        dataCriacao: timestamp,
        dataExibicao: dateNow
      }
      database
        .collection('posts')
        .add(data)
        .then(() => {
          navigateToHome()
          setFiles([''])
        })
        .catch((e) => {
          Alert.alert(error, somethingWrong)
          console.log(e)
        })
    } else {
      Alert.alert(error, fill)
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
        <Title>{I18n.t('title')}</Title>
        <Button></Button>
      </Header>
      <Wrapper>
        <InputTitle>{I18n.t('firstInputTitle')}</InputTitle>
        <Input
          onChangeText={setText}
          value={text}
          multiline={true}
          numberOfLines={4}
          placeholder={I18n.t('firstInputPlaceholder')}
          style={{ textAlignVertical: 'top' }}
        />
        <ButtonImage onPress={pickImage}>
          <Ionicons name="images" size={46} color="#596988" />
          <ButtonImageText>{I18n.t('inputImagePlaceholder')}</ButtonImageText>
        </ButtonImage>
        {files[0] !== '' && (
          <PreviewImageArea>
            {files.map((url, index) => {
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
        <InputTitle style={{ marginTop: 42 }}>
          {I18n.t('secondInputTitle')}
        </InputTitle>
        <Input
          onChangeText={setOutcome}
          value={outcome}
          multiline={true}
          numberOfLines={4}
          placeholder={I18n.t('secondInputPlaceholder')}
          style={{ textAlignVertical: 'top' }}
        />
        {isLoading ? (
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 22
            }}
          >
            <ActivityIndicator size="large" color={primary} />
          </View>
        ) : (
          <SubmitButton onPress={handleSubmit}>
            <SubmitButtonText>{I18n.t('button')}</SubmitButtonText>
          </SubmitButton>
        )}
      </Wrapper>
    </Container>
  )
}

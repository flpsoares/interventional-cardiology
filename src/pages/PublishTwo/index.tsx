import React, { useEffect, useState } from 'react'
import {
  Button,
  ButtonImage,
  ButtonImageText,
  Container,
  Header,
  Input,
  InputTitle,
  SubmitButton,
  SubmitButtonText,
  Title,
  UserPhoto,
  Wrapper
} from './style'

import { Ionicons } from '@expo/vector-icons'
import Constants from 'expo-constants'
import * as ImagePicker from 'expo-image-picker'
import { Alert, Platform } from 'react-native'
import { RouteProp, useRoute } from '@react-navigation/core'
import { RootStackParamsList } from '../../routes/RootStackParamsList'
import app, { database } from '../../../firebase'
import { useUser } from '../../contexts/UserContext'
import firebase from 'firebase'
import { useNavigate } from '../../contexts/NavigateContext'
import { formatter } from '../../utils/date'
import moment from 'moment'

export const PublishTwo: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamsList, 'PublishTwo'>>()
  const { navigateToHome } = useNavigate()
  const { user } = useUser()

  const [text, setText] = useState('')
  const [images, setImages] = useState('')

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
      quality: 1
    })
    if (!result.cancelled) {
      setImages(result.uri)
      console.log(result)
    }
  }

  const handleSubmit = () => {
    if (text !== '') {
      const data: App.Post = {
        autorId: app.auth().currentUser!.uid,
        autorNome: user?.name,
        area: route.params.area,
        idade: route.params.idade,
        genero: route.params.genero,
        sintoma: route.params.sintoma,
        comorbidades: route.params.comorbidades,
        medicamentos: route.params.medicamentos,
        descricao: text,
        dataCriacao: moment().format('DD/MM/YYYY H:mm:ss'),
        favoritos: ['']
      }
      database
        .collection('posts')
        .add(data)
        .then(() => navigateToHome())
        .catch((e) => {
          Alert.alert('Erro', 'Algo deu errado')
          console.log(e)
        })
    }
  }

  return (
    <Container>
      <Header>
        <UserPhoto source={require('../../../assets/default-user.png')} />
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
          <ButtonImageText>Insira até 8 imagens sobre o caso</ButtonImageText>
        </ButtonImage>
        <SubmitButton onPress={handleSubmit}>
          <SubmitButtonText>Publicar</SubmitButtonText>
        </SubmitButton>
      </Wrapper>
    </Container>
  )
}

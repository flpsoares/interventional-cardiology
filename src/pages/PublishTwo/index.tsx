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
import { Platform } from 'react-native'

export const PublishTwo: React.FC = () => {
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

  return (
    <Container>
      <Header>
        <UserPhoto source={require('../../../assets/default-user.png')} />
        <Title>Publicar caso clínico</Title>
        <Button>{/* <Fontisto name="close-a" size={18} /> */}</Button>
      </Header>
      <Wrapper>
        <InputTitle>Descreva o Caso</InputTitle>
        <Input
          multiline={true}
          numberOfLines={4}
          placeholder="Digite aqui..."
          style={{ textAlignVertical: 'top' }}
        />
        <ButtonImage onPress={pickImage}>
          <Ionicons name="images" size={46} color="#596988" />
          <ButtonImageText>Insira até 8 imagens sobre o caso</ButtonImageText>
        </ButtonImage>
        <SubmitButton>
          <SubmitButtonText>Publicar</SubmitButtonText>
        </SubmitButton>
      </Wrapper>
    </Container>
  )
}

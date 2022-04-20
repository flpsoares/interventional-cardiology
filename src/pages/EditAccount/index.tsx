import React from 'react'
import {
  BackButton,
  Container,
  Date,
  EditButton,
  Header,
  Info,
  Name,
  Notification,
  UserPhoto,
  UserPhotoArea
} from './style'
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useNavigate } from '../../contexts/NavigateContext'

export const EditAccount: React.FC = () => {
  const { editAccountGoBack } = useNavigate()

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
        <UserPhoto source={require('../../../assets/default-user.png')} />
        <EditButton>
          <MaterialIcons name="edit" size={24} color="#fff" />
        </EditButton>
      </UserPhotoArea>
      <Info>
        <Name>Felipe Bruno</Name>
        <Date>Cadastrado em 22/03/2021</Date>
      </Info>
    </Container>
  )
}

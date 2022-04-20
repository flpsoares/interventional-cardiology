import React from 'react'
import { auth } from '../../../firebase'
import { signOut } from 'firebase/auth'
import {
  Banner,
  Container,
  EditButton,
  EditButtonText,
  Email,
  Header,
  Info,
  Name,
  PostArea,
  Profile,
  UserPhoto,
  UserPhotoBack,
  Notification
} from './style'
import { postData } from '../../postData'
import { Post } from '../../components/Post'
import { Ionicons } from '@expo/vector-icons'
import { useNavigate } from '../../contexts/NavigateContext'

export const Account: React.FC = () => {
  const { navigateToEditAccount } = useNavigate()

  const logOut = () => {
    signOut(auth)
  }

  return (
    <Container>
      <Profile>
        <Banner>
          <Header>
            <Notification>
              <Ionicons name="notifications-outline" size={22} color="#fff" />
            </Notification>
          </Header>
        </Banner>
        <UserPhotoBack>
          <UserPhoto source={require('../../../assets/default-user.png')} />
        </UserPhotoBack>
        <Info>
          <Name>Felipe Bruno</Name>
          <Email>email@email.com</Email>
        </Info>
        <EditButton onPress={navigateToEditAccount}>
          <EditButtonText>EDITAR PERFIL</EditButtonText>
        </EditButton>
        <EditButton onPress={logOut}>
          <EditButtonText>LogOut</EditButtonText>
        </EditButton>
      </Profile>
      <PostArea>
        {postData.map((post) => {
          return <Post key={post.id} data={post} />
        })}
      </PostArea>
    </Container>
  )
}

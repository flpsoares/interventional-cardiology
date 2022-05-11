import React, { useEffect, useState } from 'react'
import app, { database } from '../../../firebase'
import {
  Banner,
  Container,
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
import { Post } from '../../components/Post'
import { Ionicons } from '@expo/vector-icons'
import { useUser } from '../../contexts/UserContext'
import { SettingsDropdown } from '../../components/SettingsDropdown'

export const Account: React.FC = () => {
  const { user } = useUser()

  const [posts, setPosts] = useState<App.Post[]>()
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

  useEffect(() => {
    database
      .collection('/posts')
      .where('autorId', '==', app.auth().currentUser!.uid)
      .orderBy('dataCriacao', 'desc')
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as App.Post[]
        setPosts(data)
      })
  }, [])

  return (
    <Container>
      <Profile onPress={() => setDropdownIsOpen(false)}>
        <Banner>
          <Header>
            <Notification onPress={() => setDropdownIsOpen(!dropdownIsOpen)}>
              <Ionicons name="settings-outline" size={22} color="#fff" />
            </Notification>
            <Notification>
              <Ionicons name="notifications-outline" size={22} color="#fff" />
            </Notification>
          </Header>
        </Banner>
        {dropdownIsOpen && <SettingsDropdown />}
        <UserPhotoBack>
          <UserPhoto source={require('../../../assets/default-user.png')} />
        </UserPhotoBack>
        <Info>
          <Name>{user?.name}</Name>
          <Email>{user?.email}</Email>
        </Info>
        {/* <EditButton onPress={navigateToEditAccount}>
          <EditButtonText>EDITAR PERFIL</EditButtonText>
        </EditButton>
        <EditButton onPress={logOut}>
          <EditButtonText>LogOut</EditButtonText>
        </EditButton> */}
      </Profile>
      <PostArea>
        {posts?.map((post) => {
          return <Post key={post.id} data={post} />
        })}
      </PostArea>
    </Container>
  )
}

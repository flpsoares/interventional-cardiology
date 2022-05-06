import React, { useEffect, useState } from 'react'
import app, { database } from '../../../firebase'
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
import { useUser } from '../../contexts/UserContext'

export const Account: React.FC = () => {
  const { navigateToEditAccount } = useNavigate()
  const { user } = useUser()

  const [posts, setPosts] = useState<App.Post[]>()

  const logOut = () => {
    app.auth().signOut()
  }

  useEffect(() => {
    database
      .collection('/posts')
      .where('autorId', '==', app.auth().currentUser!.uid)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as App.Post[]
        console.log(data)
        setPosts(data)
      })
  }, [])

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

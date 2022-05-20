import { Ionicons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { database } from '../../../firebase'
import { Post } from '../../components/Post'
import { SettingsDropdown } from '../../components/SettingsDropdown'
import { useUser } from '../../contexts/UserContext'
import {
  Banner,
  Container,
  Email,
  Header,
  Info,
  Name,
  Notification,
  PostArea,
  Profile,
  UserPhoto,
  UserPhotoBack
} from './style'

export const Account: React.FC = () => {
  const { user, userId } = useUser()

  const [posts, setPosts] = useState<App.Post[]>()
  const [countFollowers, setCountFollowers] = useState(0)
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

  useEffect(() => {
    // posts
    database
      .collection('/posts')
      .where('autorId', '==', userId)
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

    // followers
    database.collection(`/users/${userId}/followers`).onSnapshot((querySnapshot) => {
      if (querySnapshot.docs[0] === undefined) {
        setCountFollowers(0)
      } else {
        setCountFollowers(querySnapshot.docs.length)
      }
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
          {user?.userPhoto ? (
            <UserPhoto source={{ uri: user.userPhoto }} />
          ) : (
            <UserPhoto source={require('../../../assets/default-user.png')} />
          )}
        </UserPhotoBack>
        <Info>
          <Name>{user?.name}</Name>
          <Email>{user?.email}</Email>
          {countFollowers === 1 ? (
            <Email>{countFollowers} Seguidor</Email>
          ) : (
            <Email>{countFollowers} Seguidores</Email>
          )}
        </Info>
      </Profile>
      <PostArea>
        {posts?.map((post) => {
          return <Post key={post.id} data={post} />
        })}
      </PostArea>
    </Container>
  )
}

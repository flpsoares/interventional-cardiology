import { Ionicons } from '@expo/vector-icons'
import { RouteProp, useRoute } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { database } from '../../../firebase'
import { Post } from '../../components/Post'
import { SettingsDropdown } from '../../components/SettingsDropdown'
import { RootStackParamsList } from '../../routes/RootStackParamsList'
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

interface UserProps {
  name: any
  email: any
  telephone: any
  isDoctor: any
  crm?: any
  institution?: any
  isSubscriber?: any
  userPhoto?: any
  dataCriacao: any
}

export const UserProfile: React.FC = () => {
  const route = useRoute<RouteProp<RootStackParamsList, 'UserProfile'>>()

  const [posts, setPosts] = useState<App.Post[]>()
  const [countFollowers, setCountFollowers] = useState(0)
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const [user, setUser] = useState<UserProps | any>()

  useEffect(() => {
    // posts
    database
      .collection('/posts')
      .where('autorId', '==', route.params.id)
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

    database
      .collection('/users')
      .doc(route.params.id)
      .onSnapshot((querySnapshot) => {
        setUser(querySnapshot.data()!)
      })

    // followers
    database
      .collection(`/users/${route.params.id}/followers`)
      .onSnapshot((querySnapshot) => {
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

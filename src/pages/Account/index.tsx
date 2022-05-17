import React, { useCallback, useEffect, useState } from 'react'
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
import { ModalChoosePlan } from '../../components/ModalChoosePlan'
import { useModal } from '../../contexts/ModalContext'
import { useFocusEffect, useIsFocused } from '@react-navigation/core'

export const Account: React.FC = () => {
  const { user, userId } = useUser()
  const { modalChoosePlanIsOpen, openModalChoosePlan } = useModal()

  const [posts, setPosts] = useState<App.Post[]>()
  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)

  const isFocused = useIsFocused()

  useEffect(() => {
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
  }, [])

  // useFocusEffect(
  //   useCallback(() => {
  //     if (user?.isSubscriber === false) {
  //       openModalChoosePlan()
  //     }
  //   }, [isFocused])
  // )

  return (
    <Container>
      {/* {modalChoosePlanIsOpen && <ModalChoosePlan />} */}
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

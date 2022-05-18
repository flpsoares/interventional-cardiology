import React, { useCallback, useEffect, useState } from 'react'
import { Container, Top, TopInput, TopInputArea, UserPhoto, Wrapper } from './style'

import { EvilIcons, Ionicons } from '@expo/vector-icons'
import { Post } from '../../components/Post'
import { FlatList } from 'react-native'
import { ModalImage } from '../../components/ModalImage'
import { useModal } from '../../contexts/ModalContext'
import app, { database } from '../../../firebase'
import { useUser } from '../../contexts/UserContext'
import { ModalChoosePlan } from '../../components/ModalChoosePlan'
import { useFocusEffect, useIsFocused } from '@react-navigation/core'

export const Home: React.FC = () => {
  const { user } = useUser()
  const { modalChoosePlanIsOpen, openModalChoosePlan, closeModalChoosePlan } =
    useModal()
  const isFocused = useIsFocused()

  const {
    modalImageIsOpen,
    modalImageData,
    modalImageQuantity,
    modalImageOpenItem
  } = useModal()
  const [posts, setPosts] = useState<App.Post[]>()

  useEffect(() => {
    const subscriber = database
      .collection('posts')
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

    return subscriber
  }, [])

  useFocusEffect(
    useCallback(() => {
      if (user?.isSubscriber === false) {
        openModalChoosePlan()
      }
    }, [isFocused])
  )

  const deleteStorage = async () => {
    const storageRef = app.storage().ref()

    const PostImageRef = storageRef.child('posts')
    PostImageRef.listAll().then((list) => {
      const promises = list.items.map((item) => {
        return item.delete()
      })
      Promise.all(promises)
    })
  }

  return (
    <Container>
      {modalChoosePlanIsOpen && <ModalChoosePlan />}
      <Top>
        {user?.userPhoto ? (
          <UserPhoto source={{ uri: user.userPhoto }} />
        ) : (
          <UserPhoto source={require('../../../assets/default-user.png')} />
        )}
        <TopInputArea>
          <EvilIcons name="search" size={24} color="rgba(77, 86, 109, 0.46)" />
          <TopInput placeholder="Pesquisar..." />
        </TopInputArea>
        <Ionicons
          onPress={deleteStorage}
          name="notifications-outline"
          size={22}
          color="#777d8c"
        />
      </Top>
      <Wrapper>
        {modalImageIsOpen && (
          <ModalImage
            data={modalImageData!}
            quantity={modalImageQuantity}
            openItem={modalImageOpenItem}
          />
        )}
        <FlatList
          data={posts}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Post data={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </Wrapper>
    </Container>
  )
}

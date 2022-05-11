import React, { useEffect, useState } from 'react'
import { FlatList, Text } from 'react-native'
import {
  ChooseArea,
  ChooseItem,
  ChooseItemText,
  Container,
  Top,
  TopInput,
  TopInputArea,
  UserPhoto,
  Wrapper
} from './style'

import { EvilIcons, Ionicons } from '@expo/vector-icons'
import { ModalImage } from '../../components/ModalImage'
import { Post } from '../../components/Post'
import { postData } from '../../postData'
import { useModal } from '../../contexts/ModalContext'
import app, { database } from '../../../firebase'

export const Favorites: React.FC = () => {
  const {
    modalImageIsOpen,
    modalImageData,
    modalImageQuantity,
    modalImageOpenItem
  } = useModal()

  const [posts, setPosts] = useState<App.Post[]>()
  const [favoriteIsActive, setFavoriteIsActive] = useState(true)
  const [popularIsActive, setPopularIsActive] = useState(false)

  const toggle = () => {
    if (favoriteIsActive) {
      setPopularIsActive(true)
      setFavoriteIsActive(false)
    } else {
      setPopularIsActive(false)
      setFavoriteIsActive(true)
    }
  }

  useEffect(() => {
    if (favoriteIsActive) {
      database
        .collection('/posts')
        .where('favoritos', 'array-contains', app.auth().currentUser!.uid)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          }) as App.Post[]
          setPosts(data)
        })
    } else {
      database
        .collection('/posts')
        .orderBy('favoritos', 'desc')
        .limit(50)
        .onSnapshot((querySnapshot) => {
          const data = querySnapshot.docs.map((doc) => {
            return {
              id: doc.id,
              ...doc.data()
            }
          }) as App.Post[]
          setPosts(data)
        })
    }
  }, [favoriteIsActive])

  return (
    <Container>
      <Top>
        <UserPhoto source={require('../../../assets/default-user.png')} />
        <TopInputArea>
          <EvilIcons name="search" size={24} color="rgba(77, 86, 109, 0.46)" />
          <TopInput placeholder="Pesquisar..." />
        </TopInputArea>
        <Ionicons name="notifications-outline" size={22} color="#777d8c" />
      </Top>
      <ChooseArea>
        <ChooseItem onPress={toggle} isActive={favoriteIsActive}>
          <ChooseItemText isActive={favoriteIsActive}>Seus favoritos</ChooseItemText>
        </ChooseItem>
        <ChooseItem onPress={toggle} isActive={popularIsActive}>
          <ChooseItemText isActive={popularIsActive}>
            Mais favoritados
          </ChooseItemText>
        </ChooseItem>
      </ChooseArea>
      <Wrapper>
        {modalImageIsOpen && (
          <ModalImage
            data={modalImageData!}
            quantity={modalImageQuantity}
            openItem={modalImageOpenItem}
          />
        )}
        {posts?.map((post) => {
          return <Post isFavoriteList={popularIsActive} key={post.id} data={post} />
        })}
        {/* <FlatList
          data={postData}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Post data={data} />}
          contentContainerStyle={{ paddingBottom: 100 }}
        /> */}
      </Wrapper>
    </Container>
  )
}

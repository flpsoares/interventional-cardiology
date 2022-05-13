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
import { useUser } from '../../contexts/UserContext'

export const Favorites: React.FC = () => {
  const {
    modalImageIsOpen,
    modalImageData,
    modalImageQuantity,
    modalImageOpenItem
  } = useModal()

  const { user, userId } = useUser()

  const [posts, setPosts] = useState<App.Post[]>()
  const [favoriteIsActive, setFavoriteIsActive] = useState(true)
  const [popularIsActive, setPopularIsActive] = useState(false)

  const activeFavorite = () => {
    setFavoriteIsActive(true)
    setPopularIsActive(false)
  }

  const activePopular = () => {
    setFavoriteIsActive(false)
    setPopularIsActive(true)
  }
  useEffect(() => {
    if (favoriteIsActive) {
      database
        .collection('/posts_favorites')
        .where('autorId', '==', userId)
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
        {user?.userPhoto ? (
          <UserPhoto source={{ uri: user.userPhoto }} />
        ) : (
          <UserPhoto source={require('../../../assets/default-user.png')} />
        )}
        <TopInputArea>
          <EvilIcons name="search" size={24} color="rgba(77, 86, 109, 0.46)" />
          <TopInput placeholder="Pesquisar..." />
        </TopInputArea>
        <Ionicons name="notifications-outline" size={22} color="#777d8c" />
      </Top>
      <ChooseArea>
        <ChooseItem onPress={activeFavorite} isActive={favoriteIsActive}>
          <ChooseItemText isActive={favoriteIsActive}>Seus favoritos</ChooseItemText>
        </ChooseItem>
        <ChooseItem onPress={activePopular} isActive={popularIsActive}>
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

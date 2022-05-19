import { EvilIcons, Ionicons } from '@expo/vector-icons'
import { useFocusEffect, useIsFocused } from '@react-navigation/core'
import firebase from 'firebase'
import React, { useCallback, useEffect, useState } from 'react'
import { database } from '../../../firebase'
import { ModalChoosePlan } from '../../components/ModalChoosePlan'
import { ModalImage } from '../../components/ModalImage'
import { Post } from '../../components/Post'
import { useModal } from '../../contexts/ModalContext'
import { useUser } from '../../contexts/UserContext'
import { usePopularPost } from '../../hooks/usePopularPosts'
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

export const Favorites: React.FC = () => {
  const {
    modalImageIsOpen,
    modalImageData,
    modalImageQuantity,
    modalImageOpenItem,
    modalChoosePlanIsOpen,
    openModalChoosePlan
  } = useModal()

  const popularPosts = usePopularPost()

  const isFocused = useIsFocused()

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
    database
      .collection('/posts_favorites')
      .where('userId', '==', userId)
      .onSnapshot((querySnapshot) => {
        const postsIds = querySnapshot.docs
          .map((doc: any) => doc.data())
          .map((f) => f.postId)

        if (postsIds.length > 0) {
          database
            .collection('/posts')
            .where(firebase.firestore.FieldPath.documentId(), 'in', postsIds)
            .onSnapshot((querySnapshot) => {
              const data: any = querySnapshot.docs.map((doc) => {
                return {
                  id: doc.id,
                  ...doc.data()
                }
              })
              setPosts(data)
            })
        } else {
          setPosts([])
        }
      })
  }, [favoriteIsActive])

  useFocusEffect(
    useCallback(() => {
      if (user?.isSubscriber === false) {
        openModalChoosePlan()
      }
    }, [isFocused])
  )

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
        <Ionicons name="notifications-outline" size={22} color="#777d8c" />
      </Top>
      <ChooseArea>
        <ChooseItem onPress={activeFavorite} isActive={favoriteIsActive}>
          <ChooseItemText isActive={favoriteIsActive}>SEUS FAVORITOS</ChooseItemText>
        </ChooseItem>
        <ChooseItem onPress={activePopular} isActive={popularIsActive}>
          <ChooseItemText isActive={popularIsActive}>MAIS POPULARES</ChooseItemText>
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
        {favoriteIsActive && (
          <>
            {posts?.map((post) => {
              return (
                <Post isFavoriteList={popularIsActive} key={post.id} data={post} />
              )
            })}
          </>
        )}
        {!favoriteIsActive && (
          <>
            {popularPosts?.map(({ post }) => {
              return (
                <Post isFavoriteList={popularIsActive} key={post.id} data={post} />
              )
            })}
          </>
        )}
      </Wrapper>
    </Container>
  )
}

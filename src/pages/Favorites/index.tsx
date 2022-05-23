import { EvilIcons, Ionicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/core'
import firebase from 'firebase'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
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
    openModalChoosePlan,
    closeModalChoosePlan
  } = useModal()

  const popularPosts = usePopularPost()

  const { user, userId } = useUser()

  const [posts, setPosts] = useState<App.Post[]>()
  const [favoriteIsActive, setFavoriteIsActive] = useState(true)
  const [popularIsActive, setPopularIsActive] = useState(false)

  const isFocused = useIsFocused()

  const [search, setSearch] = useState('')

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

  useLayoutEffect(
    useCallback(() => {
      if (user?.isSubscriber === false) {
        openModalChoosePlan()
      }
      return () => closeModalChoosePlan()
    }, [user, isFocused])
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
          <TopInput
            value={search}
            onChangeText={setSearch}
            placeholder="Pesquisar..."
          />
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
            {posts
              // eslint-disable-next-line array-callback-return
              ?.filter((values) => {
                if (search === '') {
                  return values
                } else if (
                  values.autorNome.toLowerCase().includes(search.toLowerCase())
                ) {
                  return values
                }
              })
              .map((post) => {
                return (
                  <Post isFavoriteList={popularIsActive} key={post.id} data={post} />
                )
              })}
          </>
        )}
        {!favoriteIsActive && (
          <>
            {popularPosts
              // eslint-disable-next-line array-callback-return
              ?.filter((values) => {
                if (search === '') {
                  return values
                } else if (
                  values.post.autorNome.toLowerCase().includes(search.toLowerCase())
                ) {
                  return values
                }
              })
              .map((post) => {
                return (
                  <Post
                    isFavoriteList={popularIsActive}
                    key={post.post.id}
                    data={post.post}
                  />
                )
              })}
          </>
        )}
      </Wrapper>
    </Container>
  )
}
function openModalChoosePlan() {
  throw new Error('Function not implemented.')
}

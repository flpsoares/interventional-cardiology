import { EvilIcons, Ionicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/core'
import React, { useCallback, useLayoutEffect, useState } from 'react'
import { ModalChoosePlan } from '../../components/ModalChoosePlan'
import { ModalImage } from '../../components/ModalImage'
import { Post } from '../../components/Post'
import { useModal } from '../../contexts/ModalContext'
import { useUser } from '../../contexts/UserContext'
import { useFavoritePost } from '../../hooks/useFavoritePosts'
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
  const favoritePosts = useFavoritePost()

  const { user, userId } = useUser()

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
            {favoritePosts
              // eslint-disable-next-line array-callback-return
              .filter((values: any) => {
                if (search === '') {
                  return values
                } else if (
                  values.autorNome.toLowerCase().includes(search.toLowerCase())
                ) {
                  return values
                }
              })
              .map((post: any, index) => {
                return (
                  <Post isFavoriteList={popularIsActive} key={index} data={post} />
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
              .map((post, index) => {
                return (
                  <Post
                    isFavoriteList={popularIsActive}
                    key={index}
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

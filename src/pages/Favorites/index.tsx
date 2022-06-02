import { EvilIcons, Ionicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/core'
import I18n from 'i18n-js'
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
  const { user } = useUser()

  const [favoriteIsActive, setFavoriteIsActive] = useState(true)
  const [popularIsActive, setPopularIsActive] = useState(false)

  const favoritePosts = useFavoritePost()
  const popularPosts = usePopularPost()

  const isFocused = useIsFocused()

  const [search, setSearch] = useState('')

  I18n.translations = {
    pt: {
      favorites: 'SEUS FAVORITOS',
      popular: 'MAIS POPULARES',
      search: 'Pesquisar...'
    },
    en: {
      favorites: 'YOUR FAVORITES',
      popular: 'MORE POPULAR',
      search: 'Search...'
    },
    es: {
      favorites: 'TUS FAVORITOS',
      popular: 'MÁS POPULAR',
      search: 'Búsqueda...'
    }
  }

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
            placeholder={I18n.t('search')}
          />
        </TopInputArea>
        <Ionicons name="notifications-outline" size={22} color="#777d8c" />
      </Top>
      <ChooseArea>
        <ChooseItem onPress={activeFavorite} isActive={favoriteIsActive}>
          <ChooseItemText isActive={favoriteIsActive}>
            {I18n.t('favorites')}
          </ChooseItemText>
        </ChooseItem>
        <ChooseItem onPress={activePopular} isActive={!favoriteIsActive}>
          <ChooseItemText isActive={!favoriteIsActive}>
            {I18n.t('popular')}
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
              .map((post, index) => {
                return (
                  <Post isFavoriteList={!favoriteIsActive} key={index} data={post} />
                )
              })}
          </>
        )}
        {popularIsActive && (
          <>
            {popularPosts.map((post, index) => {
              return (
                <Post
                  isFavoriteList={popularIsActive}
                  key={index}
                  data={post.post!}
                />
              )
            })}
          </>
        )}
      </Wrapper>
    </Container>
  )
}

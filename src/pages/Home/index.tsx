/* eslint-disable array-callback-return */
import { EvilIcons, Ionicons } from '@expo/vector-icons'
import { useIsFocused } from '@react-navigation/core'
import React, { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import { FlatList } from 'react-native'
import { database } from '../../../firebase'
import { ModalChoosePlan } from '../../components/ModalChoosePlan'
import { ModalImage } from '../../components/ModalImage'
import { Post } from '../../components/Post'
import { useModal } from '../../contexts/ModalContext'
import { useUser } from '../../contexts/UserContext'
import { Container, Top, TopInput, TopInputArea, UserPhoto, Wrapper } from './style'

export const Home: React.FC = () => {
  const { user } = useUser()

  const {
    modalImageIsOpen,
    modalImageData,
    modalImageQuantity,
    modalImageOpenItem,
    modalChoosePlanIsOpen,
    openModalChoosePlan,
    closeModalChoosePlan
  } = useModal()

  const [posts, setPosts] = useState<App.Post[]>()
  const [search, setSearch] = useState('')
  const [list, setList] = useState(posts)

  const isFocused = useIsFocused()

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

  useEffect(() => {
    if (search === '') {
      setList(posts)
    } else {
      setList(
        posts?.filter((item) => {
          if (item.autorNome.toLowerCase().indexOf(search.toLowerCase()) > -1) {
            return true
          } else {
            return false
          }
        })
      )
    }
  }, [search, posts])

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
      <ModalChoosePlan />
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
      <Wrapper>
        {modalImageIsOpen && (
          <ModalImage
            data={modalImageData!}
            quantity={modalImageQuantity}
            openItem={modalImageOpenItem}
          />
        )}
        <FlatList
          data={list}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Post data={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </Wrapper>
    </Container>
  )
}

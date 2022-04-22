import React from 'react'
import { FlatList, Text } from 'react-native'
import { Container, Top, TopInput, TopInputArea, UserPhoto, Wrapper } from './style'

import { EvilIcons, Ionicons } from '@expo/vector-icons'
import { ModalImage } from '../../components/ModalImage'
import { Post } from '../../components/Post'
import { postData } from '../../postData'
import { useModal } from '../../contexts/ModalContext'

export const Favorites: React.FC = () => {
  const {
    modalImageIsOpen,
    modalImageData,
    modalImageQuantity,
    modalImageOpenItem
  } = useModal()

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
      <Wrapper>
        {modalImageIsOpen && (
          <ModalImage
            data={modalImageData!}
            quantity={modalImageQuantity}
            openItem={modalImageOpenItem}
          />
        )}
        <FlatList
          data={postData}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => <Post data={item} />}
          contentContainerStyle={{ paddingBottom: 100 }}
        />
      </Wrapper>
    </Container>
  )
}

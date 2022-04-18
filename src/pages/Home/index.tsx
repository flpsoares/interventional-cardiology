import React from 'react'
import { Container, Top, TopInput, TopInputArea, UserPhoto, Wrapper } from './style'

import { EvilIcons, Ionicons } from '@expo/vector-icons'
import { Post } from '../../components/Post'

export const Home: React.FC = () => {
  return (
    <Container>
      <Top>
        <UserPhoto source={require('../../../assets/default-user.png')} />
        <TopInputArea>
          <EvilIcons name="search" size={24} color="rgba(77, 86, 109, 0.46)" />
          <TopInput placeholder="Pesquisar..." />
        </TopInputArea>
        <Ionicons name="notifications-outline" size={24} />
      </Top>
      <Wrapper>
        <Post />
      </Wrapper>
    </Container>
  )
}

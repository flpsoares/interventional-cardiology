import React from 'react'
import { Container, Top, TopInput, TopInputArea, UserPhoto, Wrapper } from './style'

import { EvilIcons, Ionicons } from '@expo/vector-icons'
import { Post } from '../../components/Post'
import { FlatList } from 'react-native'
import { postData } from '../../postData'

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

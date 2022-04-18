import React from 'react'
import {
  Container,
  Content,
  Date,
  Info,
  Name,
  Options,
  Photo,
  PostInfo,
  Top,
  TopLeftContent,
  UserPhoto,
  Wrapper,
  ButtonArea,
  ButtonTitle,
  PostInfoArea,
  Button
} from './style'

import { Entypo, AntDesign, Fontisto } from '@expo/vector-icons'

export const Post: React.FC = () => {
  return (
    <Container>
      <Top>
        <TopLeftContent>
          <UserPhoto source={require('../../../assets/default-user.png')} />
          <Info>
            <Name>Felipe Bruno</Name>
            <Date>21/03/2022 - 5 horas</Date>
          </Info>
        </TopLeftContent>
        <Options>
          <Entypo name="dots-three-vertical" size={26} color="#596988" />
        </Options>
      </Top>
      <Wrapper>
        <Content>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
          bibendum laoreet. Proin gravida dolor sit amet lacus
        </Content>
        <Photo source={require('../../../assets/post-content.png')} />
        <PostInfoArea>
          <PostInfo>332 curtidas</PostInfo>
          <PostInfo>3 comentários</PostInfo>
        </PostInfoArea>
        <ButtonArea>
          <Button>
            <AntDesign name="like2" size={22} color="rgba(4, 20, 50, 0.8)" />
            <ButtonTitle>Curtir</ButtonTitle>
          </Button>
          <Button>
            <Fontisto name="commenting" size={22} color="rgba(4, 20, 50, 0.8)" />
            <ButtonTitle>Comentar</ButtonTitle>
          </Button>
        </ButtonArea>
      </Wrapper>
    </Container>
  )
}

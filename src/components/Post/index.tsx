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
  Button,
  ContentArea
} from './style'

import { Entypo, AntDesign, Fontisto } from '@expo/vector-icons'
import { PostDataProps } from '../../postData'

type Props = {
  data: PostDataProps
}

export const Post: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      <Top>
        <TopLeftContent>
          <UserPhoto source={data.userPhoto} />
          <Info>
            <Name>{data.name}</Name>
            <Date>
              {data.date} - {data.time}
            </Date>
          </Info>
        </TopLeftContent>
        <Options>
          <Entypo name="dots-three-vertical" size={26} color="#596988" />
        </Options>
      </Top>
      <Wrapper>
        <ContentArea>
          <Content>{data.content}</Content>
        </ContentArea>
        <Photo source={data.image} />
        <PostInfoArea>
          <PostInfo>{data.likes} curtidas</PostInfo>
          <PostInfo>{data.comments} comentários</PostInfo>
        </PostInfoArea>
        <ButtonArea>
          <Button>
            <AntDesign
              name={data.isLiked ? 'like1' : 'like2'}
              size={22}
              color="rgba(4, 20, 50, 0.8)"
            />
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

import React, { useState } from 'react'
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
import {
  Alert,
  Dimensions,
  FlatList,
  ImageSourcePropType,
  TouchableWithoutFeedback
} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { useModal } from '../../contexts/ModalContext'

type Props = {
  data: PostDataProps
}

export const Post: React.FC<Props> = ({ data }) => {
  const { openModalImage } = useModal()

  const [activeSlide, setActiveSlide] = useState(0)
  const [carousel, setCarousel] = useState<Carousel<ImageSourcePropType> | null>()

  const SCREEN_WIDTH = Dimensions.get('window').width

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
        <Carousel
          ref={(c) => setCarousel(c)}
          data={data.image}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() =>
                openModalImage(data.image, data.image.length, activeSlide)
              }
            >
              <Photo source={item} />
            </TouchableWithoutFeedback>
          )}
          onSnapToItem={(index) => setActiveSlide(index)}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH - 50}
          layout="default"
        />
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

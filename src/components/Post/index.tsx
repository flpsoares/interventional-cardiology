import React, { useEffect, useState } from 'react'
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
  ContentArea,
  SeeMoreButton,
  SeeMoreButtonText
} from './style'

import { Entypo, AntDesign, Fontisto } from '@expo/vector-icons'
import { PostDataProps } from '../../postData'
import {
  Alert,
  Dimensions,
  FlatList,
  ImageSourcePropType,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { useModal } from '../../contexts/ModalContext'
import { useNavigate } from '../../contexts/NavigateContext'
import { PostDropdown } from '../PostDropdown'
import { useUser } from '../../contexts/UserContext'
import app, { database } from '../../../firebase'

type Props = {
  data: App.Post
}

export const Post: React.FC<Props> = ({ data }) => {
  const { openModalImage } = useModal()
  const { navigateToPostDetails } = useNavigate()
  const { user } = useUser()

  const [activeSlide, setActiveSlide] = useState(0)
  const [carousel, setCarousel] = useState<Carousel<ImageSourcePropType> | null>()

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  const SCREEN_WIDTH = Dimensions.get('window').width

  useEffect(() => {
    database.collection(`/posts/${data.id}/likes`).onSnapshot((querySnapshot) => {
      setLikeCount(querySnapshot.docs.length)
    })
  }, [])

  // isLiked
  useEffect(() => {
    database
      .collection(`/posts/${data.id}/likes`)
      .where('autorId', '==', app.auth().currentUser!.uid)
      .get()
      .then((like) => {
        if (like.docs[0] !== undefined) {
          setIsLiked(true)
        } else {
          setIsLiked(false)
        }
      })
      .finally(() => setIsLoading(false))
  }, [])

  const handleLike = async (likeId: string) => {
    database
      .collection(`/posts/${data.id}/likes`)
      .where('autorId', '==', likeId)
      .get()
      .then(async (like) => {
        if (like.docs[0] === undefined) {
          return database
            .collection(`/posts/${data.id}/likes`)
            .add({ autorId: likeId })
            .then(() => {
              setIsLiked(true)
            })
            .catch((e) => console.log(e))
        } else {
          return await database
            .collection(`/posts/${data.id}/likes`)
            .doc(like.docs[0].id)
            .delete()
            .then(() => {
              setIsLiked(false)
            })
        }
      })
  }

  if (isLoading) {
    return <View></View>
  }

  return (
    <Container onPress={() => setDropdownIsOpen(false)}>
      <Top>
        <TopLeftContent>
          <UserPhoto source={require('../../../assets/default-user.png')} />
          <Info>
            <Name>{data.autorNome}</Name>
            <Date>{/* {data.date} - {data.time} */}2 minutos</Date>
            {/* <Date>{data.dataCriacao.seconds}</Date> */}
          </Info>
        </TopLeftContent>
        <Options onPress={() => setDropdownIsOpen(!dropdownIsOpen)}>
          <Entypo name="dots-three-vertical" size={26} color="#596988" />
        </Options>
        {dropdownIsOpen && <PostDropdown name={data.autorNome} />}
      </Top>
      <Wrapper>
        <ContentArea>
          <Content>{data.descricao}</Content>
        </ContentArea>
        {/* <Carousel
          ref={(c) => setCarousel(c)}
          data={data.image}
          renderItem={({ item }) => (
            <TouchableWithoutFeedback
              onPress={() =>
                openModalImage(data.image, data.image.length, activeSlide)
              }
            >
              <Photo resizeMode="contain" source={item} />
            </TouchableWithoutFeedback>
          )}
          onSnapToItem={(index) => setActiveSlide(index)}
          sliderWidth={SCREEN_WIDTH}
          itemWidth={SCREEN_WIDTH - 80}
          layout="default"
          style={{ maxHeight: '300px', backgroundColor: 'blue' }}
        /> */}
        <PostInfoArea>
          {/* <PostInfo>{data.likes} curtidas</PostInfo>
          <PostInfo>{data.comments} comentários</PostInfo> */}
          <PostInfo>{likeCount} curtidas</PostInfo>
          <PostInfo>0 comentários</PostInfo>
        </PostInfoArea>
        <ButtonArea>
          <Button onPress={() => handleLike(app.auth().currentUser!.uid)}>
            <AntDesign
              name={isLiked ? 'like1' : 'like2'}
              size={22}
              color="rgba(4, 20, 50, 0.8)"
            />
            <ButtonTitle>Curtir</ButtonTitle>
          </Button>
          <Button onPress={navigateToPostDetails}>
            <Fontisto name="commenting" size={22} color="rgba(4, 20, 50, 0.8)" />
            <ButtonTitle>Comentar</ButtonTitle>
          </Button>
        </ButtonArea>
      </Wrapper>
    </Container>
  )
}

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
  isDetail?: boolean
  isFavoriteList?: boolean
}

export const Post: React.FC<Props> = ({ data, isDetail, isFavoriteList }) => {
  const { openModalImage } = useModal()
  const { navigateToPostDetails } = useNavigate()
  const { userId } = useUser()

  const [activeSlide, setActiveSlide] = useState(0)
  const [carousel, setCarousel] = useState<Carousel<ImageSourcePropType> | null>()

  const [dropdownIsOpen, setDropdownIsOpen] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [commentCount, setCommentCount] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [isFavorited, setIsFavorited] = useState(false)
  const [favoriteCount, setFavoriteCount] = useState(0)

  const SCREEN_WIDTH = Dimensions.get('window').width

  // count
  useEffect(() => {
    database.collection(`/posts/${data.id}/likes`).onSnapshot((querySnapshot) => {
      setLikeCount(querySnapshot.docs.length)
    })
    database.collection(`/posts/${data.id}/comments`).onSnapshot((querySnapshot) => {
      setCommentCount(querySnapshot.docs.length)
    })
  }, [])

  useEffect(() => {
    // isLiked
    database
      .collection(`/posts/${data.id}/likes`)
      .where('autorId', '==', userId)
      .get()
      .then((like) => {
        if (like.docs[0] !== undefined) {
          setIsLiked(true)
        } else {
          setIsLiked(false)
        }
      })
      .finally(() => setIsLoading(false))
    // isFavorited
    database
      .collection(`/posts/${data.id}/favorites`)
      .where('autorId', '==', userId)
      .get()
      .then((favorite) => {
        if (favorite.docs[0] !== undefined) {
          setIsFavorited(true)
        } else {
          setIsFavorited(false)
        }
      })
      .finally(() => setIsLoading(false))

    database
      .collection(`/posts/${data.id}/favorites`)
      .onSnapshot((querySnapshot) => {
        setFavoriteCount(querySnapshot.docs.length)
      })
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
            {isFavoriteList && <Date>Favoritos: {favoriteCount}</Date>}
          </Info>
        </TopLeftContent>
        <Options onPress={() => setDropdownIsOpen(!dropdownIsOpen)}>
          <Entypo name="dots-three-vertical" size={26} color="#596988" />
        </Options>
        {dropdownIsOpen && (
          <PostDropdown
            autorId={data.autorId}
            isFavorited={isFavorited}
            postId={data.id!}
            name={data.autorNome}
          />
        )}
      </Top>
      <Wrapper>
        <ContentArea>
          <Content numberOfLines={10} ellipsizeMode="tail">
            {data.descricao}
          </Content>
          {isDetail && (
            <>
              <Content style={{ marginTop: 18 }}>Área: {data.area}</Content>
              <Content>Idade: {data.idade}</Content>
              <Content>Gênero: {data.genero}</Content>
              <Content>Sintoma: {data.sintoma}</Content>
              <Content>Comorbidade: {data.comorbidades}</Content>
              <Content>Medicamentos: {data.medicamentos}</Content>
            </>
          )}
          {!isDetail && (
            <SeeMoreButton onPress={() => navigateToPostDetails(data.id!)}>
              <SeeMoreButtonText>Ver detalhes</SeeMoreButtonText>
            </SeeMoreButton>
          )}
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
          <PostInfo>{likeCount} curtidas</PostInfo>
          <PostInfo>{commentCount} comentários</PostInfo>
        </PostInfoArea>
        <ButtonArea>
          <Button onPress={() => handleLike(userId)}>
            <AntDesign
              name={isLiked ? 'like1' : 'like2'}
              size={22}
              color="rgba(4, 20, 50, 0.8)"
            />
            <ButtonTitle>Curtir</ButtonTitle>
          </Button>
          <Button onPress={() => navigateToPostDetails(data.id!)}>
            <Fontisto name="commenting" size={22} color="rgba(4, 20, 50, 0.8)" />
            <ButtonTitle>Comentar</ButtonTitle>
          </Button>
        </ButtonArea>
      </Wrapper>
    </Container>
  )
}

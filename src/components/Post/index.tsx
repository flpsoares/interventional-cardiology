/* eslint-disable indent */
import React, { useEffect, useRef, useState } from 'react'
import {
  Container,
  Content,
  Date,
  Info,
  Name,
  Options,
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
  SeeMoreButtonText,
  Image,
  CarouselButton,
  VideoButton,
  HighlightedContent
} from './style'

import { Entypo, AntDesign, Fontisto } from '@expo/vector-icons'
import { Dimensions, View, StyleSheet } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { useModal } from '../../contexts/ModalContext'
import { useNavigate } from '../../contexts/NavigateContext'
import { PostDropdown } from '../PostDropdown'
import { useUser } from '../../contexts/UserContext'
import app, { database } from '../../../firebase'
import { Video } from 'expo-av'

type Props = {
  data: App.Post
  isDetail?: boolean
  isFavoriteList?: boolean
}

export const Post: React.FC<Props> = ({ data, isDetail, isFavoriteList }) => {
  const { openModalImage } = useModal()
  const { navigateToPostDetails } = useNavigate()
  const { userId } = useUser()

  const video = useRef(null)
  const [status, setStatus] = useState({})

  const [activeSlide, setActiveSlide] = useState(0)
  const [carousel, setCarousel] = useState<Carousel<string> | null>()

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
          {data.autorFoto ? (
            <UserPhoto source={{ uri: data.autorFoto }} />
          ) : (
            <UserPhoto source={require('../../../assets/default-user.png')} />
          )}

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
      <Wrapper isDetail={isDetail}>
        <ContentArea>
          <Content numberOfLines={10} ellipsizeMode="tail">
            {data.descricao}
          </Content>
          {isDetail && (
            <>
              <Content style={{ marginTop: 18 }}>
                <HighlightedContent>Área: </HighlightedContent>
                {data.area}
              </Content>
              <Content>
                <HighlightedContent>Idade: </HighlightedContent>
                {data.idade}
              </Content>
              <Content>
                <HighlightedContent>Gênero: </HighlightedContent>
                {data.genero}
              </Content>
              <Content>
                <HighlightedContent>Sintoma: </HighlightedContent>
                {data.sintoma}
              </Content>
              <Content>
                <HighlightedContent>Comorbidade: </HighlightedContent>
                {data.comorbidades}
              </Content>
              <Content>
                <HighlightedContent>Medicamentos: </HighlightedContent>
                {data.medicamentos.map((med) => {
                  return `${med} `
                })}
              </Content>
            </>
          )}
          {!isDetail && (
            <SeeMoreButton onPress={() => navigateToPostDetails(data.id!)}>
              <SeeMoreButtonText>Ver detalhes</SeeMoreButtonText>
            </SeeMoreButton>
          )}
        </ContentArea>
        {data.arquivos[0] !== '' && (
          <Carousel
            ref={(c) => setCarousel(c)}
            data={data.arquivos}
            onSnapToItem={(index) => setActiveSlide(index)}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH - 80}
            layout="default"
            style={{ maxHeight: '300px' }}
            renderItem={({ item }) => (
              <>
                {item.indexOf('.mp4') !== -1 ||
                item.indexOf('.wmv') !== -1 ||
                item.indexOf('.avi') !== -1 ? (
                  <VideoButton>
                    <Video
                      ref={video}
                      style={styles.video}
                      source={{
                        uri: item
                      }}
                      useNativeControls
                      resizeMode="cover"
                      isLooping
                      onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                    />
                  </VideoButton>
                ) : (
                  <CarouselButton
                    onPress={() =>
                      openModalImage(data.arquivos, data.arquivos.length, activeSlide)
                    }
                  >
                    <Image
                      resizeMode="cover"
                      source={{
                        uri: item
                      }}
                    />
                  </CarouselButton>
                )}
              </>
            )}
          />
        )}
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

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%'
  }
})

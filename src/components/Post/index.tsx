/* eslint-disable indent */
import { AntDesign, Entypo, Fontisto } from '@expo/vector-icons'
import { Video } from 'expo-av'
import I18n from 'i18n-js'
import moment from 'moment'
import 'moment-timezone'
import 'moment/locale/pt-br'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { database } from '../../../firebase'
import { useModal } from '../../contexts/ModalContext'
import { useNavigate } from '../../contexts/NavigateContext'
import { useNotification } from '../../contexts/NotificationContext'
import { useUser } from '../../contexts/UserContext'
import { PostDropdown } from '../PostDropdown'
import {
  Button,
  ButtonArea,
  ButtonTitle,
  CarouselButton,
  Container,
  Content,
  ContentArea,
  Date,
  HighlightedContent,
  Image,
  Info,
  Name,
  Options,
  PostInfo,
  PostInfoArea,
  SeeMoreButton,
  SeeMoreButtonText,
  Top,
  TopLeftContent,
  UserPhoto,
  UserPhotoButton,
  VideoButton,
  Wrapper
} from './style'

type Props = {
  data: App.Post
  isDetail?: boolean
  isFavoriteList?: boolean
}

export const Post: React.FC<Props> = ({ data, isDetail, isFavoriteList }) => {
  const { openModalImage } = useModal()
  const { navigateToPostDetails, navigateToUserProfile } = useNavigate()
  const { userId, user } = useUser()
  const { sendRemoteNotification } = useNotification()

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
  const [isFollower, setIsFollower] = useState(false)

  const SCREEN_WIDTH = Dimensions.get('window').width

  I18n.translations = {
    pt: {
      favorites: 'Favoritos',
      area: 'Area',
      age: 'Idade',
      genre: 'Gênero',
      symptom: 'Sintoma',
      comorbidity: 'Comorbidade',
      medicine: 'Medicamento',
      like: 'Curtir',
      likes: 'curtidas',
      comments: 'comentários',
      comment: 'Comentar',
      likeTitle: 'Você tem uma nova curtida',
      likeMessage: 'curtiu sua postagem',
      details: 'Ver detalhes'
    },
    en: {
      favorites: 'Favorites',
      area: 'Area',
      age: 'Age',
      genre: 'Genre',
      symptom: 'Symptom',
      comorbidity: 'Comorbidity',
      medicine: 'Medicine',
      like: 'Like',
      likes: 'likes',
      comments: 'comments',
      comment: 'Comment',
      likeTitle: 'You have a new like',
      likeMessage: 'liked your post',
      details: 'See details'
    },
    es: {
      favorites: 'Favoritos',
      area: 'Área',
      age: 'Años',
      genre: 'Género',
      symptom: 'Síntoma',
      comorbidity: 'Comorbilidad',
      medicine: 'Medicamento',
      like: 'Disfrutar',
      likes: 'gustos',
      comments: 'comentarios',
      comment: 'Comentario',
      likeTitle: 'Tienes un nuevo me gusta',
      likeMessage: 'me gustó tu publicación',
      details: 'Ver detalhes'
    }
  }

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
      .collection('/posts_favorites')
      .where('userId', '==', userId)
      .where('postId', '==', data.id)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot.docs[0] === undefined) {
          setIsFavorited(false)
        } else {
          setIsFavorited(true)
        }
      })

    // isFollower
    database
      .collection(`users/${data.autorId}/followers`)
      .where('userId', '==', userId)
      .onSnapshot((querySnapshot) => {
        if (querySnapshot.docs[0] === undefined) {
          setIsFollower(false)
        } else {
          setIsFollower(true)
        }
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
              database
                .collection('users')
                .doc(data.autorId)
                .get()
                .then((res) => {
                  const token = res.data()!.notificationToken
                  sendRemoteNotification(
                    I18n.t('likeTitle'),
                    `${user?.name} ${I18n.t('likeMessage')}`,
                    token
                  )
                })
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
            <UserPhotoButton onPress={() => navigateToUserProfile(data.autorId)}>
              <UserPhoto source={{ uri: data.autorFoto }} />
            </UserPhotoButton>
          ) : (
            <UserPhotoButton onPress={() => navigateToUserProfile(data.autorId)}>
              <UserPhoto source={require('../../../assets/default-user.png')} />
            </UserPhotoButton>
          )}

          <Info>
            <Name>{data.autorNome}</Name>
            <Date>
              {moment(data.dataExibicao, 'DD/MM/YYYY H:mm:ss')
                .tz('America/Sao_Paulo')
                .fromNow()}
            </Date>
            {isFavoriteList && (
              <Date>
                {I18n.t('favorites')}: {data.favorites}
              </Date>
            )}
          </Info>
        </TopLeftContent>
        <Options onPress={() => setDropdownIsOpen(!dropdownIsOpen)}>
          <Entypo name="dots-three-vertical" size={26} color="#596988" />
        </Options>
        {dropdownIsOpen && (
          <PostDropdown
            autorId={data.autorId}
            isFavorited={isFavorited}
            isFollower={isFollower}
            postId={data.id!}
            name={data.autorNome}
            favorites={data.favorites}
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
                <HighlightedContent>{I18n.t('area')}: </HighlightedContent>
                {data.area.map((area) => {
                  return `${area} `
                })}
              </Content>
              <Content>
                <HighlightedContent>{I18n.t('age')}: </HighlightedContent>
                {data.idade}
              </Content>
              <Content>
                <HighlightedContent>{I18n.t('genre')}: </HighlightedContent>
                {data.genero}
              </Content>
              <Content>
                <HighlightedContent>{I18n.t('symptom')}: </HighlightedContent>
                {data.sintoma.map((sintoma) => {
                  return `${sintoma} `
                })}
              </Content>
              <Content>
                <HighlightedContent>{I18n.t('comorbidity')}: </HighlightedContent>
                {data.comorbidades.map((comorbidade) => {
                  return `${comorbidade} `
                })}
              </Content>
              <Content>
                <HighlightedContent>{I18n.t('medicine')}: </HighlightedContent>
                {data.medicamentos.map((med) => {
                  return `${med} `
                })}
              </Content>
              <Content>{data.desfecho}</Content>
            </>
          )}
          {!isDetail && (
            <SeeMoreButton onPress={() => navigateToPostDetails(data.id!)}>
              <SeeMoreButtonText>{I18n.t('details')}</SeeMoreButtonText>
            </SeeMoreButton>
          )}
        </ContentArea>
        {data.arquivos && data.arquivos[0] !== '' && (
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
                      openModalImage(
                        data.arquivos!,
                        data.arquivos!.length,
                        activeSlide
                      )
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
          <PostInfo>
            {likeCount} {I18n.t('likes')}
          </PostInfo>
          <PostInfo>
            {commentCount} {I18n.t('comments')}
          </PostInfo>
        </PostInfoArea>
        <ButtonArea>
          <Button onPress={() => handleLike(userId)}>
            <AntDesign
              name={isLiked ? 'like1' : 'like2'}
              size={22}
              color="rgba(4, 20, 50, 0.8)"
            />
            <ButtonTitle>{I18n.t('like')}</ButtonTitle>
          </Button>
          <Button onPress={() => navigateToPostDetails(data.id!)}>
            <Fontisto name="commenting" size={22} color="rgba(4, 20, 50, 0.8)" />
            <ButtonTitle>{I18n.t('comment')}</ButtonTitle>
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

import { EvilIcons, FontAwesome, Ionicons } from '@expo/vector-icons'
import { RouteProp, useRoute } from '@react-navigation/core'
import firebase from 'firebase'
import I18n from 'i18n-js'
import moment from 'moment'
import 'moment-timezone'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, View } from 'react-native'
import { database } from '../../../firebase'
import { Comment } from '../../components/Comment'
import { ModalNotifications } from '../../components/ModalNotifications'
import { Post } from '../../components/Post'
import { useModal } from '../../contexts/ModalContext'
import { useNotification } from '../../contexts/NotificationContext'
import { useUser } from '../../contexts/UserContext'
import { RootStackParamsList } from '../../routes/RootStackParamsList'
import { primary } from '../../styles/globalCssVar'
import {
  CommentInput,
  CommentInputArea,
  CommentInputBox,
  Container,
  NotificationButton,
  SendButton,
  Title,
  Top,
  TopInput,
  TopInputArea,
  UserPhoto,
  Wrapper
} from './style'

export const PostDetails: React.FC = () => {
  const { user, userId } = useUser()
  const { openNotificationModal } = useModal()
  const route = useRoute<RouteProp<RootStackParamsList, 'PostDetails'>>()
  const { sendRemoteNotification } = useNotification()

  const [post, setPost] = useState<any>()
  const [comments, setComments] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const [commentText, setCommentText] = useState('')

  I18n.translations = {
    pt: {
      newCommentTitle: 'Você tem um novo comentário',
      newCommentMessage: 'comentou na sua postagem',
      error: 'Erro',
      errorOcurred: 'Ocorreu algum erro',
      search: 'Pesquisar...',
      comments: 'Comentários',
      comment: 'Comentar'
    },
    en: {
      newCommentTitle: 'You have a new comment',
      newCommentMessage: 'commented on your post',
      error: 'Error',
      errorOcurred: 'some error occurred',
      search: 'Search...',
      comments: 'Comments',
      comment: 'Comment'
    },
    es: {
      newCommentTitle: 'Tienes un nuevo comentario',
      newCommentMessage: 'comentó en tu publicación',
      error: 'Error',
      errorOcurred: 'ocurrió algún error',
      search: 'Búsqueda...',
      comments: 'Comentarios',
      comment: 'Comentario'
    }
  }

  const dateNow = moment().tz('America/Sao_Paulo').format('DD/MM/YYYY H:mm:ss')

  const newCommentTitle = I18n.t('newCommentTitle')
  const newCommentMessage = I18n.t('newCommentMessage')

  const createComment = () => {
    if (commentText !== '') {
      database
        .collection(`/posts/${route.params.postId}/comments`)
        .add({
          autorId: userId,
          autorNome: user?.name,
          autorFoto: user?.userPhoto || '',
          texto: commentText,
          dataCriacao: firebase.firestore.FieldValue.serverTimestamp(),
          dataExibicao: dateNow
        })
        .then(() => {
          database
            .collection('users')
            .doc(post.autorId)
            .get()
            .then((res) => {
              const token = res.data()!.notificationToken
              sendRemoteNotification(
                newCommentTitle,
                `${user?.name} ${newCommentMessage}`,
                token
              )
            })
          setCommentText('')
        })
        .catch((e) => {
          Alert.alert(I18n.t('error'), I18n.t('errorOcurred'))
          console.log(e)
        })
    }
  }

  const getComments = () => {
    database
      .collection(`/posts/${route.params.postId}/comments`)
      .orderBy('dataCriacao', 'desc')
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data()
          }
        }) as App.Comment[]
        setComments(data)
      })
  }

  useEffect(() => {
    database
      .collection('posts')
      .doc(route.params.postId)
      .onSnapshot((querySnapshot) => {
        const data = { id: querySnapshot.id, ...querySnapshot.data() }

        setPost(data)
        getComments()
        setIsLoading(false)
      })
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={primary} />
      </View>
    )
  }

  return (
    <Container>
      <ModalNotifications />
      <Top>
        {user?.userPhoto ? (
          <UserPhoto source={{ uri: user.userPhoto }} />
        ) : (
          <UserPhoto source={require('../../../assets/default-user.png')} />
        )}
        <TopInputArea>
          <EvilIcons name="search" size={24} color="rgba(77, 86, 109, 0.46)" />
          <TopInput placeholder={I18n.t('search')} />
        </TopInputArea>
        <NotificationButton onPress={openNotificationModal}>
          <Ionicons name="notifications-outline" size={22} color="#777d8c" />
        </NotificationButton>
      </Top>
      <Wrapper>
        <Post isDetail data={post} />
        <Title>{I18n.t('comments')}</Title>
        <CommentInputArea>
          {user?.userPhoto ? (
            <UserPhoto source={{ uri: user.userPhoto }} />
          ) : (
            <UserPhoto source={require('../../../assets/default-user.png')} />
          )}
          <CommentInputBox>
            <CommentInput
              onChangeText={setCommentText}
              value={commentText}
              placeholder={I18n.t('comment')}
            />
            <SendButton onPress={createComment}>
              <FontAwesome name="send" size={24} color="#596988" />
            </SendButton>
          </CommentInputBox>
        </CommentInputArea>
        {comments?.map((comment: App.Comment) => {
          return <Comment key={comment.id} data={comment} />
        })}
      </Wrapper>
    </Container>
  )
}

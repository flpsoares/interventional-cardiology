import { EvilIcons, FontAwesome, Ionicons } from '@expo/vector-icons'
import { RouteProp, useRoute } from '@react-navigation/core'
import firebase from 'firebase'
import moment from 'moment'
import 'moment-timezone'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Alert, View } from 'react-native'
import { database } from '../../../firebase'
import { Comment } from '../../components/Comment'
import { Post } from '../../components/Post'
import { useNotification } from '../../contexts/NotificationContext'
import { useUser } from '../../contexts/UserContext'
import { RootStackParamsList } from '../../routes/RootStackParamsList'
import { primary } from '../../styles/globalCssVar'
import {
  CommentInput,
  CommentInputArea,
  CommentInputBox,
  Container,
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
  const route = useRoute<RouteProp<RootStackParamsList, 'PostDetails'>>()
  const { sendRemoteNotification } = useNotification()

  const [post, setPost] = useState<any>()
  const [comments, setComments] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const [commentText, setCommentText] = useState('')

  const dateNow = moment().tz('America/Sao_Paulo').format('DD/MM/YYYY H:mm:ss')

  const createComment = () => {
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
              'Você tem um novo comentário!',
              `${user?.name} comentou na sua postagem`,
              token
            )
          })
        setCommentText('')
      })
      .catch((e) => {
        Alert.alert('Erro', 'Ocorreu algum erro')
        console.log(e)
      })
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
      <Top>
        {user?.userPhoto ? (
          <UserPhoto source={{ uri: user.userPhoto }} />
        ) : (
          <UserPhoto source={require('../../../assets/default-user.png')} />
        )}
        <TopInputArea>
          <EvilIcons name="search" size={24} color="rgba(77, 86, 109, 0.46)" />
          <TopInput placeholder="Pesquisar..." />
        </TopInputArea>
        <Ionicons name="notifications-outline" size={24} />
      </Top>
      <Wrapper>
        <Post isDetail data={post} />
        <Title>Comentários</Title>
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
              placeholder="Comentar"
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

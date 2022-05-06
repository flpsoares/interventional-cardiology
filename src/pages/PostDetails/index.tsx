import React, { useEffect, useState } from 'react'
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
import { EvilIcons, Ionicons, FontAwesome } from '@expo/vector-icons'
import { Post } from '../../components/Post'
import { Comment } from '../../components/Comment'
import { ActivityIndicator, Alert, FlatList, TextInput, View } from 'react-native'
import app, { database } from '../../../firebase'
import { RouteProp, useRoute } from '@react-navigation/core'
import { RootStackParamsList } from '../../routes/RootStackParamsList'
import { primary } from '../../styles/globalCssVar'
import { useUser } from '../../contexts/UserContext'
import firebase from 'firebase'

export const PostDetails: React.FC = () => {
  const { user } = useUser()
  const route = useRoute<RouteProp<RootStackParamsList, 'PostDetails'>>()

  const [post, setPost] = useState<any>()
  const [comments, setComments] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const [commentText, setCommentText] = useState('')

  const createComment = () => {
    database
      .collection(`/posts/${route.params.postId}/comments`)
      .add({
        autorId: app.auth().currentUser!.uid,
        autorNome: user?.name,
        texto: commentText,
        dataCriacao: firebase.firestore.FieldValue.serverTimestamp()
      })
      .then(() => setCommentText(''))
      .catch((e) => {
        Alert.alert('Erro', 'Ocorreu algum erro')
        console.log(e)
      })
  }

  const getComments = () => {
    database
      .collection(`/posts/${route.params.postId}/comments`)
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

  const getPost = async (postId: string) => {
    await database
      .collection('posts')
      .doc(postId)
      .get()
      .then((res) => setPost(res.data()))
    // .onSnapshot((querySnapshot) => {
    //   const data = { id: querySnapshot.id, ...querySnapshot.data() }
    //   setPost(data)
    // })
  }

  useEffect(() => {
    getPost(route.params.postId).finally(() => {
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
        <UserPhoto source={require('../../../assets/default-user.png')} />
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
          <UserPhoto source={require('../../../assets/default-user.png')} />
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

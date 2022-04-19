import React from 'react'
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
import { FlatList } from 'react-native'
import { commentData } from '../../commentData'
import { TouchableOpacity } from 'react-native-gesture-handler'

export const PostDetails: React.FC = () => {
  const data = {
    id: 1,
    name: 'Felipe Bruno',
    date: '21/03/22',
    time: '5 horas',
    content: 'Conteúdo do primeiro post',
    userPhoto: require('../../../assets/default-user.png'),
    image: [
      require('../../../assets/post-content.png'),
      require('../../../assets/post-content.png'),
      require('../../../assets/post-content.png'),
      require('../../../assets/post-content.png'),
      require('../../../assets/post-content.png')
    ],
    likes: 332,
    comments: 3,
    isLiked: false
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
        <Post data={data} />
        <Title>Comentários</Title>
        <CommentInputArea>
          <UserPhoto source={require('../../../assets/default-user.png')} />
          <CommentInputBox>
            <CommentInput placeholder="Comentar" />
            <SendButton>
              <FontAwesome name="send" size={24} color="#596988" />
            </SendButton>
          </CommentInputBox>
        </CommentInputArea>
        {commentData.map((comment) => {
          return <Comment key={comment.id} data={comment} />
        })}
      </Wrapper>
    </Container>
  )
}

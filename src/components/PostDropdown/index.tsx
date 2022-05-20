import { Feather, FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import { database } from '../../../firebase'
import { useUser } from '../../contexts/UserContext'
import { Container, Icon, Item, Text } from './style'

interface PostDropdownProps {
  name: string
  postId: string
  isFavorited: boolean
  isFollower: boolean
  autorId: string
}

export const PostDropdown: React.FC<PostDropdownProps> = ({
  name,
  postId,
  isFavorited,
  isFollower,
  autorId
}) => {
  const { userId, user } = useUser()

  const [favorited, setFavorited] = useState(isFavorited)
  const [follower, setFollower] = useState(isFollower)

  const firstName = name.split(' ')[0]

  const handleFavorite = () => {
    database
      .collection('/posts_favorites')
      .where('userId', '==', userId)
      .where('postId', '==', postId)
      .get()
      .then((res) => {
        if (res.docs[0] === undefined) {
          database
            .collection('/posts_favorites')
            .add({ postId, userId })
            .then(() => setFavorited(true))
            .catch(() => Alert.alert('Erro', 'Ocorreu um erro'))
        } else {
          database
            .collection('/posts_favorites')
            .doc(res.docs[0].id)
            .delete()
            .then(() => setFavorited(false))
            .catch(() => Alert.alert('Erro', 'Ocorreu um erro'))
        }
      })
  }

  const handleFollow = () => {
    database
      .collection(`/users/${autorId}/followers`)
      .where('userId', '==', userId)
      .get()
      .then((res) => {
        if (res.docs[0] === undefined) {
          database
            .collection(`/users/${autorId}/followers`)
            .add({
              userName: user?.name,
              userEmail: user?.email,
              userId: userId
            })
            .then(() => setFollower(true))
            .catch(() => Alert.alert('Erro', 'Ocorreu um erro'))
        } else {
          database
            .collection(`/users/${autorId}/followers`)
            .doc(res.docs[0].id)
            .delete()
            .then(() => setFollower(false))
            .catch(() => Alert.alert('Erro', 'Ocorreu um erro'))
        }
      })
  }

  const deletePost = () => {
    database
      .collection('/posts')
      .doc(postId)
      .delete()
      .catch(() => Alert.alert('Erro', 'Ocorreu algum erro'))
  }

  return (
    <Container>
      {autorId === userId ? (
        <>
          <Item
            onPress={() => {
              handleFavorite()
            }}
          >
            <Icon>
              <FontAwesome name="bookmark" size={20} color="#fff" />
            </Icon>
            <Text>{favorited ? 'Desfavoritar' : 'Favoritar'} Publicação</Text>
          </Item>
          <Item onPress={deletePost} style={{ marginTop: 22 }}>
            <Icon>
              <Feather name="delete" size={22} color="#fff" />
            </Icon>
            <Text>Excluir Post</Text>
          </Item>
        </>
      ) : (
        <>
          <Item
            onPress={() => {
              handleFavorite()
            }}
          >
            <Icon>
              <FontAwesome name="bookmark" size={20} color="#fff" />
            </Icon>
            <Text>{favorited ? 'Desfavoritar' : 'Favoritar'} Publicação</Text>
          </Item>
          <Item onPress={handleFollow} style={{ marginVertical: 20 }}>
            <Icon>
              <FontAwesome name="plus" size={20} color="#fff" />
            </Icon>
            <Text>
              {follower ? 'Deixar de seguir' : 'Seguir'} {firstName}
            </Text>
          </Item>
          <Item onPress={() => Alert.alert('Aviso', `Você bloqueou ${name}`)}>
            <Icon>
              <FontAwesome name="minus-circle" size={20} color="#fff" />
            </Icon>
            <Text>Bloquear {firstName}</Text>
          </Item>
        </>
      )}
    </Container>
  )
}

import { Feather, FontAwesome } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Alert } from 'react-native'
import { database } from '../../../firebase'
import { useNavigate } from '../../contexts/NavigateContext'
import { useNotification } from '../../contexts/NotificationContext'
import { useUser } from '../../contexts/UserContext'
import { Container, Icon, Item, Text } from './style'

interface PostDropdownProps {
  name: string
  postId: string
  isFavorited: boolean
  isFollower: boolean
  autorId: string
  favorites: number
}

export const PostDropdown: React.FC<PostDropdownProps> = ({
  name,
  postId,
  isFavorited,
  isFollower,
  autorId,
  favorites
}) => {
  const { userId, user } = useUser()

  const { navigateToHome } = useNavigate()

  const { sendRemoteNotification } = useNotification()

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
            .then(() => {
              database
                .collection('/posts')
                .doc(postId)
                .update({ favorites: favorites + 1 })
              setFavorited(true)
            })
            .catch(() => Alert.alert('Erro', 'Ocorreu um erro'))
        } else {
          database
            .collection('/posts_favorites')
            .doc(res.docs[0].id)
            .delete()
            .then(() => {
              database
                .collection('/posts')
                .doc(postId)
                .update({ favorites: favorites - 1 })
              setFavorited(false)
            })
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
          database.collection(`/users/${autorId}/followers`).add({
            userName: user?.name,
            userId: userId
          })
          database
            .collection(`/users/${userId}/following`)
            .add({
              userName: name,
              userId: autorId
            })

            .then(() => {
              database
                .collection('/users')
                .doc(autorId)
                .get()
                .then((res) => {
                  const token = res.data()!.notificationToken
                  sendRemoteNotification(
                    'Você tem um novo seguidor!',
                    `${user?.name} acabou de te seguir`,
                    token
                  )
                })
              setFollower(true)
            })
            .catch(() => Alert.alert('Erro', 'Ocorreu um erro'))
        } else {
          database
            .collection(`/users/${autorId}/followers`)
            .doc(res.docs[0].id)
            .delete()
            .then(() => setFollower(false))
            .catch(() => Alert.alert('Erro', 'Ocorreu um erro'))
          // procurar e excluir following
          database
            .collection(`/users/${userId}/following`)
            .where('userId', '==', autorId)
            .get()
            .then((res) => {
              database
                .collection(`/users/${userId}/following`)
                .doc(res.docs[0].id)
                .delete()
                .catch(() => Alert.alert('Erro', 'Ocorreu um erro'))
            })
        }
      })
  }

  const deletePost = () => {
    navigateToHome()
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
          <Item onPress={handleFollow} style={{ marginTop: 20 }}>
            <Icon>
              <FontAwesome name="plus" size={20} color="#fff" />
            </Icon>
            <Text>
              {follower ? 'Deixar de seguir' : 'Seguir'} {firstName}
            </Text>
          </Item>
        </>
      )}
    </Container>
  )
}

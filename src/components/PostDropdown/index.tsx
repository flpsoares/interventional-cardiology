import React, { useState } from 'react'
import { Container, Icon, Item, Text } from './style'

import { FontAwesome, Feather } from '@expo/vector-icons'
import { Alert } from 'react-native'
import app, { database } from '../../../firebase'
import firebase from 'firebase'

interface PostDropdownProps {
  name: string
  postId: string
  isFavorited: boolean
  autorId: string
}

export const PostDropdown: React.FC<PostDropdownProps> = ({
  name,
  postId,
  isFavorited,
  autorId
}) => {
  const [favorited, setFavorited] = useState(isFavorited)

  const firstName = name.split(' ')[0]

  const handleFavorite = () => {
    database
      .collection(`/posts/${postId}/favorites`)
      .where('autorId', '==', autorId)
      .get()
      .then(async (favorite) => {
        if (favorite.docs[0] === undefined) {
          return database
            .collection(`/posts/${postId}/favorites`)
            .add({ autorId: app.auth().currentUser!.uid })
            .then(() => setFavorited(true))
            .catch((e) => console.log(e))
        } else {
          return await database
            .collection(`/posts/${postId}/favorites`)
            .doc(favorite.docs[0].id)
            .delete()
            .then(() => setFavorited(false))
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
      {autorId === app.auth().currentUser!.uid ? (
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
          <Item
            onPress={() => Alert.alert('Aviso', `Você seguiu ${name}`)}
            style={{ marginVertical: 20 }}
          >
            <Icon>
              <FontAwesome name="plus" size={20} color="#fff" />
            </Icon>
            <Text>Seguir {firstName}</Text>
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

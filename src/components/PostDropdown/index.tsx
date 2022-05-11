import React from 'react'
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
  const firstName = name.split(' ')[0]

  const handleFavorite = () => {
    database
      .collection('/posts')
      .doc(postId)
      .get()
      .then((res) => {
        if (res.data()!.favoritos.indexOf(app.auth().currentUser!.uid) !== -1) {
          database
            .collection('/posts')
            .doc(postId)
            .set(
              {
                favoritos: firebase.firestore.FieldValue.arrayRemove(
                  app.auth().currentUser!.uid
                )
              },
              { merge: true }
            )
            .catch((e) => console.log(e))
        } else {
          database
            .collection('/posts')
            .doc(postId)
            .set(
              {
                favoritos: firebase.firestore.FieldValue.arrayUnion(
                  app.auth().currentUser!.uid
                )
              },
              { merge: true }
            )
            .catch((e) => console.log(e))
        }
      })

    // .then((hasFavorite) => {
    //   console.log(hasFavorite.docs[0])
    //   if (hasFavorite.docs[0] !== undefined) {
    //     console.log('não é favorito')
    //   } else {
    //     console.log('é favorito')
    //   }
    // })
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
            <Text>{isFavorited ? 'Desfavoritar' : 'Favoritar'} Publicação</Text>
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
            <Text>{isFavorited ? 'Desfavoritar' : 'Favoritar'} Publicação</Text>
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

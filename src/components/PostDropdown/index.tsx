import React from 'react'
import { Container, Icon, Item, Text } from './style'

import { FontAwesome } from '@expo/vector-icons'
import { Alert } from 'react-native'

interface PostDropdownProps {
  name: string
}

export const PostDropdown: React.FC<PostDropdownProps> = ({ name }) => {
  const firstName = name.split(' ')[0]

  return (
    <Container>
      <Item onPress={() => Alert.alert('Aviso', 'Você salvou essa publicação')}>
        <Icon>
          <FontAwesome name="bookmark" size={20} color="#fff" />
        </Icon>
        <Text>Salvar Publicação</Text>
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
    </Container>
  )
}

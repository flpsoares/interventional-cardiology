import React from 'react'
import { Container, Icon, Item, Text } from './style'

import { Ionicons, FontAwesome } from '@expo/vector-icons'
import { Alert } from 'react-native'
import app from '../../../firebase'
import { useNavigate } from '../../contexts/NavigateContext'

export const SettingsDropdown: React.FC = () => {
  const { navigateToEditAccount } = useNavigate()

  const logOut = () => {
    app.auth().signOut()
  }

  return (
    <Container>
      <Item style={{ marginBottom: 18 }} onPress={navigateToEditAccount}>
        <Icon>
          <FontAwesome name="edit" size={20} color="#fff" />
        </Icon>
        <Text>Editar perfil</Text>
      </Item>
      <Item onPress={logOut}>
        <Icon>
          <Ionicons name="exit-outline" size={20} color="#fff" />
        </Icon>
        <Text>Sair</Text>
      </Item>
    </Container>
  )
}

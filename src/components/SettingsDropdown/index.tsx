import { FontAwesome, Ionicons } from '@expo/vector-icons'
import I18n from 'i18n-js'
import React from 'react'
import app from '../../../firebase'
import { useNavigate } from '../../contexts/NavigateContext'
import { Container, Icon, Item, Text } from './style'

export const SettingsDropdown: React.FC = () => {
  const { navigateToEditAccount } = useNavigate()

  const logOut = () => {
    app.auth().signOut()
  }

  I18n.translations = {
    pt: { edit: 'Editar perfil', exit: 'Sair' },
    en: { edit: 'Edit profile', exit: 'Log out' },
    es: { edit: 'Editar perfil', exit: 'Salir' }
  }

  return (
    <Container>
      <Item style={{ marginBottom: 18 }} onPress={navigateToEditAccount}>
        <Icon>
          <FontAwesome name="edit" size={20} color="#fff" />
        </Icon>
        <Text>{I18n.t('edit')}</Text>
      </Item>
      <Item onPress={logOut}>
        <Icon>
          <Ionicons name="exit-outline" size={20} color="#fff" />
        </Icon>
        <Text>{I18n.t('exit')}</Text>
      </Item>
    </Container>
  )
}

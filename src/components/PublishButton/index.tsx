import { Entypo } from '@expo/vector-icons'
import I18n from 'i18n-js'
import React from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { Container, Title } from './style'

export const PublishButton: React.FC = () => {
  const { language } = useLanguage()

  I18n.locale = language

  I18n.translations = {
    pt: { title: 'Publicar' },
    en: { title: 'Publish' },
    es: { title: 'Publicar' }
  }

  return (
    <Container>
      <Entypo name="plus" size={28} color="#fff" />
      <Title>{I18n.t('title')}</Title>
    </Container>
  )
}

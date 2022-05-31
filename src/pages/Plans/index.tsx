import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect, useIsFocused } from '@react-navigation/core'
import i18n from 'i18n-js'
import React, { useCallback, useState } from 'react'
import { WebView } from 'react-native-webview'
import { useLanguage } from '../../contexts/LanguageContext'
import { useModal } from '../../contexts/ModalContext'
import { useUser } from '../../contexts/UserContext'
import MercadoPagoApi from '../../services/MercadoPagoApi'
import {
  Banner,
  Button,
  ButtonText,
  Container,
  Description,
  Header,
  Notification,
  Plan,
  PlanArea,
  PlanNumber,
  PlanText,
  Title,
  WebViewCloseButton,
  WebViewContainer,
  WebViewHeader,
  Wrapper
} from './style'
export const Plans: React.FC = () => {
  const { userId } = useUser()
  const { closeModalChoosePlan } = useModal()
  const { language } = useLanguage()

  const isFocused = useIsFocused()

  const [threeMonthIsActive, setThreeMonthIsActive] = useState(false)
  const [sixMonthIsActive, setSixMonthIsActive] = useState(true)
  const [twelveMonthIsActive, setTwelveMonthIsActive] = useState(false)

  const [isOpen, setIsOpen] = useState(false)
  const [url, setUrl] = useState('')

  const activeThreeMonth = () => {
    setThreeMonthIsActive(true)
    setSixMonthIsActive(false)
    setTwelveMonthIsActive(false)
  }

  const activeSixMonth = () => {
    setThreeMonthIsActive(false)
    setSixMonthIsActive(true)
    setTwelveMonthIsActive(false)
  }

  const activeTwelveMonth = () => {
    setThreeMonthIsActive(false)
    setSixMonthIsActive(false)
    setTwelveMonthIsActive(true)
  }

  const monthActive = () => {
    if (threeMonthIsActive) {
      return 3
    } else if (sixMonthIsActive) {
      return 6
    } else {
      return 12
    }
  }

  const handleSale = (month: number) => {
    MercadoPagoApi.createPreference(month, userId).then((res) => {
      setUrl(res.data.body.sandbox_init_point)
      setIsOpen(true)
    })
  }

  useFocusEffect(
    useCallback(() => {
      closeModalChoosePlan()
      return () => closeModalChoosePlan()
    }, [isFocused])
  )

  if (isOpen && url) {
    return (
      <WebViewContainer>
        <WebViewHeader>
          <WebViewCloseButton onPress={() => setIsOpen(false)}>
            <Ionicons name="close" size={28} color="#000" />
          </WebViewCloseButton>
        </WebViewHeader>
        <WebView
          source={{
            uri: url
          }}
        />
      </WebViewContainer>
    )
  }

  i18n.translations = {
    pt: {
      title: 'Contrate um plano para poder publicar',
      description: 'Lorem ipsum',
      months: 'meses',
      button: 'Contratar'
    },
    en: {
      title: 'Hire a plan to be able to publish',
      description: 'Lorem ipsum',
      months: 'months',
      button: 'To hire'
    },
    es: {
      title: 'Contrata un plan para poder publicar',
      description: 'Lorem ipsum',
      months: 'meses',
      button: 'Contratar'
    }
  }

  return (
    <Container>
      <Header>
        <Notification>
          <Ionicons name="notifications-outline" size={22} color="#777d8c" />
        </Notification>
      </Header>
      <Wrapper>
        <Banner
          resizeMode="contain"
          source={require('../../../assets/plans/banner.png')}
        />
        <Title>{i18n.t('title')}</Title>
        <Description>{i18n.t('description')}</Description>
        <PlanArea>
          <Plan isActive={threeMonthIsActive} onPress={activeThreeMonth}>
            <PlanNumber isActive={threeMonthIsActive}>3</PlanNumber>
            <PlanText isActive={threeMonthIsActive}>{i18n.t('months')}</PlanText>
          </Plan>
          <Plan isActive={sixMonthIsActive} onPress={activeSixMonth}>
            <PlanNumber isActive={sixMonthIsActive}>6</PlanNumber>
            <PlanText isActive={sixMonthIsActive}>{i18n.t('months')}</PlanText>
          </Plan>
          <Plan isActive={twelveMonthIsActive} onPress={activeTwelveMonth}>
            <PlanNumber isActive={twelveMonthIsActive}>12</PlanNumber>
            <PlanText isActive={twelveMonthIsActive}>{i18n.t('months')}</PlanText>
          </Plan>
        </PlanArea>
        <Button onPress={() => handleSale(monthActive())}>
          <ButtonText>{i18n.t('button')}</ButtonText>
        </Button>
      </Wrapper>
    </Container>
  )
}

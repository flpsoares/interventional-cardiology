import { Ionicons } from '@expo/vector-icons'
import { useFocusEffect, useIsFocused } from '@react-navigation/core'
import React, { useCallback, useState } from 'react'
import { WebView } from 'react-native-webview'
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
        <Title>Contrate um plano para poder publicar</Title>
        <Description>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod
          bibendum laoreet. Proin gravida dolor sit amet lacus
        </Description>
        <PlanArea>
          <Plan isActive={threeMonthIsActive} onPress={activeThreeMonth}>
            <PlanNumber isActive={threeMonthIsActive}>3</PlanNumber>
            <PlanText isActive={threeMonthIsActive}>meses</PlanText>
          </Plan>
          <Plan isActive={sixMonthIsActive} onPress={activeSixMonth}>
            <PlanNumber isActive={sixMonthIsActive}>6</PlanNumber>
            <PlanText isActive={sixMonthIsActive}>meses</PlanText>
          </Plan>
          <Plan isActive={twelveMonthIsActive} onPress={activeTwelveMonth}>
            <PlanNumber isActive={twelveMonthIsActive}>12</PlanNumber>
            <PlanText isActive={twelveMonthIsActive}>meses</PlanText>
          </Plan>
        </PlanArea>
        <Button onPress={() => handleSale(monthActive())}>
          <ButtonText>Contratar</ButtonText>
        </Button>
      </Wrapper>
    </Container>
  )
}

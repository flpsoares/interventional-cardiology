import React, { useState } from 'react'
import { Text } from 'react-native'
import {
  BackButton,
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
  Wrapper
} from './style'

import { FontAwesome, Ionicons } from '@expo/vector-icons'

export const Plans: React.FC = () => {
  const [threeMonthIsActive, setThreeMonthIsActive] = useState(false)
  const [sixMonthIsActive, setSixMonthIsActive] = useState(true)
  const [twelveMonthIsActive, setTwelveMonthIsActive] = useState(false)

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
      </Wrapper>
      <Button>
        <ButtonText>Contratar</ButtonText>
      </Button>
    </Container>
  )
}

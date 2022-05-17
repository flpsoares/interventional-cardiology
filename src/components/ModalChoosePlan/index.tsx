import React from 'react'
import { Banner, Button, ButtonText, Container, Title, Wrapper } from './style'

import Modal from 'react-native-modal'
import { Text } from 'react-native'
import { useModal } from '../../contexts/ModalContext'
import { useNavigate } from '../../contexts/NavigateContext'

export const ModalChoosePlan: React.FC = () => {
  const { modalChoosePlanIsOpen, closeModalChoosePlan } = useModal()
  const { navigateToPlans } = useNavigate()

  return (
    <Container>
      <Modal
        // onBackdropPress={closeModalChoosePlan}
        animationIn="zoomInUp"
        isVisible={modalChoosePlanIsOpen}
      >
        <Wrapper>
          <Banner source={require('../../../assets/plans/modal_banner.png')} />
          <Title>
            Escolha um plano para que você possa ter acesso as funcionalidades
          </Title>
          <Button onPress={navigateToPlans}>
            <ButtonText>Escolher um plano</ButtonText>
          </Button>
        </Wrapper>
      </Modal>
    </Container>
  )
}

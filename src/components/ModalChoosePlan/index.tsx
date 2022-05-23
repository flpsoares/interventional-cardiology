import React from 'react'
import Modal from 'react-native-modal'
import { useModal } from '../../contexts/ModalContext'
import { useNavigate } from '../../contexts/NavigateContext'
import { Banner, Button, ButtonText, Container, Title, Wrapper } from './style'
export const ModalChoosePlan: React.FC = () => {
  const { modalChoosePlanIsOpen, closeModalChoosePlan } = useModal()
  const { navigateToPlans } = useNavigate()

  const navigate = () => {
    closeModalChoosePlan()
    navigateToPlans()
  }

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
          <Button onPress={navigate}>
            <ButtonText>Escolher um plano</ButtonText>
          </Button>
        </Wrapper>
      </Modal>
    </Container>
  )
}

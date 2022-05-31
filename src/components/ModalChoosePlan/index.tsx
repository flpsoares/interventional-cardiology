import i18n from 'i18n-js'
import React from 'react'
import Modal from 'react-native-modal'
import { useLanguage } from '../../contexts/LanguageContext'
import { useModal } from '../../contexts/ModalContext'
import { useNavigate } from '../../contexts/NavigateContext'
import { Banner, Button, ButtonText, Container, Title, Wrapper } from './style'

export const ModalChoosePlan: React.FC = () => {
  const { modalChoosePlanIsOpen, closeModalChoosePlan } = useModal()
  const { navigateToPlans } = useNavigate()
  const { language } = useLanguage()

  const navigate = () => {
    closeModalChoosePlan()
    navigateToPlans()
  }

  i18n.locale = language

  i18n.translations = {
    pt: {
      message: 'Escolha um plano para que você possa ter acesso as funcionalidades',
      button: 'Escolher um plano'
    },
    en: {
      message: 'Choose a plan so you can access the features',
      button: 'Choose a plan'
    },
    es: {
      message: 'Elija un plan para poder acceder a las funciones',
      button: 'elige un plan'
    }
  }

  return (
    <Container>
      <Modal animationIn="zoomInUp" isVisible={modalChoosePlanIsOpen}>
        <Wrapper>
          <Banner source={require('../../../assets/plans/modal_banner.png')} />
          <Title>{i18n.t('message')}</Title>
          <Button onPress={navigate}>
            <ButtonText>{i18n.t('button')}</ButtonText>
          </Button>
        </Wrapper>
      </Modal>
    </Container>
  )
}

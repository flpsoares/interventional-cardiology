import React, { useState } from 'react'
import { Container, Photo, PhotoQuantity, Wrapper } from './style'

import Modal from 'react-native-modal'
import Carousel from 'react-native-snap-carousel'
import { Dimensions, ImageSourcePropType } from 'react-native'
import { useModal } from '../../contexts/ModalContext'

type Props = {
  data: ImageSourcePropType[]
  quantity: number
  openItem: number
}

export const ModalImage: React.FC<Props> = ({ data, quantity, openItem }) => {
  const { closeModalImage, modalImageIsOpen } = useModal()

  const [activeSlide, setActiveSlide] = useState(openItem)

  const SCREEN_WIDTH = Dimensions.get('window').width
  return (
    <Container>
      <Modal
        animationOut="bounceInDown"
        onBackButtonPress={closeModalImage}
        isVisible={modalImageIsOpen}
        onBackdropPress={closeModalImage}
      >
        <Wrapper>
          <PhotoQuantity>
            {activeSlide + 1} / {quantity}
          </PhotoQuantity>
          <Carousel
            data={data}
            firstItem={openItem}
            renderItem={({ item }) => <Photo source={item} />}
            onSnapToItem={(index) => setActiveSlide(index)}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH - 50}
            layout="default"
          />
        </Wrapper>
      </Modal>
    </Container>
  )
}

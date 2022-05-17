/* eslint-disable indent */
import React, { useRef, useState } from 'react'
import {
  CarouselButton,
  Container,
  Photo,
  PhotoQuantity,
  VideoButton,
  Wrapper
} from './style'
import { StyleSheet, Dimensions } from 'react-native'

import Modal from 'react-native-modal'
import Carousel from 'react-native-snap-carousel'

import { useModal } from '../../contexts/ModalContext'
import { Video } from 'expo-av'

type Props = {
  data: string[]
  quantity: number
  openItem: number
}

export const ModalImage: React.FC<Props> = ({ data, quantity, openItem }) => {
  const { closeModalImage, modalImageIsOpen } = useModal()
  const video = useRef(null)
  const [status, setStatus] = useState({})

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
            onSnapToItem={(index) => setActiveSlide(index)}
            sliderWidth={SCREEN_WIDTH}
            itemWidth={SCREEN_WIDTH - 50}
            layout="default"
            renderItem={({ item }) => (
              <>
                {item.indexOf('.mp4') !== -1 ||
                item.indexOf('.wmv') !== -1 ||
                item.indexOf('.avi') !== -1 ? (
                  <VideoButton>
                    <Video
                      ref={video}
                      style={styles.video}
                      source={{
                        uri: item
                      }}
                      useNativeControls
                      resizeMode="cover"
                      isLooping
                      onPlaybackStatusUpdate={(status) => setStatus(() => status)}
                    />
                  </VideoButton>
                ) : (
                  <Photo
                    resizeMode="contain"
                    source={{
                      uri: item
                    }}
                  />
                )}
              </>
            )}
          />
        </Wrapper>
      </Modal>
    </Container>
  )
}

const styles = StyleSheet.create({
  video: {
    width: '100%',
    height: '100%'
  }
})

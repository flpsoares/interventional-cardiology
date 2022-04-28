import React, { useState } from 'react'
import { Dimensions, SafeAreaView, ScrollView } from 'react-native'
import {
  Banner,
  BannerArea,
  Container,
  Description,
  FirstSupportImage,
  NextButton,
  NextButtonText,
  PaginationArea,
  SecondSupportImage,
  SubTitle,
  Title,
  Wrapper
} from './style'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import carouselData from '../../initialData'
import { primary } from '../../styles/globalCssVar'
import { useNavigate } from '../../contexts/NavigateContext'
import { LanguageDropdown } from '../../components/LanguageDropdown'
import { useLanguage } from '../../contexts/LanguageContext'

const screen = Dimensions.get('screen')

export const Initial: React.FC = () => {
  const { navigateToChooseAuth } = useNavigate()
  const [activeSlide, setActiveSlide] = useState(0)

  const [carousel, setCarousel] = useState<any>()

  const nextItem = () => {
    if (activeSlide !== carouselData.length - 1) {
      carousel.snapToNext()
    } else {
      navigateToChooseAuth()
    }
  }

  const renderCarouselItem = ({ item }: any) => {
    return (
      <Container>
        <SafeAreaView>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <BannerArea>
              <Banner source={item.image} />
              {/* <FirstSupportImage
                source={require('../../../assets/support_02.png')}
              />
              <SecondSupportImage
                source={require('../../../assets/support_01.png')}
              /> */}
            </BannerArea>
            <Wrapper>
              <SubTitle>{item.subTitle}</SubTitle>
              <Title>{item.title}</Title>
              <Description>{item.description}</Description>
            </Wrapper>
          </ScrollView>
        </SafeAreaView>
      </Container>
    )
  }

  return (
    <>
      <LanguageDropdown isOpen={false} />
      <Carousel
        ref={(c) => setCarousel(c)}
        data={carouselData}
        renderItem={renderCarouselItem}
        sliderWidth={screen.width}
        itemWidth={screen.width}
        onSnapToItem={(index) => setActiveSlide(index)}
        layout="default"
      />
      <PaginationArea>
        <NextButton onPress={navigateToChooseAuth}>
          <NextButtonText>Pular</NextButtonText>
        </NextButton>
        <Pagination
          dotsLength={carouselData.length}
          activeDotIndex={activeSlide}
          containerStyle={{ backgroundColor: 'transparent' }}
          dotStyle={{
            width: 12,
            height: 12,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: primary
          }}
          inactiveDotOpacity={0.7}
          inactiveDotScale={0.6}
        />
        <NextButton onPress={nextItem}>
          <NextButtonText>Próximo</NextButtonText>
        </NextButton>
      </PaginationArea>
    </>
  )
}

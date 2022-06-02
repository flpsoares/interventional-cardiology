import i18n from 'i18n-js'
import React, { useState } from 'react'
import { Dimensions, SafeAreaView, ScrollView } from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel'
import { LanguageDropdown } from '../../components/LanguageDropdown'
import { useLanguage } from '../../contexts/LanguageContext'
import { useNavigate } from '../../contexts/NavigateContext'
import { primary } from '../../styles/globalCssVar'
import {
  Banner,
  BannerArea,
  Container,
  Description,
  NextButton,
  NextButtonText,
  PaginationArea,
  SubTitle,
  Title,
  Wrapper
} from './style'

const screen = Dimensions.get('screen')

export const Initial: React.FC = () => {
  const { navigateToChooseAuth } = useNavigate()
  const [activeSlide, setActiveSlide] = useState(0)
  const { language } = useLanguage()

  const [carousel, setCarousel] = useState<any>()

  i18n.translations = {
    pt: {
      subTitleOne: 'Entenda como funciona',
      titleOne: 'Cadastre-se',
      descriptionOne:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor',
      subTitleTwo: 'Entenda como funciona',
      titleTwo: 'Tenha acesso a timeline',
      descriptionTwo:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor',
      skip: 'Pular',
      next: 'Próximo'
    },
    en: {
      subTitleOne: 'Understand how it works',
      titleOne: 'Register',
      descriptionOne:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor',
      subTitleTwo: 'Understand how it works',
      titleTwo: 'Get access to timeline',
      descriptionTwo:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor',
      skip: 'Skip',
      next: 'Next'
    },
    es: {
      subTitleOne: 'Entender cómo funciona',
      titleOne: 'Registro',
      descriptionOne:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor',
      subTitleTwo: 'Entender cómo funciona',
      titleTwo: 'Obtener acceso a la línea de tiempo',
      descriptionTwo:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor',
      skip: 'Saltar',
      next: 'Próximo'
    }
  }

  const nextItem = () => {
    if (activeSlide !== carouselData.length - 1) {
      carousel.snapToNext()
    } else {
      navigateToChooseAuth()
    }
  }

  i18n.locale = language

  const carouselData = [
    {
      id: 1,
      subTitle: i18n.t('subTitleOne'),
      title: i18n.t('titleOne'),
      description: i18n.t('descriptionOne'),
      image: require('../../../assets/initial/banner_01.png')
    },
    {
      id: 1,
      subTitle: i18n.t('subTitleTwo'),
      title: i18n.t('titleTwo'),
      description: i18n.t('descriptionTwo'),
      image: require('../../../assets/initial/banner_02.png')
    }
  ]

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
          <NextButtonText>{i18n.t('skip')}</NextButtonText>
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
          <NextButtonText>{i18n.t('next')}</NextButtonText>
        </NextButton>
      </PaginationArea>
    </>
  )
}

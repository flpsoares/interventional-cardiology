import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useState } from 'react'
import { useLanguage } from '../../contexts/LanguageContext'
import { Container, Image, Item } from './style'

interface LanguageDropdownProps {
  isOpen: boolean
}

export const LanguageDropdown = ({ isOpen }: LanguageDropdownProps) => {
  const { setLanguage, language } = useLanguage()
  const [isActive, setIsActive] = useState(isOpen)

  return (
    <Container
      onPress={() => setIsActive(!isActive)}
      isOpen={isActive}
      isProfile={true}
    >
      {!isActive ? (
        <>
          {language === 'pt' && (
            <Item onPress={() => setIsActive(!isActive)}>
              <Image source={require('../../../assets/language/pt.png')} />
            </Item>
          )}
          {language === 'en' && (
            <Item onPress={() => setIsActive(!isActive)}>
              <Image source={require('../../../assets/language/en.png')} />
            </Item>
          )}
          {language === 'es' && (
            <Item onPress={() => setIsActive(!isActive)}>
              <Image source={require('../../../assets/language/es.png')} />
            </Item>
          )}
        </>
      ) : (
        <>
          {language === 'pt' && (
            <>
              <Item onPress={() => setIsActive(!isActive)}>
                <Image source={require('../../../assets/language/pt.png')} />
              </Item>
              <Item
                onPress={() => {
                  AsyncStorage.setItem('language', 'en')
                  setLanguage('en')
                  setIsActive(false)
                }}
              >
                <Image source={require('../../../assets/language/en.png')} />
              </Item>
              <Item
                onPress={() => {
                  AsyncStorage.setItem('language', 'es')
                  setLanguage('es')
                  setIsActive(false)
                }}
              >
                <Image source={require('../../../assets/language/es.png')} />
              </Item>
            </>
          )}
          {language === 'en' && (
            <>
              <Item onPress={() => setIsActive(!isActive)}>
                <Image source={require('../../../assets/language/en.png')} />
              </Item>
              <Item
                onPress={() => {
                  AsyncStorage.setItem('language', 'pt')
                  setLanguage('pt')
                  setIsActive(false)
                }}
              >
                <Image source={require('../../../assets/language/pt.png')} />
              </Item>
              <Item
                onPress={() => {
                  AsyncStorage.setItem('language', 'es')
                  setLanguage('es')
                  setIsActive(false)
                }}
              >
                <Image source={require('../../../assets/language/es.png')} />
              </Item>
            </>
          )}
          {language === 'es' && (
            <>
              <Item onPress={() => setIsActive(!isActive)}>
                <Image source={require('../../../assets/language/es.png')} />
              </Item>
              <Item
                onPress={() => {
                  AsyncStorage.setItem('language', 'en')
                  setLanguage('en')
                  setIsActive(false)
                }}
              >
                <Image source={require('../../../assets/language/en.png')} />
              </Item>
              <Item
                onPress={() => {
                  AsyncStorage.setItem('language', 'pt')
                  setLanguage('pt')
                  setIsActive(false)
                }}
              >
                <Image source={require('../../../assets/language/pt.png')} />
              </Item>
            </>
          )}
        </>
      )}
    </Container>
  )
}

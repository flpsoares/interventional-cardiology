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
    <Container onPress={() => setIsActive(!isActive)} isOpen={isActive}>
      {!isActive ? (
        <>
          {language === 'pt-br' && (
            <Item onPress={() => setIsActive(!isActive)}>
              <Image source={require('../../../assets/language/pt-br.png')} />
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
          {language === 'pt-br' && (
            <>
              <Item onPress={() => setIsActive(!isActive)}>
                <Image source={require('../../../assets/language/pt-br.png')} />
              </Item>
              <Item
                onPress={() => {
                  setLanguage('en')
                  setIsActive(false)
                }}
              >
                <Image source={require('../../../assets/language/en.png')} />
              </Item>
              <Item
                onPress={() => {
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
                  setLanguage('pt-br')
                  setIsActive(false)
                }}
              >
                <Image source={require('../../../assets/language/pt-br.png')} />
              </Item>
              <Item
                onPress={() => {
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
                  setLanguage('en')
                  setIsActive(false)
                }}
              >
                <Image source={require('../../../assets/language/en.png')} />
              </Item>
              <Item
                onPress={() => {
                  setLanguage('pt-br')
                  setIsActive(false)
                }}
              >
                <Image source={require('../../../assets/language/pt-br.png')} />
              </Item>
            </>
          )}
        </>
      )}
    </Container>
  )
}

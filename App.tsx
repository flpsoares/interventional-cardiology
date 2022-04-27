import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import * as Updates from 'expo-updates'
import { AuthRoutes } from './src/routes/AuthRoutes'
import { Routes } from './src/routes'
import { NavigateProvider } from './src/contexts/NavigateContext'
import { LanguageProvider } from './src/contexts/LanguageContext'
import firebase from './firebase'
import { primary } from './src/styles/globalCssVar'
import { ModalProvider } from './src/contexts/ModalContext'

export default function App() {
  const [user, setUser] = useState<boolean>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(true)
        setIsLoading(false)
      } else {
        setUser(false)
        setIsLoading(false)
      }
    })

    return subscriber
  }, [])

  useEffect(() => {
    const updateApp = async () => {
      const { isAvailable } = await Updates.checkForUpdateAsync()

      if (isAvailable) {
        await Updates.fetchUpdateAsync()

        await Updates.reloadAsync()
      }
    }

    updateApp()
  }, [])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={primary} />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <NavigateProvider>
        <LanguageProvider>
          <ModalProvider>
            <StatusBar barStyle={'dark-content'} backgroundColor="#fff" />
            {user ? <Routes /> : <AuthRoutes />}
          </ModalProvider>
        </LanguageProvider>
      </NavigateProvider>
    </NavigationContainer>
  )
}

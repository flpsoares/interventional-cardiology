import { NavigationContainer } from '@react-navigation/native'
import * as Updates from 'expo-updates'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import firebase from './firebase'
import { LanguageProvider } from './src/contexts/LanguageContext'
import { ModalProvider } from './src/contexts/ModalContext'
import { NavigateProvider } from './src/contexts/NavigateContext'
import { NotificationProvider } from './src/contexts/NotificationContext'
import { UserProvider } from './src/contexts/UserContext'
import { Routes } from './src/routes'
import { AuthRoutes } from './src/routes/AuthRoutes'
import { primary } from './src/styles/globalCssVar'

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
            <UserProvider>
              <NotificationProvider>
                <StatusBar barStyle={'dark-content'} backgroundColor="#fff" />
                {user ? <Routes /> : <AuthRoutes />}
              </NotificationProvider>
            </UserProvider>
          </ModalProvider>
        </LanguageProvider>
      </NavigateProvider>
    </NavigationContainer>
  )
}

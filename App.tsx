import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { ActivityIndicator, StatusBar, View } from 'react-native'
import * as Updates from 'expo-updates'
import { AuthRoutes } from './src/routes/AuthRoutes'
import { Routes } from './src/routes'
import { NavigateProvider } from './src/contexts/NavigateContext'
import { LanguageProvider } from './src/contexts/LanguageContext'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { primary } from './src/styles/globalCssVar'

export default function App() {
  const [user, setUser] = useState<boolean>()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, (user) => {
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
          <StatusBar barStyle={'dark-content'} backgroundColor="#fff" />
          {user ? <Routes /> : <AuthRoutes />}
        </LanguageProvider>
      </NavigateProvider>
    </NavigationContainer>
  )
}

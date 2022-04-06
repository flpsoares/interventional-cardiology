import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import * as Updates from 'expo-updates'
import { AuthRoutes } from './src/routes/AuthRoutes'
import { NavigateProvider } from './src/contexts/NavigateContext'

import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { Timeline } from './src/pages/Timeline'
import { Routes } from './src/routes'

export default function App() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null)

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(setUser)

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

  return (
    <NavigationContainer>
      <NavigateProvider>
        <StatusBar barStyle={'dark-content'} backgroundColor="#F2F2F2" />
        {user ? <Routes /> : <AuthRoutes />}
      </NavigateProvider>
    </NavigationContainer>
  )
}

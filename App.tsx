import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'react-native'
import * as Updates from 'expo-updates'
import { AuthRoutes } from './src/routes/AuthRoutes'
import { NavigateProvider } from './src/contexts/NavigateContext'

export default function App() {
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
        <AuthRoutes />
      </NavigateProvider>
    </NavigationContainer>
  )
}

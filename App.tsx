import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
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
        <StatusBar style="auto" />
        <AuthRoutes />
      </NavigateProvider>
    </NavigationContainer>
  )
}

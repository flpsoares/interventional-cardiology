import AsyncStorage from '@react-native-async-storage/async-storage'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { ChooseAuth } from '../pages/ChooseAuth'
import { Initial } from '../pages/Initial'
import { Login } from '../pages/Login'
import { Register } from '../pages/Register'

const Stack = createNativeStackNavigator()

export const AuthRoutes: React.FC = () => {
  const { setLanguage } = useLanguage()

  useEffect(() => {
    const verifyLanguage = () => {
      const lang = AsyncStorage.getItem('language')
      lang.then((res) => setLanguage(res))
    }
    verifyLanguage()
  }, [])

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ChooseAuth"
        component={ChooseAuth}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Initial"
        component={Initial}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

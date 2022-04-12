import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { createContext, useContext, ReactNode } from 'react'
import { RootStackParamsList } from '../routes/RootStackParamsList'

type LoginScreenProps = NativeStackNavigationProp<RootStackParamsList, 'Login'>
type RegisterScreenProps = NativeStackNavigationProp<RootStackParamsList, 'Register'>
type TimelineScreenProps = NativeStackNavigationProp<RootStackParamsList, 'Timeline'>

interface NavigateContextData {
  navigateToLogin: () => void
  navigateToRegister: () => void
  navigateToTimeline: () => void
}

interface NavigateProviderProps {
  children: ReactNode
}

export const NavigateContext = createContext({} as NavigateContextData)

export const NavigateProvider = ({ children }: NavigateProviderProps) => {
  const navigationLogin = useNavigation<LoginScreenProps>()
  const navigationRegister = useNavigation<RegisterScreenProps>()
  const navigationTimeline = useNavigation<TimelineScreenProps>()

  const navigateToLogin = () => {
    navigationLogin.navigate('Login')
  }
  const navigateToRegister = () => {
    navigationRegister.navigate('Register')
  }
  const navigateToTimeline = () => {
    navigationTimeline.navigate('Timeline')
  }

  return (
    <NavigateContext.Provider
      value={{
        navigateToLogin,
        navigateToRegister,
        navigateToTimeline
      }}
    >
      {children}
    </NavigateContext.Provider>
  )
}

export const useNavigate = () => {
  return useContext(NavigateContext)
}

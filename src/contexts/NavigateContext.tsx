import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { createContext, useContext, ReactNode } from 'react'
import { RootStackParamsList } from '../routes/RootStackParamsList'

type LoginScreenProps = NativeStackNavigationProp<RootStackParamsList, 'Login'>
type RegisterScreenProps = NativeStackNavigationProp<RootStackParamsList, 'Register'>
type HomeScreenProps = NativeStackNavigationProp<RootStackParamsList, 'Home'>
type PostDetailsScreenProps = NativeStackNavigationProp<
  RootStackParamsList,
  'PostDetails'
>

interface NavigateContextData {
  navigateToLogin: () => void
  navigateToRegister: () => void
  navigateToHome: () => void
  navigateToPostDetails: () => void
}

interface NavigateProviderProps {
  children: ReactNode
}

export const NavigateContext = createContext({} as NavigateContextData)

export const NavigateProvider = ({ children }: NavigateProviderProps) => {
  const navigationLogin = useNavigation<LoginScreenProps>()
  const navigationRegister = useNavigation<RegisterScreenProps>()
  const navigationHome = useNavigation<HomeScreenProps>()
  const navigationPostDetails = useNavigation<PostDetailsScreenProps>()

  const navigateToLogin = () => {
    navigationLogin.navigate('Login')
  }
  const navigateToRegister = () => {
    navigationRegister.navigate('Register')
  }
  const navigateToHome = () => {
    navigationHome.navigate('Home')
  }
  const navigateToPostDetails = () => {
    navigationPostDetails.navigate('PostDetails')
  }

  return (
    <NavigateContext.Provider
      value={{
        navigateToLogin,
        navigateToRegister,
        navigateToHome,
        navigateToPostDetails
      }}
    >
      {children}
    </NavigateContext.Provider>
  )
}

export const useNavigate = () => {
  return useContext(NavigateContext)
}

import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { createContext, useContext, ReactNode } from 'react'
import { RootStackParamsList } from '../routes/RootStackParamsList'

type LoginScreenProps = NativeStackNavigationProp<RootStackParamsList, 'Login'>
type RegisterScreenProps = NativeStackNavigationProp<RootStackParamsList, 'Register'>
type ChooseAuthScreenProps = NativeStackNavigationProp<
  RootStackParamsList,
  'ChooseAuth'
>
type HomeScreenProps = NativeStackNavigationProp<RootStackParamsList, 'Home'>
type PostDetailsScreenProps = NativeStackNavigationProp<
  RootStackParamsList,
  'PostDetails'
>
type EditAccountScreenProps = NativeStackNavigationProp<
  RootStackParamsList,
  'EditAccount'
>

type PublishScreenProps = NativeStackNavigationProp<
  RootStackParamsList,
  'PublishTwo'
>

interface NavigateContextData {
  navigateToLogin: () => void
  navigateToRegister: () => void
  navigateToChooseAuth: () => void
  navigateToHome: () => void
  navigateToPostDetails: () => void
  navigateToEditAccount: () => void
  editAccountGoBack: () => void
  navigateToPublish: () => void
  publishGoBack: () => void
}

interface NavigateProviderProps {
  children: ReactNode
}

export const NavigateContext = createContext({} as NavigateContextData)

export const NavigateProvider = ({ children }: NavigateProviderProps) => {
  const navigationLogin = useNavigation<LoginScreenProps>()
  const navigationRegister = useNavigation<RegisterScreenProps>()
  const navigationChooseAuth = useNavigation<ChooseAuthScreenProps>()
  const navigationHome = useNavigation<HomeScreenProps>()
  const navigationPostDetails = useNavigation<PostDetailsScreenProps>()
  const navigationEditAccount = useNavigation<EditAccountScreenProps>()
  const navigationPublish = useNavigation<PublishScreenProps>()

  const navigateToLogin = () => {
    navigationLogin.navigate('Login')
  }
  const navigateToRegister = () => {
    navigationRegister.navigate('Register')
  }
  const navigateToChooseAuth = () => {
    navigationChooseAuth.navigate('ChooseAuth')
  }
  const navigateToHome = () => {
    navigationHome.navigate('Home')
  }
  const navigateToPostDetails = () => {
    navigationPostDetails.navigate('PostDetails')
  }
  const navigateToEditAccount = () => {
    navigationEditAccount.navigate('EditAccount')
  }
  const navigateToPublish = () => {
    navigationPublish.navigate('PublishTwo')
  }

  const editAccountGoBack = () => {
    navigationEditAccount.goBack()
  }
  const publishGoBack = () => {
    navigationPublish.goBack()
  }

  return (
    <NavigateContext.Provider
      value={{
        navigateToLogin,
        navigateToRegister,
        navigateToHome,
        navigateToPostDetails,
        navigateToEditAccount,
        editAccountGoBack,
        navigateToPublish,
        publishGoBack,
        navigateToChooseAuth
      }}
    >
      {children}
    </NavigateContext.Provider>
  )
}

export const useNavigate = () => {
  return useContext(NavigateContext)
}

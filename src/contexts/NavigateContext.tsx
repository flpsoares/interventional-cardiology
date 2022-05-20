import { useNavigation } from '@react-navigation/core'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { createContext, ReactNode, useContext } from 'react'
import { RootStackParamsList } from '../routes/RootStackParamsList'

type InitialScreenProps = NativeStackNavigationProp<RootStackParamsList, 'Initial'>
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
type UserProfileScreenProps = NativeStackNavigationProp<
  RootStackParamsList,
  'UserProfile'
>

type PublishScreenProps = NativeStackNavigationProp<
  RootStackParamsList,
  'PublishTwo'
>

type PlansScreenProps = NativeStackNavigationProp<RootStackParamsList, 'Plans'>

interface NavigateContextData {
  navigateToInitial: () => void
  navigateToLogin: () => void
  navigateToRegister: () => void
  navigateToChooseAuth: () => void
  navigateToHome: () => void
  navigateToHomeWithReset: () => void
  navigateToPostDetails: (postId: string) => void
  navigateToEditAccount: () => void
  navigateToUserProfile: (id: string) => void
  editAccountGoBack: () => void
  navigateToPublish: (
    area: string[],
    genero: string,
    idade: string,
    sintoma: string[],
    comorbidades: string[],
    medicamentos: string[]
  ) => void
  publishGoBack: () => void
  navigateToPlans: () => void
}

interface NavigateProviderProps {
  children: ReactNode
}

export const NavigateContext = createContext({} as NavigateContextData)

export const NavigateProvider = ({ children }: NavigateProviderProps) => {
  const navigationInitial = useNavigation<InitialScreenProps>()
  const navigationLogin = useNavigation<LoginScreenProps>()
  const navigationRegister = useNavigation<RegisterScreenProps>()
  const navigationChooseAuth = useNavigation<ChooseAuthScreenProps>()
  const navigationHome = useNavigation<HomeScreenProps>()
  const navigationPostDetails = useNavigation<PostDetailsScreenProps>()
  const navigationEditAccount = useNavigation<EditAccountScreenProps>()
  const navigationPublish = useNavigation<PublishScreenProps>()
  const navigationPlans = useNavigation<PlansScreenProps>()
  const navigationUserProfile = useNavigation<UserProfileScreenProps>()

  const navigateToInitial = () => {
    navigationInitial.navigate('Initial')
  }
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
  const navigateToPlans = () => {
    navigationPlans.navigate('Plans')
  }
  const navigateToUserProfile = (id: string) => {
    navigationUserProfile.navigate('UserProfile', { id })
  }

  const navigateToHomeWithReset = () => {
    navigationHome.reset({
      index: 0,
      routes: [{ name: 'Home' }]
    })
  }

  const navigateToPostDetails = (postId: string) => {
    navigationPostDetails.navigate('PostDetails', { postId })
  }
  const navigateToEditAccount = () => {
    navigationEditAccount.navigate('EditAccount')
  }
  const navigateToPublish = (
    area: string[],
    genero: string,
    idade: string,
    sintoma: string[],
    comorbidades: string[],
    medicamentos: string[]
  ) => {
    navigationPublish.navigate('PublishTwo', {
      area,
      genero,
      idade,
      sintoma,
      comorbidades,
      medicamentos
    })
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
        navigateToChooseAuth,
        navigateToInitial,
        navigateToHomeWithReset,
        navigateToPlans,
        navigateToUserProfile
      }}
    >
      {children}
    </NavigateContext.Provider>
  )
}

export const useNavigate = () => {
  return useContext(NavigateContext)
}

import { Entypo, FontAwesome, Foundation } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Constants from 'expo-constants'
import * as Notifications from 'expo-notifications'
import I18n from 'i18n-js'
import moment from 'moment'
import 'moment-timezone'
import React, { useEffect, useRef, useState } from 'react'
import { ActivityIndicator, Alert, Platform, View } from 'react-native'
import app, { database } from '../../firebase'
import { PublishButton } from '../components/PublishButton'
import { useLanguage } from '../contexts/LanguageContext'
import { useUser } from '../contexts/UserContext'
import { Favorites } from '../pages/Favorites'
import { Plans } from '../pages/Plans'
import { primary, secondary } from '../styles/globalCssVar'
import { AccountStackRoutes } from './accountStackRoutes'
import { HomeStackRoutes } from './homeStackRoutes'
import { PublishStackRoutes } from './publishStackRoutes'
const Tab = createBottomTabNavigator()

export const Routes: React.FC = () => {
  const { setUser, user, setUserId, setIsSubscriber } = useUser()
  const { language } = useLanguage()

  const [isLoading, setIsLoading] = useState(true)

  const [notification, setNotification] = useState<Notifications.Notification>()
  const notificationListener = useRef<any>()
  const responseListener = useRef<any>()

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false
    })
  })

  useEffect(() => {
    registerForPushNotificationsAsync()
      .then(async (token) => {
        if (token) {
          database.collection('users').doc(app.auth().currentUser!.uid).set(
            {
              notificationToken: token
            },
            { merge: true }
          )
        }
      })
      .catch((error) => {
        console.log(error)
        Alert.alert('Aviso', error)
      })

    if (notificationListener) {
      notificationListener.current = Notifications.addNotificationReceivedListener(
        (notification) => {
          setNotification(notification)
        }
      )
    }

    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        // console.log(response)
      }
    )

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current)
      Notifications.removeNotificationSubscription(responseListener.current)
    }
  }, [])

  async function registerForPushNotificationsAsync() {
    let token
    if (Constants.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync()
      let finalStatus = existingStatus
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!')
        return
      }
      token = (await Notifications.getExpoPushTokenAsync()).data
    } else {
      // alert('Must use physical device for Push Notifications')
    }

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C'
      })
    }

    return token
  }

  const tabBarListeners = ({ navigation, route }: any) => ({
    tabPress: () => navigation.navigate(route.name)
  })

  useEffect(() => {
    setUserId(app.auth().currentUser!.uid)
    const subscribe = database
      .collection('users')
      .doc(app.auth().currentUser!.uid)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.data()
        setUser({
          name: data?.name,
          email: data?.email,
          telephone: data?.telephone,
          isDoctor: data?.isDoctor,
          crm: data?.crm,
          institution: data?.institution,
          isSubscriber: data?.isSubscriber,
          userPhoto: data?.userPhoto,
          dataCriacao: data?.dataCriacao
        })
      })
    return () => {
      subscribe()
    }
  }, [])

  useEffect(() => {
    if (user !== undefined) {
      setIsSubscriber(user.isSubscriber)
      database
        .collection('/users')
        .doc(app.auth().currentUser!.uid)
        .onSnapshot((querySnapshot) => {
          const expiration_date = querySnapshot.data()?.expiration_date
          const dateNow = moment().tz('America/Sao_Paulo')
          const isExpirated = moment(expiration_date).diff(dateNow, 'days') < 0
          if (isExpirated) {
            database
              .collection('/users')
              .doc(app.auth().currentUser!.uid)
              .set({ isSubscriber: false }, { merge: true })
          }
        })
      setIsLoading(false)
    }
  }, [user])

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={primary} />
      </View>
    )
  }

  I18n.locale = language

  I18n.translations = {
    pt: {
      home: 'Início',
      plans: 'Planos',
      favorites: 'Favoritos',
      account: 'Conta'
    },
    en: {
      home: 'Home',
      plans: 'Plans',
      favorites: 'Favorites',
      account: 'Account'
    },
    es: {
      home: 'Comienzo',
      plans: 'Planes',
      favorites: 'Favoritos',
      account: 'Cuenta'
    }
  }

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          borderTopColor: 'rgba(121, 121, 121, 0.2)',
          borderTopWidth: 1,
          paddingBottom: 5,
          paddingTop: 5
        },
        tabBarActiveTintColor: secondary,
        tabBarInactiveTintColor: '#596988'
      }}
    >
      <Tab.Screen
        name="HomeStackRoutes"
        component={HomeStackRoutes}
        options={{
          tabBarLabel: I18n.t('home'),
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Foundation name="home" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="Plans"
        component={Plans}
        options={{
          tabBarLabel: I18n.t('plans'),
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="cube" size={size} color={color} />
          )
        }}
      />
      {user?.isDoctor && (
        <Tab.Screen
          name="PublishStackRoutes"
          component={PublishStackRoutes}
          listeners={tabBarListeners}
          options={{
            tabBarLabel: '',
            headerShown: false,
            tabBarIcon: () => <PublishButton />
          }}
        />
      )}
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={{
          tabBarLabel: I18n.t('favorites'),
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <Entypo name="heart" size={size} color={color} />
          )
        }}
      />
      <Tab.Screen
        name="AccountStackRoutes"
        component={AccountStackRoutes}
        options={{
          tabBarLabel: I18n.t('account'),
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="user" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

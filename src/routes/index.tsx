import React, { useEffect, useRef, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Plans } from '../pages/Plans'
import { Favorites } from '../pages/Favorites'
import { secondary } from '../styles/globalCssVar'

import { Foundation, FontAwesome, Entypo } from '@expo/vector-icons'
import { PublishButton } from '../components/PublishButton'
import { HomeStackRoutes } from './homeStackRoutes'
import { AccountStackRoutes } from './accountStackRoutes'
import { PublishStackRoutes } from './publishStackRoutes'
import app, { database } from '../../firebase'
import { useUser } from '../contexts/UserContext'
import * as Notifications from 'expo-notifications'
import { Alert, Platform } from 'react-native'
import Constants from 'expo-constants'

const Tab = createBottomTabNavigator()

export const Routes: React.FC = () => {
  const { setUser, user } = useUser()

  // const [notification, setNotification] = useState<Notifications.Notification>()
  // const notificationListener = useRef<any>()
  // const responseListener = useRef<any>()

  // Notifications.setNotificationHandler({
  //   handleNotification: async () => ({
  //     shouldShowAlert: true,
  //     shouldPlaySound: false,
  //     shouldSetBadge: false
  //   })
  // })

  // useEffect(() => {
  //   registerForPushNotificationsAsync()
  //     .then(async (token) => {
  //       if (token) {
  //         database.collection('users').doc(app.auth().currentUser!.uid).set(
  //           {
  //             notificationToken: token
  //           },
  //           { merge: true }
  //         )
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error)
  //       Alert.alert('Aviso', error)
  //     })

  //   if (notificationListener) {
  //     notificationListener.current = Notifications.addNotificationReceivedListener(
  //       (notification) => {
  //         setNotification(notification)
  //       }
  //     )
  //   }

  //   responseListener.current = Notifications.addNotificationResponseReceivedListener(
  //     (response) => {
  //       // console.log(response)
  //     }
  //   )

  //   return () => {
  //     Notifications.removeNotificationSubscription(notificationListener.current)
  //     Notifications.removeNotificationSubscription(responseListener.current)
  //   }
  // }, [])

  // async function registerForPushNotificationsAsync() {
  //   let token
  //   if (Constants.isDevice) {
  //     const { status: existingStatus } = await Notifications.getPermissionsAsync()
  //     let finalStatus = existingStatus
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Notifications.requestPermissionsAsync()
  //       finalStatus = status
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!')
  //       return
  //     }
  //     token = (await Notifications.getExpoPushTokenAsync()).data
  //   } else {
  //     alert('Must use physical device for Push Notifications')
  //   }

  //   if (Platform.OS === 'android') {
  //     Notifications.setNotificationChannelAsync('default', {
  //       name: 'default',
  //       importance: Notifications.AndroidImportance.MAX,
  //       vibrationPattern: [0, 250, 250, 250],
  //       lightColor: '#FF231F7C'
  //     })
  //   }

  //   return token
  // }

  useEffect(() => {
    const subscribe = database
      .collection('users')
      .doc(app.auth().currentUser!.uid)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.data()
        setUser({
          name: data!.name,
          email: data!.email,
          telephone: data!.telephone,
          isDoctor: data!.isDoctor,
          crm: data!.crm,
          institution: data!.institution,
          isSubscriber: data!.isSubscriber
        })
      })

    return () => {
      subscribe()
    }
  }, [])

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
          tabBarLabel: 'Home',
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
          tabBarLabel: 'Planos',
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
          tabBarLabel: 'Favoritos',
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
          tabBarLabel: 'Conta',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="user" size={size} color={color} />
          )
        }}
      />
    </Tab.Navigator>
  )
}

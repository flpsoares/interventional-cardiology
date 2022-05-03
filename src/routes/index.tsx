import React, { useEffect } from 'react'
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

const Tab = createBottomTabNavigator()

export const Routes: React.FC = () => {
  const { setUser } = useUser()

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
      <Tab.Screen
        name="PublishStackRoutes"
        component={PublishStackRoutes}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: () => <PublishButton />
        }}
      />
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

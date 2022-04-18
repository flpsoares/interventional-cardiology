import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home } from '../pages/Home'
import { Plans } from '../pages/Plans'
import { Publish } from '../pages/Publish'
import { Account } from '../pages/Account'
import { Favorites } from '../pages/Favorites'
import { secondary } from '../styles/globalCssVar'

import { Foundation, FontAwesome, Entypo } from '@expo/vector-icons'
import { PublishButton } from '../components/PublishButton'

const Tab = createBottomTabNavigator()

export const Routes: React.FC = () => {
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
        name="Home"
        component={Home}
        options={{
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
        name="Publish"
        component={Publish}
        options={{
          tabBarLabel: '',
          headerShown: false,
          tabBarIcon: () => <PublishButton />
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Conta',
          headerShown: false,
          tabBarIcon: ({ size, color }) => (
            <FontAwesome name="user" size={size} color={color} />
          )
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
    </Tab.Navigator>
  )
}

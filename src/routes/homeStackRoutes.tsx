import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Home } from '../pages/Home'
import { PostDetails } from '../pages/PostDetails'
import { UserProfile } from '../pages/UserProfile'

const Stack = createNativeStackNavigator()

export const HomeStackRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen
        name="PostDetails"
        component={PostDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="UserProfile"
        component={UserProfile}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

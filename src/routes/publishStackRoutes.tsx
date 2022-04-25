import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { PublishOne } from '../pages/PublishOne'
import { PublishTwo } from '../pages/PublishTwo'

const Stack = createNativeStackNavigator()

export const PublishStackRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PublishOne"
        component={PublishOne}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PublishTwo"
        component={PublishTwo}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

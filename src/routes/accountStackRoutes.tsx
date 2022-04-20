import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Account } from '../pages/Account'
import { EditAccount } from '../pages/EditAccount'

const Stack = createNativeStackNavigator()

export const AccountStackRoutes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Account"
        component={Account}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditAccount"
        component={EditAccount}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

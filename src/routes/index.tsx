import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Timeline } from '../pages/Timeline'

const Stack = createNativeStackNavigator()

export const Routes: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Timeline"
        component={Timeline}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

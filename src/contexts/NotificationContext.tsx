import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Notifications from 'expo-notifications'
import firebase from 'firebase'
import moment from 'moment'
import 'moment-timezone'
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from 'react'
import { database } from '../../firebase'

interface NotificationContextData {
  expoPushToken: string | null
  setExpoPushToken: React.Dispatch<React.SetStateAction<string | null>>
  sendLocalNotification: (title: string, body: string) => void
  sendRemoteNotification: (title: string, body: string, token: string) => void
}

interface NotificationProviderProps {
  children: ReactNode
}

export const NotificationContext = createContext({} as NotificationContextData)

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [expoPushToken, setExpoPushToken] = useState<string | null>('')

  const getToken = async () => {
    const token = await AsyncStorage.getItem('@ExpoPushToken')
    setExpoPushToken(token)
  }

  useEffect(() => {
    getToken()
  }, [])

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false
    })
  })

  const sendLocalNotification = async (title: string, body: string) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title,
        body,
        data: { data: 'goes here' }
      },
      trigger: { seconds: 2 }
    })
  }

  const sendRemoteNotification = async (
    title: string,
    body: string,
    token: string
  ) => {
    const message = {
      to: token,
      sound: 'default',
      title,
      body
    }

    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(message)
    })

    database
      .collection('/users')
      .where('notificationToken', '==', token)
      .get()
      .then((res) => {
        if (!res.empty) {
          database
            .collection(`/users/${res.docs[0].id}/notifications`)
            .add({
              title,
              message: body,
              dataCriacao: firebase.firestore.FieldValue.serverTimestamp(),
              dataExibicao: moment().tz('America/Sao_Paulo').format('DD/MM/YYYY')
            })
            .catch((e) => console.log(e))
        }
      })
  }

  return (
    <NotificationContext.Provider
      value={{
        expoPushToken,
        setExpoPushToken,
        sendLocalNotification,
        sendRemoteNotification
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  return useContext(NotificationContext)
}

import React, { useEffect, useState } from 'react'
import { Modalize } from 'react-native-modalize'
import { database } from '../../../firebase'
import { useModal } from '../../contexts/ModalContext'
import { useUser } from '../../contexts/UserContext'
import { NotificationItem } from '../NotificationItem'

export const ModalNotifications: React.FC = () => {
  const { userId } = useUser()
  const { modalizeRef } = useModal()
  const [notification, setNotifications] = useState<App.Notification[]>()

  useEffect(() => {
    database
      .collection(`/users/${userId}/notifications`)
      .onSnapshot((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => {
          return { id: doc.id, ...doc.data() }
        }) as any
        setNotifications(data)
      })
  }, [])

  return (
    <Modalize ref={modalizeRef} snapPoint={500}>
      {notification?.map((notification, index) => {
        return (
          <NotificationItem
            key={index}
            title={notification.title}
            message={notification.message}
            data={notification.dataExibicao}
            id={notification.id!}
          />
        )
      })}
    </Modalize>
  )
}

import { AntDesign } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { database } from '../../../firebase'
import { useUser } from '../../contexts/UserContext'
import { Container, Left, Text } from './style'

interface NotificationItemProps {
  title: string
  message: string
  data: string
  id: string
}

export const NotificationItem: React.FC<NotificationItemProps> = ({
  title,
  message,
  data,
  id
}) => {
  const { userId } = useUser()

  const deleteNotification = () => {
    database
      .collection(`/users/${userId}/notifications`)
      .doc(id)
      .delete()
      .catch((e) => console.log(e))
  }

  return (
    <Container>
      <Left>
        <Text numberOfLines={1}>{title}</Text>
        <Text numberOfLines={1}>{message}</Text>
        <Text numberOfLines={1}>{data}</Text>
      </Left>
      <TouchableOpacity onPress={deleteNotification}>
        <AntDesign name="delete" color="#8b0003" size={28} />
      </TouchableOpacity>
    </Container>
  )
}

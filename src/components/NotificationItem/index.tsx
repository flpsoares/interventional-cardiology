import React from 'react'
import { database } from '../../../firebase'
import { useUser } from '../../contexts/UserContext'
import { Button, ButtonText, Container, Left, Text } from './style'

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
      <Button onPress={deleteNotification}>
        <ButtonText>Excluir</ButtonText>
      </Button>
    </Container>
  )
}

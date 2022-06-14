import React, { useState } from 'react'
import { Modalize } from 'react-native-modalize'
import { useModal } from '../../contexts/ModalContext'
import { Button, ButtonText, Container, Icon, Input, InputItem } from './style'

import { FontAwesome } from '@expo/vector-icons'
import I18n from 'i18n-js'
import { Alert } from 'react-native'
import app from '../../../firebase'

export const ModalPassword: React.FC = () => {
  const { modalizePasswordRef } = useModal()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  I18n.translations = {
    pt: {
      error: 'Erro',
      sixDigits: 'A senha deve conter pelo menos 6 dígitos',
      samePassword: 'As senhas devem ser iguais',
      success: 'Sucesso',
      successMessage: 'Senha alterada com sucesso',
      sensitive:
        'Essa é uma operação sensível, por favor, faça login novamente para poder realizá-la',
      firstPlaceholder: 'Nova senha',
      secondPlaceholder: 'Confirme a nova senha',
      button: 'Alterar senha'
    },
    en: {
      error: 'Error',
      sixDigits: 'The password must contain at least 6 digits',
      samePassword: 'Passwords must be the same',
      success: 'Success',
      successMessage: 'Password changed successfully',
      sensitive:
        'This is a sensitive operation, please login again to be able to perform it',
      firstPlaceholder: 'New password',
      secondPlaceholder: 'Confirm the new password',
      button: 'Change password'
    },
    es: {
      error: 'Error',
      sixDigits: 'La contraseña debe contener al menos 6 dígitos',
      samePassword: 'Las contraseñas deben ser las mismas',
      success: 'Éxito',
      successMessage: 'Contraseña alterada con éxito',
      sensitive:
        'Esta es una operación delicada, vuelva a iniciar sesión para poder realizarla',
      firstPlaceholder: 'Nueva contraseña',
      secondPlaceholder: 'Confirmar la nueva contraseña',
      button: 'Cambiar contraseña'
    }
  }

  const error = I18n.t('error')
  const sixDigits = I18n.t('sixDigits')
  const samePassword = I18n.t('samePassword')
  const success = I18n.t('success')
  const successMessage = I18n.t('successMessage')
  const sensitive = I18n.t('sensitive')

  const changePassword = () => {
    if (password.length < 6) {
      return Alert.alert(error, sixDigits)
    }

    if (password !== confirmPassword) {
      return Alert.alert(error, samePassword)
    }

    app
      .auth()
      .currentUser?.updatePassword(password)
      .then(() => {
        Alert.alert(success, successMessage)
        setPassword('')
        setConfirmPassword('')
      })
      .catch((e) => {
        if (e.code === 'auth/requires-recent-login') {
          return Alert.alert(error, sensitive)
        }
      })
  }
  return (
    <Modalize ref={modalizePasswordRef} snapPoint={350}>
      <Container>
        <InputItem style={{ elevation: 10 }}>
          <Icon>
            <FontAwesome name="user-o" size={28} color="rgba(77, 86, 109, 0.46)" />
          </Icon>
          <Input
            placeholder={I18n.t('firstPlaceholder')}
            onChangeText={setPassword}
            value={password}
          />
        </InputItem>
        <InputItem style={{ elevation: 10 }}>
          <Icon>
            <FontAwesome name="user-o" size={28} color="rgba(77, 86, 109, 0.46)" />
          </Icon>
          <Input
            placeholder={I18n.t('secondPlaceholder')}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
          />
        </InputItem>
        <Button onPress={changePassword}>
          <ButtonText>{I18n.t('button')}</ButtonText>
        </Button>
      </Container>
    </Modalize>
  )
}

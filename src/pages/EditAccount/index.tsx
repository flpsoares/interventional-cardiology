import React, { useState } from 'react'
import {
  BackButton,
  Button,
  ButtonText,
  Container,
  Date,
  EditButton,
  Header,
  Icon,
  Info,
  Input,
  InputItem,
  Name,
  Notification,
  PasswordIcon,
  Title,
  UserPhoto,
  UserPhotoArea,
  Wrapper
} from './style'

import { useNavigate } from '../../contexts/NavigateContext'

import {
  FontAwesome,
  Ionicons,
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
  Foundation
} from '@expo/vector-icons'

export const EditAccount: React.FC = () => {
  const { editAccountGoBack } = useNavigate()

  const [passwordIsHide, setPasswordIsHide] = useState(true)
  const toggleHidePassword = () => setPasswordIsHide(!passwordIsHide)

  return (
    <Container>
      <Header>
        <BackButton onPress={editAccountGoBack}>
          <FontAwesome name="arrow-left" size={24} color="#777d8c" />
        </BackButton>
        <Notification>
          <Ionicons name="notifications-outline" size={22} color="#777d8c" />
        </Notification>
      </Header>
      <UserPhotoArea>
        <UserPhoto source={require('../../../assets/default-user.png')} />
        <EditButton>
          <MaterialIcons name="edit" size={24} color="#fff" />
        </EditButton>
      </UserPhotoArea>
      <Info>
        <Name>Felipe Bruno</Name>
        <Date>Cadastrado em 22/03/2021</Date>
      </Info>
      <Wrapper>
        <Title>Edite seus dados</Title>
        <InputItem style={{ elevation: 10 }}>
          <Icon>
            <FontAwesome name="user-o" size={28} color="rgba(77, 86, 109, 0.46)" />
          </Icon>
          <Input value="Felipe Bruno" />
        </InputItem>
        <InputItem style={{ elevation: 10 }}>
          <Icon>
            <AntDesign name="idcard" size={28} color="rgba(77, 86, 109, 0.46)" />
          </Icon>
          <Input value="443.443.234-45" />
        </InputItem>
        <InputItem style={{ elevation: 10 }}>
          <Icon>
            <MaterialCommunityIcons
              name="email-open-outline"
              size={28}
              color="rgba(77, 86, 109, 0.46)"
            />
          </Icon>
          <Input value="email@email.com" />
        </InputItem>
        <InputItem style={{ elevation: 10 }}>
          <Icon>
            <Foundation name="telephone" size={28} color="rgba(77, 86, 109, 0.46)" />
          </Icon>
          <Input value="11 9 2833-4421" />
        </InputItem>
        <InputItem style={{ elevation: 10 }}>
          <Icon>
            <FontAwesome name="key" size={28} color="rgba(77, 86, 109, 0.46)" />
          </Icon>
          <Input placeholder="Alterar Senha" secureTextEntry={passwordIsHide} />
          <PasswordIcon onPress={toggleHidePassword}>
            {passwordIsHide ? (
              <FontAwesome name="eye" size={28} color="rgba(77, 86, 109, 0.46)" />
            ) : (
              <FontAwesome
                name="eye-slash"
                size={28}
                color="rgba(77, 86, 109, 0.46)"
              />
            )}
          </PasswordIcon>
        </InputItem>
        <Button>
          <ButtonText>Atualizar Dados</ButtonText>
        </Button>
      </Wrapper>
    </Container>
  )
}

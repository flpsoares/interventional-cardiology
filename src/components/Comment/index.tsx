import React from 'react'
import { CommentProp } from '../../commentData'

import {
  Button,
  ButtonArea,
  ButtonText,
  Container,
  Content,
  Date,
  Info,
  Name,
  Text,
  UserPhoto,
  Wrapper
} from './style'

type Props = {
  data: App.Comment
}

export const Comment: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      <UserPhoto source={require('../../../assets/default-user.png')} />
      <Wrapper>
        <Content>
          <Info>
            <Name>{data.autorNome}</Name>
            {/* <Date>{data.dataCriacao.seconds}</Date> */}
          </Info>
          <Text>{data.texto}</Text>
        </Content>
        <ButtonArea>
          <Button>
            <ButtonText>Curtir</ButtonText>
          </Button>
          {/* <Button>
            <ButtonText>Responder</ButtonText>
          </Button> */}
        </ButtonArea>
      </Wrapper>
    </Container>
  )
}

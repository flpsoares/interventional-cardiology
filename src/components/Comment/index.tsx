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
  data: CommentProp
}

export const Comment: React.FC<Props> = ({ data }) => {
  return (
    <Container>
      <UserPhoto source={data.userPhoto} />
      <Wrapper>
        <Content>
          <Info>
            <Name>{data.name}</Name>
            <Date>
              {data.date} - {data.time}
            </Date>
          </Info>
          <Text>{data.content}</Text>
        </Content>
        <ButtonArea>
          <Button>
            <ButtonText>Curtir</ButtonText>
          </Button>
          <Button>
            <ButtonText>Responder</ButtonText>
          </Button>
        </ButtonArea>
      </Wrapper>
    </Container>
  )
}

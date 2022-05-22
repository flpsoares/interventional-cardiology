import moment from 'moment'
import 'moment/locale/pt-br'
import React from 'react'
import {
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
      {data?.autorFoto ? (
        <UserPhoto source={{ uri: data.autorFoto }} />
      ) : (
        <UserPhoto source={require('../../../assets/default-user.png')} />
      )}
      <Wrapper>
        <Content>
          <Info>
            <Name>{data.autorNome}</Name>
            <Date>
              {moment(data.dataExibicao, 'DD/MM/YYYY H:mm:ss')
                .add(3, 'hours')
                .locale('pt-br')
                .fromNow()}
            </Date>
            {/* <Date>{data.dataExibicao}</Date> */}
          </Info>
          <Text>{data.texto}</Text>
        </Content>
        {/* <ButtonArea>
          <Button>
            <ButtonText>Curtir</ButtonText>
          </Button>
          <Button>
            <ButtonText>Responder</ButtonText>
          </Button>
        </ButtonArea> */}
      </Wrapper>
    </Container>
  )
}

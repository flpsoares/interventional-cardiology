import styled from 'styled-components/native'
import { primary } from '../../styles/globalCssVar'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Title = styled.Text`
  color: #000;
  font-size: 22px;
  font-weight: bold;
`

export const Button = styled.TouchableOpacity`
  padding: 12px 32px;
  background: ${primary};
  border-radius: 6px;
  margin-top: 12px;
`

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
`

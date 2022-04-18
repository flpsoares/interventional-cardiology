import styled from 'styled-components/native'
import { primary } from '../../styles/globalCssVar'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const Button = styled.TouchableOpacity`
  padding: 20px 50px;
  background: ${primary};
  border-radius: 8px;
`

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: bold;
`

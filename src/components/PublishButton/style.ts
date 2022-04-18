import styled from 'styled-components/native'
import { secondary } from '../../styles/globalCssVar'

export const Container = styled.View`
  background: ${secondary};
  width: 79px;
  height: 79px;
  padding: 2px 2px 2px 2px;
  border-radius: 100px;

  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
`

export const Title = styled.Text`
  color: #fff;
  font-weight: bold;
`

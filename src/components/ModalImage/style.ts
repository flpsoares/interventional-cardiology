import styled from 'styled-components/native'
import { primary, secondary } from '../../styles/globalCssVar'

export const Container = styled.View`
  flex: 1;
`

export const Wrapper = styled.View`
  align-items: center;
`

export const Photo = styled.Image`
  margin: auto;
  align-self: center;
  margin-top: 22px;
`

export const PhotoQuantity = styled.Text`
  color: ${secondary};
  font-size: 28px;
  font-weight: bold;
  align-self: center;
`

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
  max-width: 100%;
  max-height: 90%;
  align-self: center;
  margin: auto;
  padding: 12px 0;
`

export const PhotoQuantity = styled.Text`
  color: ${secondary};
  font-size: 28px;
  font-weight: bold;
  align-self: center;
`

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
  width: 100%;
  height: 600px;
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

export const CarouselButton = styled.View`
  justify-content: center;
  align-items: center;
  height: 100%;
`

export const VideoButton = styled.View`
  justify-content: center;
  align-items: center;
`

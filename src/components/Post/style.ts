import styled from 'styled-components/native'
import { primary, secondary } from '../../styles/globalCssVar'

export const Container = styled.Pressable`
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  background: #fff;
`

export const Top = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: relative;
`

export const TopLeftContent = styled.View`
  flex-direction: row;
  align-items: center;
`

export const UserPhoto = styled.Image`
  width: 74px;
  height: 74px;
  border-radius: 100px;
  margin-right: 12px;
`

export const Info = styled.View``

export const Name = styled.Text`
  color: #51555c;
  font-size: 18px;
  font-weight: bold;
`

export const Date = styled.Text`
  color: rgba(81, 85, 92, 0.6);
`

export const Options = styled.TouchableOpacity``

export const Wrapper = styled.View`
  margin-top: 12px;
  align-items: center;
  max-height: 400px;
`

export const ContentArea = styled.View`
  width: 100%;
  padding: 0 12px;
`

export const Content = styled.Text`
  color: rgba(51, 51, 51, 0.8);
  margin-bottom: 12px;
`

export const Photo = styled.Image`
  align-self: center;
  max-width: 100%;
  border-radius: 3px;
  max-height: 300px;
  z-index: -1;
`

export const PostInfoArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
`

export const PostInfo = styled.Text`
  color: rgba(4, 20, 50, 0.9);
`
export const ButtonArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 15px;
`

export const Button = styled.TouchableOpacity`
  align-items: center;
`

export const ButtonTitle = styled.Text`
  color: rgba(4, 20, 50, 0.6);
`

export const SeeMoreButton = styled.TouchableOpacity`
  align-self: center;
  margin: auto;
`

export const SeeMoreButtonText = styled.Text`
  color: ${secondary};
  font-weight: bold;
`

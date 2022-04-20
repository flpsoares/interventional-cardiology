import styled from 'styled-components/native'
import { primary } from '../../styles/globalCssVar'

export const Container = styled.View``

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 22px;
`

export const BackButton = styled.TouchableOpacity`
  z-index: 2;
`

export const Notification = styled.TouchableOpacity`
  z-index: 2;
`

export const UserPhotoArea = styled.View`
  width: 130px;
  height: 130px;
  position: relative;
  align-self: center;
  margin-top: -22px;
`

export const UserPhoto = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 100px;
`

export const EditButton = styled.TouchableOpacity`
  background: ${primary};
  width: 40px;
  height: 40px;
  border-radius: 100px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  right: 0;
`

export const Info = styled.View`
  align-items: center;
  margin-top: 12px;
`

export const Name = styled.Text`
  color: rgba(15, 30, 46, 0.8);
  font-size: 24px;
`
export const Date = styled.Text`
  font-size: 18px;
  color: rgba(15, 30, 46, 0.5);
`

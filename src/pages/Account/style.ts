import styled from 'styled-components/native'
import { primary, secondary } from '../../styles/globalCssVar'

export const Container = styled.ScrollView`
  flex: 1;
`

export const Profile = styled.View`
  background: #fff;
  width: 100%;
  padding-bottom: 22px;
`

export const Banner = styled.View`
  background: ${secondary};
  width: 100%;
  height: 110px;
`

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 12px 22px;
`

export const Notification = styled.TouchableOpacity`
  z-index: 2;
`

export const UserPhotoBack = styled.View`
  background: red;
  width: 140px;
  height: 140px;
  border-radius: 100px;
  margin-top: -70px;
  justify-content: center;
  align-items: center;
  align-self: center;
  background: #fff;
`

export const UserPhoto = styled.Image`
  width: 130px;
  height: 130px;
  border-radius: 100px;

  padding: 3px;
`

export const Info = styled.View`
  align-items: center;
  margin-top: 12px;
`

export const Name = styled.Text`
  color: rgba(15, 30, 46, 0.8);
  font-size: 24px;
`
export const Email = styled.Text`
  font-size: 18px;
  color: rgba(15, 30, 46, 0.5);
`

export const EditButton = styled.TouchableOpacity`
  background: ${primary};
  border-radius: 4px;
  padding: 8px 12px;
  width: 150px;
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 12px;
`

export const EditButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`

export const PostArea = styled.View`
  width: 100%;
  margin-top: 22px;
`

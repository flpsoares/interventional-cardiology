import styled from 'styled-components/native'
import { primary, secondary } from '../../styles/globalCssVar'

export const Container = styled.ScrollView`
  background: #fff;
`

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

export const Wrapper = styled.View`
  flex: 1;
  width: 100%;
  border-top-right-radius: 58px;
  border-top-left-radius: 58px;
  padding: 22px;

  background: #f3f5fa;
  margin-top: 52px;
`

export const Title = styled.Text`
  text-align: center;
  margin-bottom: 32px;
  color: ${primary};
  font-size: 26px;
`

export const InputItem = styled.View`
  flex-direction: row;
  align-items: center;
  background: #fff;
  margin-bottom: 22px;
  border-radius: 100px;
  padding: 0 22px;
  height: 70px;
`
export const Icon = styled.View`
  width: 10%;
  margin-right: 12px;
  justify-content: center;
  align-items: center;
`

export const PasswordIcon = styled.TouchableOpacity`
  width: 10%;
  justify-content: center;
  align-items: center;
`

export const Input = styled.TextInput`
  flex: 1;
  height: 100%;
  font-size: 18px;
  color: #5d666f;
`

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 70px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: ${secondary};
  margin-bottom: 32px;
`

export const ButtonText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`

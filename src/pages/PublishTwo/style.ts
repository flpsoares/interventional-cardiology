import styled from 'styled-components/native'
import { secondary } from '../../styles/globalCssVar'

export const Container = styled.ScrollView`
  background: #fff;
  flex: 1;
`

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px 22px;
  border-top-color: #fff;
  border-left-color: #fff;
  border-right-color: #fff;
  border-bottom-color: rgba(229, 234, 245, 0.99);
  border-width: 1px;
`
export const UserPhoto = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 100px;
`

export const Title = styled.Text`
  color: #51555c;
  font-size: 18px;
  font-weight: bold;
`

export const InputTitle = styled.Text`
  color: #51555c;
  font-size: 18px;
  font-weight: bold;
`

export const Button = styled.TouchableOpacity``

export const Wrapper = styled.View`
  padding: 12px 22px;
  flex: 1;
  margin: 12px 0;
`

export const Input = styled.TextInput`
  height: 300px;
  justify-content: flex-start;
  background: #fff;
  margin-top: 12px;
  font-size: 18px;
`

export const ButtonImage = styled.TouchableOpacity`
  width: 100%;
  height: 150px;
  border: 2px dashed #596988;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
`

export const ButtonImageText = styled.Text`
  color: #596988;
  font-size: 18px;
`

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: 70px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: ${secondary};
  margin: 32px 0;
`

export const SubmitButtonText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`

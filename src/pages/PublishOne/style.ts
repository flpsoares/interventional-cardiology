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

export const Button = styled.TouchableOpacity``

export const Wrapper = styled.View`
  padding: 12px 22px;
`

export const InputItem = styled.View`
  height: 60px;
  border-radius: 100px;
  background: #fff;
  margin-bottom: 72px;
`

export const InputTitle = styled.Text`
  color: #51555c;
  font-size: 18px;
  font-weight: 500;
  margin-left: 12px;
`

export const PickerButton = styled.TouchableOpacity`
  border-radius: 5px;
  height: 100%;
  justify-content: center;
  width: 100%;
  border-radius: 100px;
  margin-top: 6px;
  background: #fff;
`

export const HalfItemArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`

export const HalfItem = styled.View`
  width: 48%;
  height: 60px;
  border-radius: 100px;
  background: #fff;
  margin-bottom: 72px;
`

export const Input = styled.TextInput`
  border-radius: 5px;
  height: 100%;
  justify-content: center;
  width: 100%;
  border-radius: 100px;
  margin-top: 6px;
  background: #fff;
  padding: 0 12px;
  font-size: 16px;
  z-index: 2;
`

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  height: 70px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: ${secondary};
  margin-bottom: 32px;
`

export const SubmitButtonText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`

import styled from 'styled-components/native'
import { primary, text } from '../../styles/globalCssVar'

export const ScrollableContainer = styled.ScrollView`
  height: 100%;
`

export const Container = styled.Pressable`
  height: 100%;
  position: relative;
`

export const Banner = styled.Image`
  height: 340px;
  width: 100%;
`

export const Wrapper = styled.View`
  background: #fff;
  flex: 1;
  margin-top: -50px;

  border-top-left-radius: 72px;
  border-top-right-radius: 72px;

  align-items: center;
`

export const Title = styled.Text`
  color: ${primary};
  font-size: 22px;
  font-weight: 700;
  text-align: center;
  margin: 22px 0;
`

export const InputItem = styled.View`
  flex-direction: row;
  align-items: center;
  height: 70px;
  width: 80%;
  padding: 0 12px;
  margin-bottom: 16px;
  border-radius: 6px;
  background: #fff;
`

export const InputIcon = styled.View`
  width: 10%;
  justify-content: center;
  align-items: center;
`

export const InputIconPassword = styled.TouchableWithoutFeedback`
  width: 10%;
  justify-content: center;
  align-items: center;
`

export const Input = styled.TextInput`
  width: 80%;
  height: 100%;
  font-size: 18px;
  padding-left: 12px;
`

export const ForgotPassword = styled.TouchableOpacity``

export const ForgotPasswordText = styled.Text`
  text-decoration: underline;
  color: rgba(77, 86, 109, 0.46);
  font-size: 18px;
`

export const SubmitButton = styled.TouchableOpacity`
  background: ${primary};
  width: 80%;
  height: 60px;
  border-radius: 6px;
  margin-top: 22px;
  justify-content: center;
  align-items: center;
`

export const SubmitButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`

export const RegisterButton = styled.TouchableOpacity``

export const RegisterButtonText = styled.Text`
  color: ${text};
  font-size: 20px;
  margin-top: 16px;
`

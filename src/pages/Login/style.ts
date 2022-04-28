import styled from 'styled-components/native'
import { primary, secondary, text } from '../../styles/globalCssVar'

export const ScrollableContainer = styled.ScrollView`
  height: 100%;
`

export const Container = styled.Pressable`
  height: 100%;
  position: relative;
`

export const BannerArea = styled.View`
  width: 100%;
  height: 350px;
  position: relative;
  background: #fff;
`

export const Banner = styled.Image`
  height: 100%;
  width: 100%;
  z-index: 1;
`
export const FirstSupportImage = styled.Image`
  position: absolute;
  right: -30px;
  bottom: 100px;
  width: 198px;
  height: 119px;
  z-index: 3;
`
export const SecondSupportImage = styled.Image`
  position: absolute;
  width: 152px;
  height: 112px;
  right: 26px;
  bottom: 60px;
  transform: rotate(-50deg);
  z-index: 2;
`

export const Wrapper = styled.View`
  background: #fff;
  flex: 1;

  align-items: center;
  padding-bottom: 42px;
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
  height: 76px;
  width: 80%;
  padding: 0 12px;
  margin-bottom: 16px;
  border-radius: 100px;
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
  color: #838e99;
`

export const ForgotPassword = styled.TouchableOpacity``

export const ForgotPasswordText = styled.Text`
  text-decoration: underline;
  color: rgba(77, 86, 109, 0.46);
  font-size: 18px;
`

export const SubmitButton = styled.TouchableOpacity`
  background: ${secondary};
  width: 80%;
  height: 65px;
  border-radius: 100px;
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

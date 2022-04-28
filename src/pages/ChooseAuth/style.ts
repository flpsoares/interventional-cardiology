import styled from 'styled-components/native'
import { secondary } from '../../styles/globalCssVar'

export const Container = styled.View`
  flex: 1;
  background: red;
  position: relative;
  justify-content: flex-end;
`

export const Banner = styled.Image`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

export const Wrapper = styled.View`
  z-index: 2;
  padding: 22px;
`

export const Title = styled.Text`
  color: #fff;
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 22px;
`

export const LoginButton = styled.TouchableOpacity`
  background: ${secondary};
  height: 65px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  margin-bottom: 12px;
`

export const RegisterButton = styled.TouchableOpacity`
  background: transparent;
  height: 65px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  margin-bottom: 32px;
`

export const ButtonText = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #fff;
`

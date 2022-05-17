import styled from 'styled-components/native'
import { secondary } from '../../styles/globalCssVar'

export const Container = styled.View``

export const Wrapper = styled.View`
  background: #fff;
  height: 70%;
  border-radius: 6px;
  padding: 26px;
  align-items: center;
`

export const Banner = styled.Image`
  width: 80%;
  height: 200px;
`

export const Title = styled.Text`
  font-size: 24px;
  font-weight: 500;
  text-align: center;
  margin-top: 16px;
`

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  background: ${secondary};
  border-radius: 6px;
  justify-content: center;
  align-items: center;
  margin-top: 52px;
`

export const ButtonText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-weight: 500;
`

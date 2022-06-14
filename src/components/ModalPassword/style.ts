import styled from 'styled-components/native'
import { secondary } from '../../styles/globalCssVar'

export const Container = styled.View`
  padding: 22px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

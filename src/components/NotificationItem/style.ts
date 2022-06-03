import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 22px;
`

export const Left = styled.View`
  max-width: 80%;
`

export const Text = styled.Text`
  font-weight: bold;
  font-size: 18px;
`

export const Button = styled.TouchableOpacity`
  background: #8b0003;
  padding: 12px;
  border-radius: 4px;
`

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`

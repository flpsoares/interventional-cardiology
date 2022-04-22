import styled from 'styled-components/native'

export const Container = styled.Pressable`
  background: #596988;
  width: 208px;

  z-index: 10;

  position: absolute;
  right: 6px;
  top: 60px;
  border-radius: 16px;
  padding: 22px 12px;
  justify-content: center;
`

export const Item = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  z-index: 200;
`

export const Icon = styled.View`
  margin-right: 12px;
`

export const Text = styled.Text`
  color: #fff;
  font-size: 18px;
`

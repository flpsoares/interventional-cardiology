import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  width: 100%;
  padding: 0 22px;
  margin-bottom: 22px;
`

export const UserPhoto = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 100px;
`

export const Wrapper = styled.View`
  flex: 1;
  margin-left: 6px;
`

export const Content = styled.View`
  background: #eef0f5;
  border-radius: 5px;
  padding: 12px;
`

export const Info = styled.View``

export const Name = styled.Text`
  color: #51555c;
  font-size: 18px;
  font-weight: bold;
`

export const Date = styled.Text`
  color: rgba(81, 85, 92, 0.6);
`

export const Text = styled.Text`
  color: rgba(81, 85, 92, 0.6);
  margin-top: 4px;
  font-size: 17px;
`

export const ButtonArea = styled.View`
  flex-direction: row;
  align-items: center;
`

export const Button = styled.TouchableOpacity`
  margin-left: 16px;
  margin-top: 6px;
`

export const ButtonText = styled.Text`
  color: rgba(4, 20, 50, 0.5);
  font-weight: bold;
`

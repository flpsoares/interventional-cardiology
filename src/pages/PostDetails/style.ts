import styled from 'styled-components/native'

export const Container = styled.ScrollView`
  flex: 1;
  background: #fff;
`

export const Top = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background: #fff;
`

export const UserPhoto = styled.Image`
  width: 48px;
  height: 48px;
  border-radius: 100px;
`

export const TopInputArea = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: rgba(229, 234, 245, 0.46);
  height: 36px;
  width: 75%;
  border-radius: 5px;
  padding: 0 4px;
`

export const NotificationButton = styled.TouchableOpacity``

export const TopInput = styled.TextInput`
  width: 90%;
  height: 100%;
`

export const Wrapper = styled.View``

export const Title = styled.Text`
  color: #51555c;
  padding: 0 22px;
  font-weight: bold;
  font-size: 16px;
`

export const CommentInputArea = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0 22px;
  margin: 12px 0;
`

export const CommentInputBox = styled.View`
  flex-direction: row;
  align-items: center;
  background: #f3f5fa;
  margin-left: 6px;
  flex: 1;
  padding: 0 14px;
  height: 62px;
  border-radius: 5px;
`

export const CommentInput = styled.TextInput`
  width: 90%;
  height: 100%;
`

export const SendButton = styled.TouchableOpacity`
  height: 100%;
  justify-content: center;
`

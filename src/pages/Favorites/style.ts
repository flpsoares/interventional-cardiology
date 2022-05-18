import styled from 'styled-components/native'
import { primary } from '../../styles/globalCssVar'

interface ChooseProps {
  isActive: boolean
}

export const Container = styled.ScrollView``

export const ChooseArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px;
  background: #fff;
`

export const ChooseItem = styled.TouchableOpacity<ChooseProps>`
  width: 50%;
  padding: 14px 12px;
  border-bottom-width: ${(props) => (props.isActive ? '1px' : '0')};
  border-color: ${primary};
`

export const ChooseItemText = styled.Text<ChooseProps>`
  color: ${primary};
  font-weight: bold;
  font-size: 16px;
  text-align: center;
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

export const TopInput = styled.TextInput`
  width: 90%;
  height: 100%;
`

export const Wrapper = styled.View``

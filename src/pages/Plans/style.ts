import styled from 'styled-components/native'
import { primary, secondary } from '../../styles/globalCssVar'

export const Container = styled.ScrollView`
  flex: 1;
`
export const WebViewContainer = styled.View`
  flex: 1;
  background: #fff;
`

export const WebViewHeader = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`

export const WebViewCloseButton = styled.TouchableOpacity``

export const Header = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  padding: 12px 22px;
`

export const BackButton = styled.TouchableOpacity`
  z-index: 2;
`

export const Notification = styled.TouchableOpacity`
  z-index: 2;
`

export const NotificationButton = styled.TouchableOpacity``

export const Wrapper = styled.View`
  padding: 0 22px;
`

export const Banner = styled.Image`
  width: 110%;
  height: 400px;
  align-self: center;
  margin-top: -62px;
`

export const Title = styled.Text`
  color: ${primary};
  font-size: 26px;
  text-align: center;
  width: 250px;
  align-self: center;
  margin-top: -30px;
  margin-bottom: 12px;
`

export const Description = styled.Text`
  text-align: center;
  color: rgba(5, 5, 6, 0.59);
  font-size: 18px;
`

export const PlanArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 22px;
`

interface PlanProps {
  isActive: boolean
}

export const Plan = styled.TouchableOpacity<PlanProps>`
  background: ${(props) => (props.isActive ? primary : '#fff')};
  width: 109px;
  height: 106px;
  padding: 2px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`

export const PlanNumber = styled.Text<PlanProps>`
  color: ${(props) => (props.isActive ? '#fff' : primary)};
  font-weight: bold;
  font-size: 34px;
`

export const PlanText = styled.Text<PlanProps>`
  color: ${(props) => (props.isActive ? '#fff' : primary)};
  font-size: 20px;
`

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 70px;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  background: ${secondary};
  margin: 32px 0;
`

export const ButtonText = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: bold;
`

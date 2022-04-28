import styled from 'styled-components/native'
import { primary, text } from '../../styles/globalCssVar'

export const Container = styled.View`
  position: relative;
  background: #fff;
  flex: 1;
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
  padding: 22px;
  flex: 1;
`

export const Title = styled.Text`
  color: ${primary};
  font-weight: bold;
  font-size: 24px;
  margin-bottom: 12px;
  margin-top: 4px;
`

export const SubTitle = styled.Text`
  color: ${text};
  font-size: 16px;
`

export const Description = styled.Text`
  color: ${text};
  line-height: 20px;
  font-size: 18px;
`

export const PaginationArea = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 22px;
  background: #fff;
`

export const NextButton = styled.TouchableOpacity``

export const NextButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;
`

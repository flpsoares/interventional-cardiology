import styled from 'styled-components/native'
import { primary, text } from '../../styles/globalCssVar'

export const Container = styled.View``

export const Banner = styled.Image`
  height: 350px;
  width: 100%;
`

export const Wrapper = styled.View`
  padding: 22px;
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
`

export const NextButton = styled.TouchableOpacity``

export const NextButtonText = styled.Text`
  color: ${primary};
  font-size: 16px;
`

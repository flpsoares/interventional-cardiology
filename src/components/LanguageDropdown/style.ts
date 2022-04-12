import styled from 'styled-components/native'

interface ContainerProps {
  isOpen: boolean
}

export const Container = styled.Pressable<ContainerProps>`
  background: ${(props) => (props.isOpen ? '#f4f8f7' : 'transparent')};
  position: absolute;
  top: 10px;
  right: 12px;
  height: ${(props) => (props.isOpen ? '160px' : '55px')};
  padding: 6px;
  border-radius: 50px;
  z-index: 1;
`

export const Item = styled.Pressable`
  margin-bottom: 12px;
  border-radius: 50px;
`

export const Image = styled.Image`
  width: 40px;
  height: 40px;
  border-radius: 50px;
`

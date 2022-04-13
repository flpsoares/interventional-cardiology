import styled from 'styled-components/native'

interface ContainerProps {
  isOpen: boolean
}

export const Container = styled.Pressable<ContainerProps>`
  background: #fff;
  position: absolute;
  top: 0;
  right: 0;
  width: 59px;
  height: ${(props) => (props.isOpen ? '160px' : '56px')};
  border-bottom-left-radius: 20px;
  z-index: 10;
  padding-top: 12px;

  display: flex;
  align-items: center;
`

export const Item = styled.Pressable`
  margin-bottom: 20px;
  border-radius: 50px;
`

export const Image = styled.Image`
  width: 31px;
  height: 31px;
  border-radius: 50px;
`

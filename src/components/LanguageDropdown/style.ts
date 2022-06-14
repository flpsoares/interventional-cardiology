import styled from 'styled-components/native'

interface ContainerProps {
  isOpen: boolean
  isProfile: boolean
}

export const Container = styled.Pressable<ContainerProps>`
  background: #fff;
  position: absolute;
  top: 0;
  right: ${(props) => (props.isProfile ? '0' : 'auto')};
  left: ${(props) => (props.isProfile ? '0' : 'auto')};
  width: 59px;
  height: ${(props) => (props.isOpen ? '160px' : '56px')};
  border-bottom-left-radius: ${(props) => (props.isProfile ? '0' : '20px')};
  border-bottom-right-radius: ${(props) => (props.isProfile ? '20px' : '0')};
  z-index: 30;
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

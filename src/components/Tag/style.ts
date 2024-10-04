import styled from 'styled-components'
import { color } from '../../styles'
import { Props } from '.'

export const TagContainer = styled.div<Props>`
  display: inline-block;
  background-color: ${color.green};
  color: ${color.white};
  font-size: ${(props) => (props.size === 'big' ? '16px' : '10px')};
  padding: ${(props) => (props.size === 'big' ? '8px 16px' : '4px 6px')};
  font-weight: bold;
  border-radius: 8px;
`

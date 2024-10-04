import styled from 'styled-components'
import { color } from '../../styles'
import { Link } from 'react-router-dom'

import { Props } from '.'

export const ButtonContainer = styled.button<Props>`
  border: 2px solid
    ${(props) => (props.variant === 'primary' ? color.green : color.white)};
  color: ${color.white};
  padding: 8px 16px;
  font-size: 16px;
  font-weight: bold;
  background-color: ${(props) =>
    props.variant === 'primary' ? color.green : 'transparent'};
  border-radius: 8px;
`

export const ButtonLink = styled(Link)`
  border: 2px solid ${color.white};
  padding: 8px 16px;
  font-size: 16px;
  font-weight: bold;
  color: ${color.white};
  background-color: transparent;
  text-decoration: none;
  border-radius: 8px;
`

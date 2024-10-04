import styled from 'styled-components'
import { breakpoints, color } from '../../styles'
import { TagContainer } from '../Tag/style'

export const Banner = styled.div`
  position: relative;
  display: block;
  height: 480px;
  width: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: 100%;

  padding-top: 16px;

  @media (max-width: ${breakpoints.tablet}) {
    background-size: cover;
  }

  &::after {
    position: absolute;
    background-color: ${color.black};
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    content: '';
    opacity: 0.56;
  }

  ${TagContainer} {
    margin-right: 8px;
  }

  .container {
    z-index: 1;
    position: relative;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }
`

export const Infos = styled.div`
  padding: 16px;
  background-color: ${color.black};
  max-width: 290px;
  font-weight: bold;

  h2 {
    font-size 32px;
    }

  p {
    font-size: 18px;
    margin: 16px 0;

    span {
    display: block;
    text-decoration: line-through;
    }
  }
`

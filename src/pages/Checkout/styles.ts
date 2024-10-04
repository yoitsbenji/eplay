import styled from 'styled-components'
import { color } from '../../styles'

type InputGroupProps = {
  maxWidth?: string
}

type RowProps = {
  marginTop?: string
}

type TabButtonProps = {
  isActive: boolean
}

export const Row = styled.div<RowProps>`
  display: flex;
  column-gap: 24px;
  align-items: flex-end;
  margin-top: ${(props) => props.marginTop || '0'};
`
export const InputGroup = styled.div<InputGroupProps>`
  flex: auto;

  max-width: ${(props) => props.maxWidth || 'auto'};

  label {
    font-size: 14px;
    color: ${color.white};
    margin-bottom: 8px;
    display: block;
  }

  input, select {
    height: 32px;
    padding: 0 8px;
    background-color: ${color.white}
    border: 1px solid ${color.white};
    width: 100%;
  }
`

export const TabButton = styled.button<TabButtonProps>`
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  color: ${color.white};
  background-color: ${(props) => (props.isActive ? color.green : color.black)};
  height: 32px;
  border: none;
  margin-right: 16px;
  padding: 0 8px;
  cursor: pointer;

  img {
    margin-right: 8px;
  }
`

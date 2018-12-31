import styled, { css } from 'styled-components';

export const DatePickerDiv = styled.div`
  cursor: pointer;
  border-right: none;
  position: relative;
  height: 35px;
  width: 100%;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-bottom: 1px solid #d8d9db;
  outline: none;
  &:hover{
    border-bottom: 1px solid #da3743;
  }
`;
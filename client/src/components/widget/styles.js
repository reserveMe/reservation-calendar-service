import styled, { css } from 'styled-components';

export const Button = styled.button`
  padding: .75rem 1rem;
  text-decoration: none;
  background-color: #da3743;
  color: #fff;
  border: none;
  font-size: 1rem;
  line-height: 1.5;
  width: 18rem;
  &:hover{
    background-color: #e15b64;
  }
`;

export const DateButton = styled.button`
  min-width: 72px;
  height: 32px;
  font-size: .875rem;
  background-color: #da3743;
  cursor: pointer;
  border-radius: 4px;
  text-align: center;
  color: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  padding: 0 .25rem;
  &:hover{
    background-color: #e15b64;
  }
`;

export const OuterDateButtonDiv = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
`;

export const DateButtonDiv = styled.div`
  margin-right: .5rem;
  margin-bottom: .5rem;
  display: inline-block;
  vertical-align: top;
  text-decoration: none;
`;


export const Container = styled.div`
  box-shadow: 0 2px 8px rgba(153,153,153,.4);
`;

export const HeaderDiv = styled.div`
  height: 48px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: end;
  -ms-flex-pack: end;
  justify-content: flex-end;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  background-color: #fff;
  border-top-left-radius: 2px;
  border-top-right-radius: 2px;
  text-align: center;
  padding: 0 1rem;
  position: relative;
`;

export const HeaderText = styled.h3`
  font-size: 21px;
  height: 100%;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  border-bottom: 1px solid #d8d9db;
  margin: 0;
  font-weight: 1000;
  line-height: 24px;
`;

export const Form = styled.form`
  padding: .5rem 1rem 1rem;
  border-bottom-left-radius: 2px;
  border-bottom-right-radius: 2px;
  background-color: #fff;
  margin-bottom: 1rem;
`;

export const PartySize = styled.div`
  margin-left: 0;
  -webkit-box-flex: 1;
  -ms-flex: 1 50%;
  flex: 1 50%;
`;

export const PartySizeText = styled.div`
  font-size: .875rem;
  font-weight: 600;
  padding-bottom: .25rem;
`;

export const PartySizeSelect = styled.select`
  cursor: pointer;
  font-family: inherit;
  background-color: #fff;
  font-size: .875rem;
  display: block;
  outline: none;
  border: none;
  width: 100%;
  height: 35px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border-radius: 0;
  border-bottom: 1px solid #d8d9db;
  &:hover{
    border-bottom: 1px solid #da3743;
  }
`;

export const DateAndTime = styled.div`
  margin-top: .5rem;
  margin-left: 0;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1 100%;
  flex: 1 100%;
`;

export const DateDiv = styled.div`
  margin-left: 0;
  -webkit-box-flex: 1;
  -ms-flex: 1 50%;
  flex: 1 50%;
`;

export const DateText = styled.div`
  font-size: .875rem;
  font-weight: 600;
  padding-bottom: .25rem;
`;

export const TimeDiv = styled.div`
  -webkit-box-flex: 1;
  -ms-flex: 1 50%;
  flex: 1 50%;
  margin-left: .5rem;
`;

export const TimeText = styled.div`
  font-size: .875rem;
  font-weight: 600;
  padding-bottom: .25rem;
`;

export const TimeSelect = styled.select`
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

export const ButtonDiv = styled.div`
  display: flex;
  margin: 1rem auto 0;
  overflow: hidden;
  width: 100%;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
`;
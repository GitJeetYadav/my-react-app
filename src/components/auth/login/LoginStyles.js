import styled from 'styled-components';

export const StyledH1 = styled.h1`
  font-size: 2em;
  text-align: center;
  font-weight: 700;
  margin-top: 30px;

  @media (max-width: 426px) and (min-width: 320px) {
    font-size: 1.5em;
  }
`;

export const SignIn = styled.h1`
  font-size: 1.5em;
  text-align: center;
  font-weight: 600;
  margin-top: 35px;

   @media (max-width: 426px) and (min-width: 320px) {
    font-size: 1em; 
  }
`;

export const SpanText = styled.span`
  font-size: 1em;
  font-weight: 800;
  color: #feaf00;
  margin-right: 10px;
`;

export const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9em;
`;

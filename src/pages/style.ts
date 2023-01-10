import styled from 'styled-components';

export const Main = styled.main`
  min-height: 100vh;

  background-color: #0f0f0f;
`;

export const Title = styled.h1`
  font-size: 2rem;
  color: white;

  max-width: 75vw;

  padding-top: 16px;
  padding-left: 24px;

  @media screen and (max-width: 960px) {
    font-size: 1.4rem;
    max-width: unset;

    padding-top: 8px;
    padding-left: 12px;
    padding-right: 12px;
  }
`;

export const Description = styled.p`
  font-size: 1.4rem;
  color: white;

  max-width: 75vw;

  padding-left: 24px;
  padding-top: 12px;

  @media screen and (max-width: 960px) {
    font-size: 1rem;

    max-width: unset;

    padding-top: 8px;
    padding-left: 12px;
    padding-right: 12px;
  }
`;

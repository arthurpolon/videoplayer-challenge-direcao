import styled, { css } from 'styled-components';

export const Container = styled.div<{ theaterMode?: boolean }>`
  width: 75vw;

  aspect-ratio: 16/9;

  background-color: black;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ theaterMode }) =>
    theaterMode &&
    css`
      width: 100vw;

      max-height: 85vh;
    `}
`;

export const Video = styled.video`
  height: 100%;

  &::-webkit-media-controls {
    display: none !important;
  }
`;

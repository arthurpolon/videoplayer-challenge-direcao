import styled, { css } from 'styled-components';

export const Container = styled.div<{ theaterMode?: boolean }>`
  width: 75vw;

  aspect-ratio: 16/9;

  background-color: black;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

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

export const ControlsContainer = styled.div`
  position: absolute;

  bottom: 0;
  top: 0;
  right: 0;
  left: 0;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  width: 100%;

  z-index: 100;

  opacity: 0;

  transition: opacity 150ms ease-in-out;

  &:hover {
    opacity: 1;
  }

  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.75), transparent);
    width: 100%;
    aspect-ratio: 6 / 1;
    z-index: -1;
    pointer-events: none;
  }

  .left,
  .right {
    display: flex;
    gap: 1.6rem;

    padding: 1rem;
  }
`;

export const ControlButton = styled.button`
  width: 30px;
  height: 30px;

  opacity: 0.85;

  transition: opacity 150ms ease-in-out;

  background: none;
  border: none;

  color: white;

  cursor: pointer;

  &:hover {
    opacity: 1;
  }
`;
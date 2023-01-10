import styled, { css } from 'styled-components';

export const Container = styled.div<{ $theaterMode?: boolean }>`
  padding: ${({ $theaterMode }) => ($theaterMode ? '0' : '20px 0 0 20px')};

  @media screen and (max-width: 960px) {
    padding: 0;
  }
`;

export const ControlsContainer = styled.div<{ $isPaused?: boolean }>`
  position: absolute;

  bottom: 0;
  right: 0;
  left: 0;

  width: 100%;

  z-index: 100;

  opacity: ${({ $isPaused }) => ($isPaused ? 1 : 0)};

  transition: opacity 150ms ease-in-out;

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

  .bottom-controls {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .left,
    .right {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.6rem;

      padding: 1rem;
    }
  }
`;

export const VideoWrapper = styled.div<{
  $theaterMode?: boolean;
  $isIdle?: boolean;
}>`
  width: 75vw;

  aspect-ratio: 16/9;

  background-color: black;

  display: flex;
  justify-content: center;
  align-items: center;

  position: relative;

  cursor: ${({ $isIdle }) => ($isIdle ? 'none' : 'auto')};

  &:hover {
    ${ControlsContainer} {
      opacity: ${({ $isIdle }) => ($isIdle ? 0 : 1)};
    }
  }

  ${({ $theaterMode }) =>
    $theaterMode &&
    css`
      width: 100vw;

      max-height: 85vh;
    `}

  @media screen and (max-width: 960px) {
    width: 100vw;
  }
`;

export const Video = styled.video`
  height: 100%;

  &::-webkit-media-controls {
    display: none !important;
  }
`;

export const ControlButton = styled.button`
  width: 24px;
  height: 24px;

  opacity: 0.85;

  transition: opacity 150ms ease-in-out;

  background: none;
  border: none;

  color: white;

  cursor: pointer;

  &:hover {
    opacity: 1;
  }

  @media screen and (max-width: 960px) {
    &.theater-mode,
    &.picture-in-picture {
      display: none;
    }
  }
`;

export const VolumeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  gap: 8px;

  &:hover,
  &:focus-within {
    .input-range {
      width: 100px;
      transform: scaleX(1);
    }
  }

  .input-range {
    width: 0;
    transform-origin: left;
    transform: scaleX(0);
    transition: width 150ms ease-in-out, transform 150ms ease-in-out;
  }

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

export const DurationWrapper = styled.div`
  font-size: 1.8rem;
  color: white;

  @media screen and (max-width: 960px) {
    font-size: 1.4rem;
  }
`;

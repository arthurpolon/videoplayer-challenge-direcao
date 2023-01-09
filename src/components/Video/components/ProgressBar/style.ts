import styled from 'styled-components';

export const Timeline = styled.div`
  background-color: rgba(100, 100, 100, 0.8);
  width: 100%;
  height: 3px;

  position: relative;
`;

export const Progress = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;

  height: 100%;

  z-index: 10;

  background-color: red;
`;

export const Thumb = styled.div`
  position: absolute;
  top: -50%;

  height: 200%;

  transform: scale(0);

  background-color: red;
  border-radius: 50%;
  transition: transform 50ms ease-in-out;

  aspect-ratio: 1/1;

  z-index: 10;
`;

export const Container = styled.div`
  height: 7px;

  margin: 0 8px;

  cursor: pointer;

  display: flex;
  align-items: center;

  position: relative;

  &:hover {
    ${Timeline}, ${Progress} {
      height: 100%;
    }

    ${Thumb} {
      transform: translateX(-50%) scale(1);
    }
  }
`;

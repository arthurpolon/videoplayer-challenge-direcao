import { useVideo } from 'hooks/use-video';
import { MouseEventHandler, useState } from 'react';
import { FullscreenIcon } from './images/fullscreen-icon';
import { PictureInPictureIcon } from './images/picture-in-picture-icon';
import { PlayPauseIcon } from './images/play-pause-icon';
import TheaterModeIcon from './images/theater-mode-icon';
import * as S from './style';

const stopPropagation =
  (callback: () => any): MouseEventHandler<HTMLButtonElement> =>
  (event) => {
    event.stopPropagation();
    callback();
  };

const Video = () => {
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  const {
    isPaused,
    isFullscreen,
    toggleFullscreen,
    togglePlay,
    togglePictureInPicture,
    toggleTheaterMode,
    isTheaterMode,
  } = useVideo(videoRef, {
    setKeyboardEvents: true,
    fullscreenTarget: containerRef,
  });

  return (
    <>
      <S.Container
        ref={(node) => setContainerRef(node)}
        theaterMode={isTheaterMode}
        onClick={togglePlay}
        onDoubleClick={() => {
          toggleFullscreen();
        }}
      >
        <S.ControlsContainer>
          <div className="left">
            <S.ControlButton onClick={stopPropagation(togglePlay)}>
              <PlayPauseIcon state={isPaused ? 'play' : 'pause'} />
            </S.ControlButton>
          </div>

          <div className="right">
            <S.ControlButton onClick={stopPropagation(togglePictureInPicture)}>
              <PictureInPictureIcon />
            </S.ControlButton>
            <S.ControlButton onClick={stopPropagation(toggleTheaterMode)}>
              <TheaterModeIcon state={isTheaterMode ? 'wide' : 'tall'} />
            </S.ControlButton>
            <S.ControlButton onClick={stopPropagation(toggleFullscreen)}>
              <FullscreenIcon state={isFullscreen ? 'close' : 'open'} />
            </S.ControlButton>
          </div>
        </S.ControlsContainer>
        <S.Video
          ref={(node) => setVideoRef(node)}
          controls={false}
          controlsList="nofullscreen"
          src="https://res.cloudinary.com/dyzcpwvl3/video/upload/v1672869486/videoplayback_250c953ff7.mp4"
        ></S.Video>
      </S.Container>
    </>
  );
};

export default Video;

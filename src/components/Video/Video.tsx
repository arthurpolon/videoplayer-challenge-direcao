import InputRange from './components/InputRange';
import { useVideo } from 'hooks/use-video';
import { SyntheticEvent, useState } from 'react';
import { FullscreenIcon } from './images/fullscreen-icon';
import { PictureInPictureIcon } from './images/picture-in-picture-icon';
import { PlayPauseIcon } from './images/play-pause-icon';
import TheaterModeIcon from './images/theater-mode-icon';
import { VolumeIcon } from './images/volume-icon';
import * as S from './style';

const stopPropagation = (event: SyntheticEvent<HTMLDivElement, MouseEvent>) => {
  event.stopPropagation();
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
    volume,
    setVolume,
    isMuted,
    toggleMute,
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
          <div className="left" onClick={stopPropagation}>
            <S.ControlButton onClick={togglePlay}>
              <PlayPauseIcon state={isPaused ? 'play' : 'pause'} />
            </S.ControlButton>

            <S.VolumeWrapper>
              <S.ControlButton onClick={toggleMute}>
                <VolumeIcon
                  state={isMuted ? 'muted' : volume > 0.5 ? 'high' : 'low'}
                />
              </S.ControlButton>
              <InputRange
                className="input-range"
                value={volume}
                onChange={(value) => setVolume(value)}
              />
            </S.VolumeWrapper>
          </div>

          <div className="right" onClick={stopPropagation}>
            <S.ControlButton onClick={togglePictureInPicture}>
              <PictureInPictureIcon />
            </S.ControlButton>
            <S.ControlButton onClick={toggleTheaterMode}>
              <TheaterModeIcon state={isTheaterMode ? 'wide' : 'tall'} />
            </S.ControlButton>
            <S.ControlButton onClick={toggleFullscreen}>
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

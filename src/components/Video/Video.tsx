import InputRange from './components/InputRange';
import { useVideo } from 'hooks/use-video';
import { SyntheticEvent, useState } from 'react';
import { FullscreenIcon } from './images/fullscreen-icon';
import { PictureInPictureIcon } from './images/picture-in-picture-icon';
import { PlayPauseIcon } from './images/play-pause-icon';
import TheaterModeIcon from './images/theater-mode-icon';
import { VolumeIcon } from './images/volume-icon';
import * as S from './style';
import { formatSecondsToVideoTime } from 'utils/formatSecondsToVideoTime';
import { useDebounceTimeout } from 'hooks/use-debounce-timeout';
import ProgressBar from './components/ProgressBar/ProgressBar';

const stopPropagation = (event: SyntheticEvent<HTMLDivElement, MouseEvent>) => {
  event.stopPropagation();
};

const Video = () => {
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);
  const [isIdle, setIsIdle] = useState(false);

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
    currentTime,
    totalDuration,
  } = useVideo(videoRef, {
    setKeyboardEvents: true,
    fullscreenTarget: containerRef,
  });

  const { start: startIdleTimeout, clear: clearIdleTimeout } =
    useDebounceTimeout(() => setIsIdle(true), 3000);

  return (
    <S.Container $theaterMode={isTheaterMode}>
      <S.VideoWrapper
        ref={(node) => setContainerRef(node)}
        onClick={() => {
          togglePlay();

          if (isPaused) {
            startIdleTimeout();
          } else {
            clearIdleTimeout();
          }
        }}
        onDoubleClick={() => {
          toggleFullscreen();
        }}
        onMouseEnter={startIdleTimeout}
        onMouseLeave={() => {
          setIsIdle(false);
          clearIdleTimeout();
        }}
        onMouseMove={() => {
          setIsIdle(false);
          startIdleTimeout();
        }}
        $theaterMode={isTheaterMode}
        $isIdle={isIdle}
      >
        <S.ControlsContainer $isPaused={isPaused} onClick={stopPropagation}>
          <ProgressBar videoRef={videoRef} />
          <div className="bottom-controls">
            <div className="left">
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

              <S.DurationWrapper>
                {formatSecondsToVideoTime(currentTime)} /{' '}
                {formatSecondsToVideoTime(totalDuration)}
              </S.DurationWrapper>
            </div>

            <div className="right">
              <S.ControlButton
                className="picture-in-picture"
                onClick={togglePictureInPicture}
              >
                <PictureInPictureIcon />
              </S.ControlButton>
              <S.ControlButton
                className="theater-mode"
                onClick={toggleTheaterMode}
              >
                <TheaterModeIcon state={isTheaterMode ? 'wide' : 'tall'} />
              </S.ControlButton>
              <S.ControlButton onClick={toggleFullscreen}>
                <FullscreenIcon state={isFullscreen ? 'close' : 'open'} />
              </S.ControlButton>
            </div>
          </div>
        </S.ControlsContainer>
        <S.Video
          ref={(node) => {
            setVideoRef(node);
          }}
          controls={false}
          controlsList="nofullscreen"
          src="https://res.cloudinary.com/dyzcpwvl3/video/upload/v1673378049/AVATAR_2__O_CAMINHO_DA_%C3%81GUA_SURPREENDE_OU_DECEPCIONA_gerbjd.mp4"
        ></S.Video>
      </S.VideoWrapper>
    </S.Container>
  );
};

export default Video;

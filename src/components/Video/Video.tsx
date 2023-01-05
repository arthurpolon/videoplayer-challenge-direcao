import { useVideo } from 'hooks/use-video';
import { useState } from 'react';
import * as S from './style';

const Video = () => {
  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);

  const {
    isPaused,
    toggleFullscreen,
    togglePlay,
    togglePictureInPicture,
    toggleTheaterMode,
    isTheaterMode,
  } = useVideo(videoRef, { setKeyboardEvents: true });

  return (
    <>
      <S.Container theaterMode={isTheaterMode}>
        <S.Video
          ref={(node) => setVideoRef(node)}
          controls={false}
          controlsList="nofullscreen"
          src="https://res.cloudinary.com/dyzcpwvl3/video/upload/v1672869486/videoplayback_250c953ff7.mp4"
        ></S.Video>
      </S.Container>

      <button onClick={toggleFullscreen}>Enter Fullscreen</button>
      <button onClick={toggleTheaterMode}>Enter Theater Mode</button>

      <button onClick={togglePictureInPicture}>Enter Pip</button>

      <button onClick={togglePlay}>{isPaused ? 'Play' : 'Pause'}</button>
    </>
  );
};

export default Video;

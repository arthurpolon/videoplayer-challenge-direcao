import { useEffect, useRef, useState } from 'react';

type TOptions = {
  setKeyboardEvents?: boolean;
  fullscreenTarget?: HTMLElement | null;
};

const defaultOptions: TOptions = {
  setKeyboardEvents: true,
};

export const useVideo = (
  video: HTMLVideoElement | null,
  optionsParam?: TOptions
) => {
  const options = {
    ...defaultOptions,
    ...optionsParam,
  };

  const fullscreenTarget = options.fullscreenTarget || video;

  const [isPaused, setIsPaused] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [isPictureInPicture, setIsPictureInPicture] = useState(false);
  const [volumeState, setVolumeState] = useState(1);
  const [isMuted, setIsMuted] = useState(false);

  const lastVolumeBeforeMute = useRef(0);

  const toggleFullscreen = () => {
    const fullscreenNotAvailable = document.fullscreenEnabled === false;

    if (fullscreenNotAvailable) {
      return;
    }

    const noElementInFullscreen = document.fullscreenElement === null;

    if (noElementInFullscreen) {
      fullscreenTarget?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const togglePictureInPicture = () => {
    const pictureInPictureNotAvailable =
      document.pictureInPictureEnabled === false;

    if (pictureInPictureNotAvailable) {
      return;
    }

    const noElementInPictureInPicture =
      document.pictureInPictureElement === null;

    if (noElementInPictureInPicture) {
      video?.requestPictureInPicture();
    } else {
      document.exitPictureInPicture();
    }
  };

  const togglePlay = () => {
    video?.paused ? video.play() : video?.pause();
  };

  const toggleTheaterMode = () => setIsTheaterMode((state) => !state);

  const setVolume = (valueParam: number) => {
    if (!video) return;

    let value: number;

    if (valueParam > 1) {
      value = 1;
    } else if (valueParam < 0) {
      value = 0;
    } else {
      value = valueParam;
    }

    if (value > 0) {
      video.muted = false;
      setIsMuted(false);
    }

    video.volume = value;
  };

  const toggleMute = () => {
    if (!video) return;

    if (video.muted) {
      video.muted = false;
      setVolume(lastVolumeBeforeMute.current);
    } else {
      video.muted = true;

      lastVolumeBeforeMute.current = video.volume;
      setVolume(0);
    }
  };

  useEffect(() => {
    function onPlay() {
      setIsPaused(false);
    }

    function onPause() {
      setIsPaused(true);
    }

    function onFullscreenChange() {
      setIsFullscreen(document.fullscreenElement !== null);
    }

    function onEnterPictureInPicture() {
      setIsPictureInPicture(true);
    }

    function onLeavePictureInPicture() {
      setIsPictureInPicture(false);
    }

    function onKeyDown(e: KeyboardEvent) {
      const tagName = document.activeElement?.tagName.toLowerCase();

      if (tagName === 'input') return;

      switch (e.key.toLowerCase()) {
        case ' ':
          if (tagName === 'button') return;
        case 'k':
          togglePlay();
          break;
        case 'f':
          toggleFullscreen();
          break;
        case 'i':
          togglePictureInPicture();
          break;
        case 't':
          toggleTheaterMode();
          break;
        case 'm':
          toggleMute();
          break;
      }
    }

    function onVolumeChange() {
      if (!video) return;

      setVolumeState(video.volume);
      setIsMuted(video.volume === 0);
    }

    video?.addEventListener('play', onPlay);
    video?.addEventListener('pause', onPause);
    fullscreenTarget?.addEventListener('fullscreenchange', onFullscreenChange);
    video?.addEventListener('enterpictureinpicture', onEnterPictureInPicture);
    video?.addEventListener('leavepictureinpicture', onLeavePictureInPicture);
    video?.addEventListener('volumechange', onVolumeChange);

    if (options.setKeyboardEvents) {
      document.addEventListener('keydown', onKeyDown);
    }

    return () => {
      video?.removeEventListener('play', onPlay);
      video?.removeEventListener('pause', onPause);
      fullscreenTarget?.removeEventListener(
        'fullscreenchange',
        onFullscreenChange
      );
      video?.removeEventListener(
        'enterpictureinpicture',
        onEnterPictureInPicture
      );
      video?.removeEventListener(
        'leavepictureinpicture',
        onLeavePictureInPicture
      );
      video?.removeEventListener('volumechange', onVolumeChange);

      if (options.setKeyboardEvents) {
        document.removeEventListener('keydown', onKeyDown);
      }
    };
  }, [video]);

  return {
    isPaused,
    togglePlay,
    toggleFullscreen,
    isFullscreen,
    togglePictureInPicture,
    isPictureInPicture,
    isTheaterMode,
    toggleTheaterMode,
    volume: volumeState,
    setVolume,
    isMuted,
    toggleMute,
  };
};

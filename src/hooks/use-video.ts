import { useEffect, useState } from 'react';

type TOptions = {
  setKeyboardEvents?: boolean;
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

  const [isPaused, setIsPaused] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [isPictureInPicture, setIsPictureInPicture] = useState(false);

  const toggleFullscreen = () => {
    const fullscreenNotAvailable = document.fullscreenEnabled === false;

    if (fullscreenNotAvailable) {
      return;
    }

    const noElementInFullscreen = document.fullscreenElement === null;

    if (noElementInFullscreen) {
      video?.requestFullscreen();
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
      }
    }

    video?.addEventListener('play', onPlay);
    video?.addEventListener('pause', onPause);
    video?.addEventListener('fullscreenchange', onFullscreenChange);
    video?.addEventListener('enterpictureinpicture', onEnterPictureInPicture);
    video?.addEventListener('leavepictureinpicture', onLeavePictureInPicture);

    if (options.setKeyboardEvents) {
      document.addEventListener('keydown', onKeyDown);
    }

    return () => {
      video?.removeEventListener('play', onPlay);
      video?.removeEventListener('pause', onPause);
      video?.removeEventListener('fullscreenchange', onFullscreenChange);
      video?.removeEventListener(
        'enterpictureinpicture',
        onEnterPictureInPicture
      );
      video?.removeEventListener(
        'leavepictureinpicture',
        onLeavePictureInPicture
      );

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
  };
};

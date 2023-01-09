import { MouseEventHandler, useEffect, useRef } from 'react';
import * as S from './style';

interface IProgressBarProps {
  videoRef: HTMLVideoElement | null;
}

const ProgressBar = (props: IProgressBarProps) => {
  const { videoRef } = props;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);
  const thumbRef = useRef<HTMLDivElement | null>(null);

  const onMouseDown: MouseEventHandler<HTMLDivElement> = (event) => {
    if (videoRef && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();

      const percentage =
        Math.min(Math.max(0, event.clientX - rect.x), rect.width) / rect.width;

      videoRef.currentTime = percentage * videoRef.duration;
    }
  };

  useEffect(() => {
    if (!videoRef) return;

    const onTimeUpdate = () => {
      const percent = videoRef.currentTime / videoRef.duration;

      window.requestAnimationFrame(() => {
        if (!progressRef.current) return;
        if (!thumbRef.current) return;

        progressRef.current.style.right = `${100 - percent * 100}%`;
        thumbRef.current.style.left = `${percent * 100}%`;
      });
    };

    videoRef.addEventListener('timeupdate', onTimeUpdate);

    return () => {
      videoRef.removeEventListener('timeupdate', onTimeUpdate);
    };
  }, [videoRef]);

  return (
    <S.Container onMouseDown={onMouseDown} ref={containerRef}>
      <S.Timeline>
        <S.Thumb ref={thumbRef} />

        <S.Progress ref={progressRef} />
      </S.Timeline>
    </S.Container>
  );
};

export default ProgressBar;

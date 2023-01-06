import { useRef, WheelEvent } from 'react';

type TInputRangeProps = {
  value: number;
  onChange(value: number): void;

  className?: string | undefined;
};

const InputRange = (props: TInputRangeProps) => {
  const ref = useRef<HTMLInputElement | null>(null);

  const onWheel = (event: WheelEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    if (event.deltaY < 0) {
      ref.current.valueAsNumber += 0.1;
    } else {
      ref.current.valueAsNumber -= 0.1;
    }

    props.onChange(ref.current.valueAsNumber);
  };

  return (
    <div onWheel={onWheel} className={props.className}>
      <input
        type="range"
        ref={ref}
        value={props.value}
        onChange={(event) => {
          props.onChange(event.target.valueAsNumber);
        }}
        min={0}
        max={1}
        step="any"
        style={{ width: '100px' }}
      />
    </div>
  );
};

export default InputRange;

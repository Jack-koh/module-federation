/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { useState, useEffect } from "react";
import classNames from "classnames";

interface I_DualSlider {
  className?: string;
  value?: { lower: number; upper: number };
  min?: number;
  max?: number;
  step?: number;
  reset?: boolean; // 리셋 조건
  onChange: (item: { lower: number; upper: number }) => void;
  onMouseUp?: (item: { lower: number; upper: number }) => void;
}

export const DualSlider: React.FC<I_DualSlider> = ({
  className,
  value,
  min = 1,
  max = 99,
  step = 1,
  reset,
  onChange,
}): JSX.Element => {
  const [lowerValue, setLowerValue] = useState((value as any).lower);
  const [upperValue, setUpperValue] = useState((value as any).upper);

  useEffect(() => {
    // 변경사항 취소 및 초기화
    if (reset) {
      if (lowerValue !== (value as any).lower) setLowerValue((value as any).lower);
      if (upperValue !== (value as any).upper) setUpperValue((value as any).upper);
    }
  }, [reset]);

  useEffect(() => {
    onChangeHandler();
  }, [lowerValue, upperValue]);

  const onChangeHandler = (): void => {
    // low
    if (lowerValue + 3 > upperValue) {
      const val = lowerValue - 3 < min ? min : upperValue - 3;
      setLowerValue(parseFloat(val.toString()));
    }
    // upper
    if (upperValue - 3 < lowerValue) {
      const val = lowerValue + 3 > max ? max : lowerValue + 3;
      setUpperValue(parseFloat(val.toString()));
    }
    // low에 음수가 들어갔을때 각 최소값 set
    if (lowerValue < 0) {
      setLowerValue(1);
      setUpperValue(4);
    }
    onChange({ lower: +lowerValue, upper: +upperValue });
  };

  return (
    <div className={classNames("custom__multi__range__slider", { [className as string]: className })}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={lowerValue}
        className="custom__range__slider__lower"
        onChange={(e) => {
          setLowerValue(+e.target.value);
        }}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={upperValue}
        className="custom__range__slider__upper"
        onChange={(e) => {
          setUpperValue(+e.target.value);
        }}
      />
      <div
        className="range"
        style={
          min === 1
            ? {
                background: `-webkit-linear-gradient(left,  #ededed ${((lowerValue * 10) / max) * 10}%,#b68184 ${
                  ((lowerValue * 10) / max) * 10
                }%,#b68184 ${((upperValue * 10) / max) * 10}%,#ededed ${((upperValue * 10) / max) * 10}%)`,
              }
            : { background: "#b68184" }
        }
      />
    </div>
  );
};

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

const Line = styled.div.attrs((props) => props)<{ gage: number }>`
  width: ${({ gage }) => `${gage}px`};
  height: 2px;
  background-color: #373eff;
`;

const Dot = styled.i<{ active: boolean }>`
  width: 10px;
  height: 10px;
  background-color: ${({ active }) => (active ? "#373eff" : "#e6e6e6")};
  border-radius: 50%;
`;

interface Props {
  min?: number;
  max?: number;
  value?: number;
  onChange?: (value: number) => void;
  step?: number;
  disabled?: boolean;
}

export const Slider: React.FC<Props> = ({ max = 5, min = 1, step = 1, disabled, ...rest }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const initialValue = Math.max(rest?.value ?? 0, min).toString();
  const [value, setValue] = useState(initialValue);

  const lineWidth = inputRef.current?.clientWidth ?? 0;
  const stepWidth = lineWidth / (max - min);

  const calcGage = stepWidth * (Number(value) - min);
  const gage = calcGage < 0 ? 0 : calcGage;
  const dot = Array.from(new Array(Math.floor(max / step)), (_, i) => i);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <div className="jk__single__slider">
      <input
        ref={inputRef}
        type="range"
        step={step}
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        onChange={(e) => {
          setValue(e.target.value);
          if (rest.onChange) rest.onChange(Number(e.target.value));
        }}
      />

      <div className="slider__rail">
        <Line className="slider__line" gage={gage} />
      </div>

      <div className="slider__dot">
        {dot.map((_, i) => {
          const active = i <= (Number(value) - min) / step;
          return <Dot key={i} active={active} />;
        })}
      </div>

      <div className="slider__count">
        {dot.map((_, i) => {
          return <span key={i}>{i + min}</span>;
        })}
      </div>
    </div>
  );
};

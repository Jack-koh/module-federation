import React, { useState } from "react";
import { Select } from "lib/module/lib";

const SelectPage: React.FC = () => {
  const [options, onChange] = useState([
    { label: "첫번째", value: 1, selected: true },
    { label: "두번째", value: 2 },
    { label: "세번째", value: 3 },
    { label: "네번째", value: 4 },
    { label: "다섯번쨰", value: 5 },
    { label: "여섯번쨰", value: 5 },
  ]);

  const [options1, onChange1] = useState([
    { label: "첫번째", value: 1 },
    { label: "두번째", value: 2 },
    { label: "세번째", value: 3 },
    { label: "네번째", value: 4 },
    { label: "다섯번쨰", value: 5 },
    { label: "여섯번쨰", value: 5 },
  ]);

  const [options2, onChange2] = useState([
    { label: "첫번째", value: 1 },
    { label: "두번째", value: 2, selected: true },
    { label: "세번째", value: 3 },
    { label: "네번째", value: 4 },
    { label: "다섯번쨰", value: 5 },
    { label: "여섯번쨰", value: 5 },
  ]);

  return (
    <div>
      {/* <Select onChange={onChange}>
        <Select.Summary />
        <Select.Options>
          <Select.Item label="첫번째" value={1} selected />
          <Select.Item label="두번째" value={2} />
        </Select.Options>
      </Select>

      <Select multiple onChange={onChange1}>
        <Select.Summary />
        <Select.Options options={options1} />
      </Select>

      <Select multiple onChange={onChange2}>
        <Select.Summary />
        <Select.Options>
          {options2.map((el, i) => (
            <Select.Item {...el} key={i}>
              <div>
                {el.label} {i}
              </div>
            </Select.Item>
          ))}
        </Select.Options>
      </Select> */}

      <Select multiple>
        <Select.Summary />
        <Select.Options>
          <Select.Item label="안녕하세요" selected className="test">
            <div>안녕하세요</div>
          </Select.Item>
          <Select.Item label="반갑습니다">
            <div>반갑습니다</div>
          </Select.Item>
        </Select.Options>
      </Select>
    </div>
  );
};

export default SelectPage;

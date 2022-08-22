import React, { useState } from "react";
import { CheckBox } from "lib/module/lib";

const CheckBoxPage: React.FC = () => {
  const [checked, setChecked] = useState(2);
  return (
    <div style={{ padding: "10px 20px", width: "100%", height: "100%" }}>
      <CheckBox checked={checked} onChange={setChecked} label="테스트" />
      <CheckBox disabled checked={checked} />
    </div>
  );
};

export default CheckBoxPage;

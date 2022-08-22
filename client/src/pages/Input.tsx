import React, { useState } from "react";
import { Input } from "lib/module/lib";

const InputPage: React.FC = () => {
  const [value, setValue] = useState("안녕하세요요");
  return (
    <div style={{ padding: "10px 20px", width: "100%", height: "100%" }}>
      <div>
        <Input value={value} onChange={(e: any) => setValue(e.target.value)} />
      </div>
      <div>
        <Input disabled />
      </div>
      <div>
        <Input type="password" />
      </div>
      <div>
        <Input error="error" />
      </div>
    </div>
  );
};

export default InputPage;

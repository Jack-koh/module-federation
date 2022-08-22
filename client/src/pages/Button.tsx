import React from "react";
import { Button } from "lib/module/lib";

const ButtonPage: React.FC = () => {
  const st = { width: 120, height: 40, margin: 10 };
  return (
    <div style={{ padding: "10px 20px", width: "100%", height: "100%" }}>
      <Button st={st}>버튼입니다.</Button>
      <Button disabled st={st}>
        버튼입니다.
      </Button>
      <Button loading st={st}>
        버튼입니다.
      </Button>
    </div>
  );
};

export default ButtonPage;

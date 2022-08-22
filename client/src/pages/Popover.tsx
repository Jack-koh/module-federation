import React from "react";
import { Popover, Button } from "lib/module/lib";

const Test: React.FC = () => {
  return (
    <>
      <Popover
        clickInside
        content={({ closeHandler }: any) => <div style={{ width: 300, height: 80 }}>반갑습니다.</div>}>
        <Button st={{ marginBottom: 10 }}>메뉴 버튼3</Button>
      </Popover>
      <Popover content={({ closeHandler }: any) => <div style={{ width: 300, height: 80 }}>반갑습니다.</div>}>
        <Button>메뉴 버튼3</Button>
      </Popover>
    </>
  );
};

const PopoverPage: React.FC = () => {
  const [value, onChange] = React.useState(false);
  const [count, setCount] = React.useState(0);
  return (
    <div style={{ padding: "10px 20px", width: "100%", height: "100%" }}>
      <div onClick={() => setCount(count + 1)}>하이</div>
      <Popover
        toggle={value}
        onChange={onChange}
        content={({ closeHandler }: any) => <div onClick={closeHandler}>반갑습니다.</div>}>
        <Button>팝오버 버튼</Button>
      </Popover>

      <Popover content={({ closeHandler }: any) => <Test />}>
        <Button>팝오버 버튼1</Button>
      </Popover>

      <Popover
        clickOutside
        clickInside
        content={({ closeHandler }: any) => <div onClick={() => console.log("hi")}>반갑습니다.</div>}>
        <Button>팝오버 버튼2</Button>
      </Popover>
    </div>
  );
};

export default PopoverPage;

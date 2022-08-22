import React from "react";
import { Alert, Button } from "lib/module/lib";

const AlertSet: React.FC<{ test: boolean; className: string }> = ({ test, className }) => {
  const { set } = Alert.Context();
  return (
    <Button className={className} onClick={() => set({ text: "Alert", status: "error" })}>
      버튼
    </Button>
  );
};

const AlertPage: React.FC = () => {
  return (
    <div style={{ padding: "10px 20px", width: "100%", height: "100%" }}>
      <Alert.Provider>
        <main style={{ width: "100%", height: "100%" }}>
          <Alert>
            {/* <div>여기</div> */}
            {/* <ClassComp /> */}
            {/* {AlertSet} */}
            <AlertSet className="test11" test={false} />
          </Alert>
        </main>
      </Alert.Provider>
    </div>
  );
};

export default AlertPage;

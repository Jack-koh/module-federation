import React from "react";
import { Modal, Button, Popover } from "lib/module/lib";

const ModalPage: React.FC = () => {
  const [value, onChange] = React.useState(false);

  return (
    <div style={{ padding: "10px 20px", width: "100%", height: "100%" }}>
      <Popover
        clickOutside
        clickInside
        content={() => {
          return (
            <div>
              팝오버
              <Modal
                content={({ closeHandler }: any) => {
                  return (
                    <Modal.Content>
                      <Modal.Summary>반갑습니다.1111</Modal.Summary>

                      <p>
                        Id sunt cupidatat sit elit deserunt cupidatat anim ipsum ad. Lorem quis enim in ipsum eiusmod
                        officia
                      </p>
                      <p>
                        voluptate et eiusmod nostrud cillum adipisicing nulla non. Labore aliquip proident cupidatat do
                        quis.
                      </p>

                      <Modal.Actions>
                        <Button onClick={closeHandler}>취소</Button>
                        <Button>확인</Button>
                      </Modal.Actions>
                    </Modal.Content>
                  );
                }}>
                <Button className="test">모달 버튼</Button>
              </Modal>
            </div>
          );
        }}>
        <Button className="popover-button">팝오버 버튼</Button>
      </Popover>

      <Modal
        content={({ closeHandler }: any) => {
          return (
            <Modal.Content>
              <Modal.Summary>반갑습니다.</Modal.Summary>

              <p>
                Id sunt cupidatat sit elit deserunt cupidatat anim ipsum ad. Lorem quis enim in ipsum eiusmod officia
              </p>
              <p>
                voluptate et eiusmod nostrud cillum adipisicing nulla non. Labore aliquip proident cupidatat do quis.
              </p>

              <Modal.Actions>
                <Button
                  onClick={() => {
                    closeHandler();
                  }}>
                  취소
                </Button>
                <Button>확인</Button>
              </Modal.Actions>
            </Modal.Content>
          );
        }}>
        <Button className="test" onClick={() => console.log("modal button click")}>
          모달 버튼
        </Button>
      </Modal>
    </div>
  );
};

export default ModalPage;

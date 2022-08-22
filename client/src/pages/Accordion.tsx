import React, { useState } from "react";
import { Accordion } from "lib/module/lib";

const AccordionPage: React.FC = () => {
  const [toggle, setToggle] = useState(true);
  return (
    <div style={{ padding: "10px 20px", width: "100%", height: "100%" }}>
      <Accordion toggleOnRow>
        <Accordion.Summary>title</Accordion.Summary>
        <Accordion.Collapse>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
        </Accordion.Collapse>
      </Accordion>

      <Accordion disabled>
        <Accordion.Summary>title</Accordion.Summary>
        <Accordion.Collapse>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
        </Accordion.Collapse>
      </Accordion>

      <Accordion>
        <Accordion.Summary>title</Accordion.Summary>
        <Accordion.Collapse>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
          <div>안녕하세요</div>
        </Accordion.Collapse>
      </Accordion>
    </div>
  );
};

export default AccordionPage;

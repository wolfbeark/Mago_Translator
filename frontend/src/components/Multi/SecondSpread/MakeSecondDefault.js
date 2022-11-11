/* eslint-disable */
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import SecondDefaultOptionSetting from "./SecondDefaultOptionSetting";
import SecondDefaultPreviewBox from "./SecondDefaultPreviewBox";

const MakeNewDefaultWrapper = styled(motion.div)`
  width: 40%;
  height: 80%;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
`;

const PreviewTitle = styled(motion.span)`
  width: 100%;
  height: 10%;
  background-color: violet;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const DefaultMakeBtnBox = styled(motion.div)`
  width: 100%;
  height: 10%;
  background-color: navajowhite;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DefaultMakeBtn = styled(motion.button)`
  width: 50%;
  height: 100%;
  background-color: darkred;
`;

function MakeSecondDefault() {
  const [openSetting, setOpenSetting] = useState(false);

  return (
    <MakeNewDefaultWrapper>
      <PreviewTitle>
        Default
        <SecondDefaultOptionSetting setOpenSetting={setOpenSetting} />
      </PreviewTitle>
      <SecondDefaultPreviewBox />
      <DefaultMakeBtnBox>
        <DefaultMakeBtn>START</DefaultMakeBtn>
      </DefaultMakeBtnBox>
      {/* {openSetting === true ? (
        <MultiOptionSetting setOpenSetting={setOpenSetting} />
      ) : null} */}
    </MakeNewDefaultWrapper>
  );
}

export default React.memo(MakeSecondDefault);

/* eslint-disable */
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import SecondCustomMakeBox from "./SecondCustomMakeBox";
const MakeSecondCustomWrapper = styled(motion.div)`
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
`;

const CustomMakeBtnBox = styled(motion.div)`
  width: 100%;
  height: 10%;
  background-color: navajowhite;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CustomMakeBtn = styled(motion.button)`
  width: 50%;
  height: 100%;
  background-color: darkred;
`;

function MakeSecondCustom() {
  const [isActiveQuest, setIsActiveQuest] = useState(false);

  return (
    <MakeSecondCustomWrapper>
      <PreviewTitle>Custom</PreviewTitle>
      <SecondCustomMakeBox
        isActiveQuest={isActiveQuest}
        setIsActiveQuest={setIsActiveQuest}
      />
      <CustomMakeBtnBox>
        <CustomMakeBtn
          onClick={() => {
            setIsActiveQuest(true);
          }}
        >
          Start
        </CustomMakeBtn>
      </CustomMakeBtnBox>
    </MakeSecondCustomWrapper>
  );
}

export default MakeSecondCustom;

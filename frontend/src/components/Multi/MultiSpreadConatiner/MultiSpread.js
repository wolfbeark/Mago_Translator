/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import { multiHeightSelector, multiManagerAtom } from "../../../atom/multiAtom";
import FirstSpread from "./FirstSpread";
import SecondSpread from "./SecondSpread";

const MultiSpreadWrapper = styled(motion.div)`
  width: 80%;
  height: 100%;
  background-color: skyblue;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`;

const SecondSpreadWrapper = styled(motion.div)`
  width: 98%;
  margin-top: 1%;
  margin-bottom: 1%;
  height: ${(props) =>
    props.longheight === "false" ? "100%" : `${props.defaultheight}px`};
  background-color: seagreen;
  display: ${(props) => (props.longheight === "false" ? "none" : "flex")};
`;
function MultiSpread() {
  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const firstRef = useRef();
  const [defaultHeight, setDefaultHeight] = useState(0);

  return (
    <MultiSpreadWrapper>
      <FirstSpread />
      <SecondSpread />
    </MultiSpreadWrapper>
  );
}

export default MultiSpread;

/* eslint-disable */

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import MakeSecondCustom from "./MakeSecondCustom";
import MakeSecondDefault from "./MakeSecondDefault";

const MakeSecondContainer = styled(motion.div)`
  width: 100%;
  height: 90%;
  background-color: teal;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

function MakeSecondModel() {
  return (
    <MakeSecondContainer>
      <MakeSecondCustom />
      <MakeSecondDefault />
    </MakeSecondContainer>
  );
}

export default MakeSecondModel;

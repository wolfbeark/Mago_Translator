import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import MakeNewDefault from "../MakeNewModel/MakeNewDefault";
import MakeNewCustom from "../MakeNewModel/MakeNewCustom";

const MakeNewModelContainer = styled(motion.div)`
  width: 100%;
  height: 90%;
  background-color: teal;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;

function MakeNewModel() {
  return (
    <MakeNewModelContainer>
      <MakeNewCustom />
      <MakeNewDefault />
    </MakeNewModelContainer>
  );
}

export default MakeNewModel;

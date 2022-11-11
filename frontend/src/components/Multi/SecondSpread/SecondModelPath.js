/* eslint-disable */

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const SecondPathContainer = styled(motion.div)`
  width: 100%;
  height: 5%;
  background-color: blueviolet;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 0.5%;
`;

function SecondModelPath() {
  return <SecondPathContainer>SecondModelPath</SecondPathContainer>;
}

export default SecondModelPath;

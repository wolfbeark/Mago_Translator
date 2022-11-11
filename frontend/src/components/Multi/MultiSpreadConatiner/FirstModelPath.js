import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { multiManagerAtom } from "../../../atom/multiAtom";

const FirstPathContainer = styled(motion.div)`
  width: 100%;
  height: 5%;
  background-color: blueviolet;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 0.5%;
`;

function FirstModelPath() {
  const multiManager = useRecoilValue(multiManagerAtom);
  return (
    <FirstPathContainer>{multiManager.CurrentModelNumber}</FirstPathContainer>
  );
}

export default FirstModelPath;

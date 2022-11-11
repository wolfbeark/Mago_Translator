/* eslint-disable */

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import { multiManagerAtom, multiModelAtom } from "../../../atom/multiAtom";
import MultiLeftItem from "./MultiLeftItem";

const MultiLeftTabWrapper = styled(motion.div)`
  width: 100%;
  height: 90%;
  background-color: aqua;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: scroll;
`;
const ModelName = styled.span`
  width: 100%;
  height: 10%;
  background-color: pink;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const TabItemWrapper = styled.div`
  width: 100%;
  height: 90%;
  background-color: sienna;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  overflow-y: scroll;
`;

const ModelTabItem = styled(motion.div)`
  width: 80%;
  height: 20%;
  background-color: blueviolet;
`;

function MultiLeftTab() {
  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const { CurrentModelNumber } = multiManager;
  const { CurrentChildNumber } = multiModel[CurrentModelNumber];

  const changeCurrentChildNumber = (num) => {
    if (CurrentChildNumber === num) {
      return;
    } else {
      let tempObj = JSON.parse(JSON.stringify(multiModel));
      tempObj[multiManager.CurrentModelNumber].CurrentChildNumber = num;
      setMultiModel(tempObj);
    }
  };
  return (
    <MultiLeftTabWrapper>
      <ModelName>{multiModel[CurrentModelNumber].modelName}</ModelName>
      <TabItemWrapper>
        {multiModel[CurrentModelNumber].thisModelChildNameArr.map((a, i) => {
          return (
            <MultiLeftItem
              key={`modelTabItem${i}${CurrentModelNumber}${multiModel[CurrentModelNumber].CurrentChildNumber}`}
              onClick={() => {
                changeCurrentChildNumber(i);
              }}
              count={i}
            >
              {a}
            </MultiLeftItem>
          );
        })}
      </TabItemWrapper>
    </MultiLeftTabWrapper>
  );
}

export default React.memo(MultiLeftTab);

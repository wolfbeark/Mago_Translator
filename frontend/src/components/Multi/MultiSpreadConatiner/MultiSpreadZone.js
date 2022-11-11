/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  multiFoldSelector,
  multiManagerAtom,
  multiModelAtom,
  multiModelSelector,
} from "../../../atom/multiAtom";
import SpreadScreen from "../SpreadScreen/SpreadScreen";

const MultiSpreadZoneWrapper = styled(motion.div)`
  width: 100%;
  height: 90%;
  background-color: orangered;
  position: relative;
`;
const FirstChildTabBox = styled(motion.div)`
  width: 100%;
  height: 25%;
  background-color: rgba(38, 222, 129, 0.2);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  top: 0;
  z-index: 1;
`;
const ChildTabItem = styled(motion.div)`
  width: 13%;
  height: 90%;
  background-color: aquamarine;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const ChildTabImg = styled(motion.div)`
  width: 50%;
  height: 80%;
  background-color: deeppink;
`;
const ChildTabName = styled(motion.span)`
  width: 100%;
  height: 20%;
  background-color: cadetblue;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ChildTabFoldBtn = styled(motion.button)`
  width: 5%;
  height: 5%;
  background-color: beige;
  position: absolute;
  top: 1%;
  left: 1%;
  z-index: 2;
`;

function MultiSpreadZone() {
  const multiManager = useRecoilValue(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);

  // 개별 스테이트 필요, => 리코일, multiModel 각자에 값 부여
  const [multiFold, setMultiSelector] = useRecoilState(
    multiModelSelector(multiManager.CurrentModelNumber)
  );
  const onChangeFold = () => {
    setMultiSelector(!multiFold);
  };
  const onChangeCurrentChildNum = (i) => {
    let tempObj = JSON.parse(JSON.stringify(multiModel));
    let tempChildObj = { ...tempObj[multiManager.CurrentModelNumber] };
    //console.log(tempChildObj);
    if (tempChildObj.CurrentChildNumber === i) {
      return;
    }
    tempChildObj.CurrentChildNumber = i;
    tempObj[multiManager.CurrentModelNumber] = tempChildObj;
    setMultiModel(tempObj);
  };

  useEffect(() => {}, [multiManager]);

  return (
    <MultiSpreadZoneWrapper>
      <ChildTabFoldBtn onClick={onChangeFold}>Fold</ChildTabFoldBtn>
      {multiFold === false ? (
        <FirstChildTabBox>
          {multiModel[
            multiManager.CurrentModelNumber
          ].thisModelChildNameArr.map((a, i) => {
            return (
              <ChildTabItem
                key={`childTabItem${i}`}
                onClick={(e) => {
                  //e.preventDefault();
                  onChangeCurrentChildNum(i);
                }}
                style={
                  multiModel[multiManager.CurrentModelNumber]
                    .CurrentChildNumber === i
                    ? {
                        backgroundColor: "orange",
                      }
                    : {
                        backgroundColor: "blue",
                      }
                }
              >
                <ChildTabImg></ChildTabImg>
                <ChildTabName>{a}</ChildTabName>
              </ChildTabItem>
            );
          })}
        </FirstChildTabBox>
      ) : null}
      <SpreadScreen />
    </MultiSpreadZoneWrapper>
  );
}

export default MultiSpreadZone;

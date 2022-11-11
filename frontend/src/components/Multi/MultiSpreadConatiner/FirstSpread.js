/* eslint-disable */
import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  multiManagerAtom,
  multiModelAtom,
  multiHeightSelector,
} from "../../../atom/multiAtom";
import FirstModelTab from "./FirstModelTab";
import FirstModelPath from "./FirstModelPath";
import MakeNewModel from "./MakeNewModel";
import MultiSpreadZone from "./MultiSpreadZone";

const FirstSpreadWrapper = styled(motion.div)`
  width: 98%;
  margin-top: 1%;
  margin-bottom: 1%;
  height: ${(props) =>
    props.longheight === "false" ? "100%" : `${props.defaultheight}px`};
  background-color: coral;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1%;
`;
const FirstSpreadContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
`;

function FirstSpread() {
  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const firstRef = useRef();
  const multiHeight = useRecoilValue(
    multiHeightSelector(multiManager.CurrentModelNumber)
  );
  const { CurrentModelNumber } = multiManager;
  const { CurrentChildNumber, SecondSpread } = multiModel[CurrentModelNumber];
  // const testHeight =
  //   multiModel[CurrentModelNumber].TabOpenInfoArr[CurrentChildNumber][
  //     CurrentChildNumber
  //   ].isLongHeight;
  const testHeight = SecondSpread[CurrentChildNumber].isLongHeight;

  useEffect(() => {
    if (multiManager.SpreadDefaultHeight === 0) {
      let temp = firstRef.current.getBoundingClientRect();
      setMultiManager((prev) => {
        let tempObj = { ...prev };
        tempObj.SpreadDefaultHeight = temp.height;
        return tempObj;
      });
    }
  }, [multiManager]);

  return (
    <FirstSpreadWrapper
      ref={firstRef}
      defaultheight={multiManager.SpreadDefaultHeight}
      longheight={testHeight === true ? "true" : "false"}
    >
      <FirstSpreadContainer>
        <FirstModelTab />
        <FirstModelPath />
        {multiModel[multiManager.CurrentModelNumber].modelDefined === false ? (
          <MakeNewModel></MakeNewModel>
        ) : (
          <MultiSpreadZone />
        )}
      </FirstSpreadContainer>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100px",
          height: "auto",
          backgroundColor: "blue",
        }}
      >
        test
      </div>
    </FirstSpreadWrapper>
  );
}

export default FirstSpread;

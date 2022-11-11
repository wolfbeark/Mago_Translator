/* eslint-disable */
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  multiHeightSelector,
  multiManagerAtom,
  multiModelAtom,
} from "../../../atom/multiAtom";

import SecondModelTab from "../SecondSpread/SecondModelTab";
import SecondModelPath from "../SecondSpread/SecondModelPath";
import MakeSecondModel from "../SecondSpread/MakeSecondModel";
import SecondSpreadZone from "../SecondSpread/SecondSpreadZone";

const SecondSpreadWrapper = styled(motion.div)`
  width: 98%;
  margin-top: 1%;
  margin-bottom: 1%;
  height: ${(props) =>
    props.longheight === "false" ? "100%" : `${props.defaultheight}px`};
  background-color: coral;
  display: ${(props) => (props.longheight === "false" ? "none" : "flex")};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1%;
`;

const SecondSpreadContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
`;

function SecondSpread() {
  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const multiHeight = useRecoilValue(
    multiHeightSelector(multiManager.CurrentModelNumber)
  );
  const spreadRef = useRef();

  const { CurrentModelNumber } = multiManager;
  const { CurrentChildNumber, TabOpenInfoArr, SecondSpread } =
    multiModel[CurrentModelNumber];
  // const testHeight =
  //   multiModel[CurrentModelNumber].TabOpenInfoArr[CurrentChildNumber][
  //     CurrentChildNumber
  //   ].isLongHeight;
  const testHeight = SecondSpread[CurrentChildNumber].isLongHeight;
  // useEffect(() => {
  //   let tempObj = spreadRef.current.getBoundingClientRect();
  //   console.log("second spread ", tempObj);
  // }, [multiHeight]);
  return (
    <>
      {
        //TabOpenInfoArr[CurrentChildNumber][CurrentChildNumber].isLongHeight === true
        testHeight === true ? (
          <SecondSpreadWrapper
            ref={spreadRef}
            defaultheight={multiManager.SpreadDefaultHeight}
            longheight={testHeight === true ? "true" : "false"}
          >
            <SecondSpreadContainer>
              <SecondModelTab />
              <SecondModelPath />
              {SecondSpread[CurrentChildNumber].isDefined === false ? (
                <MakeSecondModel></MakeSecondModel>
              ) : (
                <SecondSpreadZone />
              )}
            </SecondSpreadContainer>
          </SecondSpreadWrapper>
        ) : null
      }
    </>
  );
}

export default SecondSpread;

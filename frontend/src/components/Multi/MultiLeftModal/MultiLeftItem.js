/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { animateScroll } from "react-scroll";
import { useRecoilState, useRecoilValue } from "recoil";
import { multiManagerAtom, multiModelAtom } from "../../../atom/multiAtom";

const MultiLeftItemWrapper = styled(motion.div)`
  width: 80%;
  min-height: 10%;
  max-height: 10%;
  background-color: blueviolet;
`;
const MutliFirstItems = styled(motion.div)`
  width: 80%;
  height: 100%;
  min-height: 50%;
  max-height: 50%;
  background-color: bisque;
`;
const CreateSecondBox = styled(motion.div)`
  width: 100%;
  height: 10%;
  background-color: darkgreen;
`;
function MultiLeftItem(props) {
  const count = props.count;
  const multiManager = useRecoilValue(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const { CurrentModelNumber } = multiManager;
  const { CurrentChildNumber, TabOpenInfoArr, SecondSpread } =
    multiModel[CurrentModelNumber];

  const openTabItem = () => {
    let temp = JSON.parse(JSON.stringify(multiModel));
    let tempSecond = JSON.parse(JSON.stringify(SecondSpread));
    let flag =
      temp[CurrentModelNumber].TabOpenInfoArr[CurrentChildNumber][count].isOpen;
    temp[CurrentModelNumber].TabOpenInfoArr[CurrentChildNumber][count].isOpen =
      !flag;
    temp[CurrentModelNumber].CurrentChildNumber = count;
    setMultiModel(temp);
    //tempSecond[CurrentChildNumber].is
  };

  const createSecondSpread = () => {
    // if (TabOpenInfoArr[CurrentChildNumber][count].isLongHeight === true) {
    //   return;
    // } else {
    //   animateScroll.scrollToBottom({ duration: 1000, smooth: true });
    //   // let tempObj = JSON.parse(JSON.stringify(multiModel));
    //   // tempObj[CurrentModelNumber].TabOpenInfoArr[CurrentChildNumber][
    //   //   count
    //   // ].isLongHeight = true;

    //   let tempObj = JSON.parse(JSON.stringify(multiModel));
    //   tempObj[CurrentModelNumber].SecondSpread[
    //     CurrentChildNumber
    //   ].isLongHeight = true;

    //   setMultiModel(tempObj);
    // }

    if (SecondSpread[CurrentChildNumber].isLongHeight === true) {
      return;
    } else {
      animateScroll.scrollToBottom({ duration: 1000, smooth: true });
      let tempObj = JSON.parse(JSON.stringify(multiModel));
      tempObj[CurrentModelNumber].SecondSpread[
        CurrentChildNumber
      ].isLongHeight = true;
      setMultiModel(tempObj);
    }
  };

  return (
    <>
      <MultiLeftItemWrapper
        style={
          CurrentChildNumber === count
            ? { backgroundColor: "red" }
            : { backgroundColor: "blueviolet" }
        }
        onClick={() => {
          openTabItem();
        }}
      >
        {
          multiModel[multiManager.CurrentModelNumber].thisModelChildNameArr[
            count
          ]
        }
      </MultiLeftItemWrapper>
      {TabOpenInfoArr[
        multiModel[multiManager.CurrentModelNumber].CurrentChildNumber
      ][count].isOpen === true &&
      multiModel[multiManager.CurrentModelNumber].CurrentChildNumber ===
        count ? (
        <MutliFirstItems>
          {SecondSpread[CurrentChildNumber].isLongHeight === false ? (
            <CreateSecondBox onClick={createSecondSpread}>
              Create Second
            </CreateSecondBox>
          ) : null}
        </MutliFirstItems>
      ) : null}
    </>
  );
}

export default MultiLeftItem;

/* eslint-disable */
import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { animateScroll } from "react-scroll";
import { useRecoilState, useRecoilValue } from "recoil";

import MultiLeft from "../components/Multi/MultiLeftModal/MultiLeft";
import MultiSpread from "../components/Multi/MultiSpreadConatiner/MultiSpread";
import {
  multiHeightSelector,
  multiManagerAtom,
  multiModelAtom,
  secondManagerAtom,
} from "../atom/multiAtom";

const MultiWrapper = styled.div`
  width: 100%;
  height: ${(props) => (props.longheight === "true" ? "200vh" : "100vh")};
  background-color: red;
`;
const backgroundAni = keyframes`
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
`;
const MultiBackgroundBox = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    ${(props) => props.theme.gra1},
    ${(props) => props.theme.gra2},
    ${(props) => props.theme.gra3},
    ${(props) => props.theme.gra4}
  );
  background-size: 500% 500%;
  animation: ${backgroundAni} 15s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MultiContainer = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
`;
const MultiHeader = styled(motion.div)`
  width: 100%;
  height: ${(props) => (props.longheight === "false" ? "5%" : "2.5%")};
  background-color: rgba(0, 0, 0, 0.2);
`;
const MultiMainContainer = styled(motion.div)`
  width: 100%;
  //height: ${(props) => (props.longheight === "false" ? "100%" : "50%")};
  height: 100%;
  background-color: rgba(123, 123, 112, 0.2);
  display: flex;
  justify-content: space-evenly;
  align-items: flex-start;
`;

function Multi() {
  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const [secondManager, setSecondManager] = useRecoilState(secondManagerAtom);
  const [multiHeight, setMultiHeight] = useRecoilState(
    multiHeightSelector(multiManager.CurrentModelNumber)
  );
  const { CurrentModelNumber } = multiManager;
  const { CurrentChildNumber, SecondSpread } = multiModel[CurrentModelNumber];
  // const isLongHeight =
  //   multiModel[CurrentModelNumber].TabOpenInfoArr[CurrentChildNumber][
  //     CurrentChildNumber
  //   ].isLongHeight;
  const isLongHeight = SecondSpread[CurrentChildNumber].isLongHeight;

  // const selectedTabItemNumArr =
  //   multiModel[CurrentModelNumber].SelectedTabItemNumArr[CurrentChildNumber];
  // console.log(selectedTabItemNumArr);

  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = "";
  };

  // const temp1 = new Array(5);
  // temp1.fill(new Array(5));
  // temp1[0][0] = false;
  // console.log(temp1);

  useEffect(() => {
    let flag = localStorage.getItem("MultiLoginHistory");
    if (flag === null || flag === "false") {
      localStorage.setItem("MultiLoginHistory", "true");
    }
  }, []);
  useEffect(() => {
    (() => {
      window.addEventListener("beforeunload", preventClose);
    })();
    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
  }, []);

  // useEffect로 Recoil multiManger Default값들 localstorage에서
  // 가져와야함 22.10.30
  useEffect(() => {
    // multiManager
    let tempObj = JSON.parse(JSON.stringify(multiManager));
    let flag = localStorage.getItem("DefaultPreviewThree");
    tempObj.DefaultDeckType = Number(localStorage.getItem("DefaultDeckType"));
    tempObj.DefaultCardCount = Number(localStorage.getItem("DefaultCardCount"));
    tempObj.DefaultPreviewThree = flag === "false" ? false : true;

    //console.log(localStorage.getItem("DefaultPreviewThree"));
    tempObj.CurrentModelNumber = multiManager.CurrentModelNumber;
    tempObj.DefaultNameArr[0] = localStorage.getItem("DefaultListName1");
    tempObj.DefaultNameArr[1] = localStorage.getItem("DefaultListName2");
    tempObj.DefaultNameArr[2] = localStorage.getItem("DefaultListName3");
    tempObj.DefaultNameArr[3] = localStorage.getItem("DefaultListName4");
    tempObj.DefaultNameArr[4] = localStorage.getItem("DefaultListName5");
    setMultiManager(tempObj);

    // second manager
    let tempObj2 = JSON.parse(JSON.stringify(secondManager));
    let flag2 = localStorage.getItem("SecondDefaultPreviewThree");
    tempObj2.DefaultDeckType = Number(
      localStorage.getItem("SecondDefaultDeckType")
    );
    tempObj2.DefaultCardCount = Number(
      localStorage.getItem("SecondDefaultCardCount")
    );
    tempObj2.DefaultPreviewThree = flag2 === "false" ? false : true;

    //console.log(localStorage.getItem("DefaultPreviewThree"));
    tempObj2.CurrentModelNumber = multiManager.CurrentModelNumber;
    tempObj2.DefaultNameArr[0] = localStorage.getItem("SecondDefaultListName1");
    tempObj2.DefaultNameArr[1] = localStorage.getItem("SecondDefaultListName2");
    tempObj2.DefaultNameArr[2] = localStorage.getItem("SecondDefaultListName3");
    tempObj2.DefaultNameArr[3] = localStorage.getItem("SecondDefaultListName4");
    tempObj2.DefaultNameArr[4] = localStorage.getItem("SecondDefaultListName5");
    setSecondManager(tempObj2);
  }, []);

  const changeHeight = () => {
    if (multiModel[CurrentModelNumber].isLongHeight === true) {
      return;
    } else {
      animateScroll.scrollToBottom({ duration: 1000, smooth: true });
      let tempObj = JSON.parse(JSON.stringify(multiModel));
      tempObj[CurrentModelNumber].isLongHeight = true;
      setMultiModel(tempObj);
    }
  };

  return (
    <MultiWrapper longheight={isLongHeight === true ? "true" : "false"}>
      <MultiBackgroundBox>
        <MultiContainer>
          <MultiHeader longheight={isLongHeight === true ? "true" : "false"}>
            <button
              onClick={(e) => {
                e.preventDefault();
                changeHeight();
              }}
            >
              Test
            </button>
          </MultiHeader>
          <MultiMainContainer
            longheight={isLongHeight === true ? "true" : "false"}
          >
            <MultiLeft />
            <MultiSpread />
          </MultiMainContainer>
        </MultiContainer>
      </MultiBackgroundBox>
    </MultiWrapper>
  );
}

export default Multi;

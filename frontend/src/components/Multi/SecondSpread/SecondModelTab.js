/* eslint-disable*/
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { multiManagerAtom, multiModelAtom } from "../../../atom/multiAtom";

const SecondModelTabContainer = styled(motion.div)`
  width: 100%;
  height: 5%;
  background-color: gray;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding-left: 0.5%;
`;
const SecondModelTabItem = styled(motion.div)`
  width: 15%;
  height: 90%;
  background-color: red;
  border-radius: 5px 5px 0 0;
  display: flex;
  align-items: center;
  justify-content: left;
  padding-left: 1%;
  margin-right: 0.2%;
`;

function SecondModelTab() {
  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const { CurrentModelNumber } = multiManager;
  const { CurrentChildNumber, SecondSpread } = multiModel[CurrentModelNumber];

  const changeCurrentSelectNum = (num) => {
    if (SecondSpread[CurrentChildNumber].CurrentSelectNum === num) {
      return;
    } else {
      let tempObj = JSON.parse(JSON.stringify(multiModel));
      tempObj[CurrentModelNumber].SecondSpread[
        CurrentChildNumber
      ].CurrentSelectNum = num;
      setMultiModel(tempObj);
    }
  };
  return (
    <SecondModelTabContainer>
      {SecondSpread[CurrentChildNumber].isDefined === true
        ? SecondSpread[CurrentChildNumber].SecondModelTabNameArr.map((a, i) => {
            return (
              <SecondModelTabItem
                key={`secondModelName${CurrentModelNumber}${CurrentChildNumber}${i}`}
                style={
                  SecondSpread[CurrentChildNumber].CurrentSelectNum === i
                    ? {
                        backgroundColor: "whitesmoke",
                      }
                    : {
                        backgroundColor: "red",
                      }
                }
                onClick={() => {
                  changeCurrentSelectNum(i);
                }}
              >
                {a}
              </SecondModelTabItem>
            );
          })
        : null}
    </SecondModelTabContainer>
  );
}

export default SecondModelTab;

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import { multiManagerAtom, multiModelAtom } from "../../../atom/multiAtom";

const FirstModelTabContainer = styled(motion.div)`
  width: 100%;
  height: 5%;
  background-color: gray;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  padding-left: 0.5%;
`;

const FirstModelTabItem = styled(motion.div)`
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

function FirstModelTab() {
  const multiModel = useRecoilValue(multiModelAtom);
  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);

  const onClickTabHandler = (i) => {
    let num = i;
    if (multiManager.ExistModelCount === 0) {
      return;
    } else {
      let tempObj = JSON.parse(JSON.stringify(multiManager));
      tempObj.CurrentModelNumber = num;
      setMultiManager(tempObj);
    }
  };
  return (
    <FirstModelTabContainer>
      {multiManager.ExistModelCount !== 0 && multiModel.length >= 1 ? (
        <>
          {multiModel.map((a, i) => {
            return (
              <FirstModelTabItem
                key={`modelTabItem${i}`}
                onClick={(e) => {
                  //e.preventDefault();
                  onClickTabHandler(i);
                }}
                style={
                  i === multiManager.CurrentModelNumber
                    ? {
                        backgroundColor: "whitesmoke",
                      }
                    : {
                        backgroundColor: "red",
                      }
                }
              >
                {a.modelName}
              </FirstModelTabItem>
            );
          })}
        </>
      ) : null}
    </FirstModelTabContainer>
  );
}

export default FirstModelTab;

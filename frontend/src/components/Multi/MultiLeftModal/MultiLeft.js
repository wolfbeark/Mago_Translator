/* eslint-disable */
import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  multiHeightSelector,
  multiManagerAtom,
  multiModelAtom,
  multiModelPrefabAtom,
} from "../../../atom/multiAtom";
import MultiLeftTab from "./MultiLeftTab";

const MultiLeftWrapper = styled(motion.div)`
  position: sticky;
  width: 15%;
  height: ${(props) => (props.longheight === "false" ? "96%" : "47%")};
  background-color: yellow;
  //margin-bottom: 2%;
  top: 3%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CreateNewModelBtn = styled(motion.button)`
  width: 85%;
  height: 10%;
  background-color: aquamarine;
`;

function MultiLeft() {
  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const modelPrefab = useRecoilValue(multiModelPrefabAtom);
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

  const onCreateModelHandler = () => {
    if (multiManager.ExistModelCount <= 5) {
      let tempTabInfo = {
        isOpen: false,
        isCreated: false,
        isLongHeight: false,
      };
      let tempManager = JSON.parse(JSON.stringify(multiManager));
      let tempMulti = JSON.parse(JSON.stringify(multiModel));
      let tempModelPrefab = JSON.parse(JSON.stringify(modelPrefab));

      tempManager.ExistModelCount++;
      tempManager.CurrentModelNumber = tempMulti.length;

      tempModelPrefab.modelID = tempMulti.length;

      //
      let tabTempInfoArr = new Array(5);
      for (let tabInfo = 0; tabInfo < 5; tabInfo++) {
        let tempArr = new Array(5);
        for (let i = 0; i < 5; i++) {
          tempArr[i] = tempTabInfo;
        }
        tabTempInfoArr[tabInfo] = tempArr;
      }
      //console.log(tabTempInfoArr);

      tempModelPrefab.TabOpenInfoArr = [...tabTempInfoArr];
      //

      tempMulti.push(tempModelPrefab);
      setMultiManager(tempManager);
      setMultiModel(tempMulti);
    }
  };
  return (
    <MultiLeftWrapper longheight={testHeight === true ? "true" : "false"}>
      {/* {multiManager.ExistModelCount === 1 &&
      multiModel[0].modelDefined === true ? (
        <CreateNewModelBtn onClick={onCreateModelHandler}>
          Create
        </CreateNewModelBtn>
      ) : null} */}

      {multiManager.ExistModelCount < 5 ? (
        multiModel[multiModel.length - 1].modelDefined === true ? (
          <>
            <CreateNewModelBtn onClick={onCreateModelHandler}>
              Create
            </CreateNewModelBtn>
          </>
        ) : null
      ) : null}
      {multiManager.ExistModelCount >= 1 &&
      multiModel[multiManager.CurrentModelNumber].modelDefined === true ? (
        <MultiLeftTab />
      ) : null}
      {/* {multiManager.CurrentModelNumber}
      {multiModel[multiManager.CurrentModelNumber].thisModelDeckType} */}
    </MultiLeftWrapper>
  );
}

export default React.memo(MultiLeft);

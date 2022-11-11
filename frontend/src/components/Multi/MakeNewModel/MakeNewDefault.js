/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

import DefaultPreviewBox from "./DefaultPreviewBox";
import { useRecoilState } from "recoil";
import { multiManagerAtom, multiModelAtom } from "../../../atom/multiAtom";
import DefaultOptionSetting from "./DefaultOptionSetting";
import MultiOptionSetting from "./MultiOptionSetting";

const MakeNewDefaultWrapper = styled(motion.div)`
  width: 40%;
  height: 80%;
  background-color: aliceblue;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  position: relative;
`;

const PreviewTitle = styled(motion.span)`
  width: 100%;
  height: 10%;
  background-color: violet;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const DefaultMakeBtnBox = styled(motion.div)`
  width: 100%;
  height: 10%;
  background-color: navajowhite;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const DefaultMakeBtn = styled(motion.button)`
  width: 50%;
  height: 100%;
  background-color: darkred;
`;

function MakeNewDefault() {
  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);

  const [openSetting, setOpenSetting] = useState(false);

  const onMakeModelHandler = () => {
    if (multiManager.ExistModelCount <= 5) {
      let tempNumArr = [];
      let tempManager = JSON.parse(JSON.stringify(multiManager));
      let tempModelManager = JSON.parse(JSON.stringify(multiModel));
      // 테스트 코드
      // CardInfoArr
      let tempCardInfo = {
        // Decktype 1,2
        isDraged: false,
        isFlip: false,
        isInSpread: true,
        isRotate: false,
        newIdx: 0,
        privateX: 0,
        privateY: 0,
      };
      let rotateCardInfo = {
        // Decktype 3,
        isDraged: false,
        isFlip: false,
        isInSpread: true,
        isRotate: true,
        newIdx: 0,
        privateX: 0,
        privateY: 0,
      };
      let tempCardInfo2 = {
        // Decktype 0, free
        isDraged: false,
        isFlip: false,
        isInSpread: false,
        isRotate: false,
        newIdx: 0,
        privateX: 0,
        privateY: 0,
      };
      let tempTabInfo = {
        isOpen: false,
        isCreated: false,
        isLongHeight: false,
      };
      if (multiManager.ExistModelCount === 1) {
        // 최초 생성
        //model
        tempModelManager[0].modelName = "Make - 1";
        tempModelManager[0].modelDefined = true;
        tempModelManager[0].thisModelDeckType = multiManager.DefaultDeckType;
        tempModelManager[0].thisModelTotalCardCount =
          multiManager.DefaultCardCount;
        tempModelManager[0].thisModelPreviewThree =
          multiManager.DefaultPreviewThree;
        tempModelManager[0].thisModelChildNameArr = [
          ...multiManager.DefaultNameArr,
        ];
        tempModelManager[0].firstCardCount = multiManager.DefaultCardCount;
        tempModelManager[0].extraCardCount = 0;

        // Preview Three Card Number
        if (multiManager.DefaultPreviewThree === true) {
          let totalTempArr = new Array(5);
          for (let k = 0; k < 5; k++) {
            let tempArr = new Array(3);
            for (let i = 0; i < 3; i++) {
              let ranNum = Math.floor(Math.random() * 78);
              tempArr[i] = ranNum;
              for (let j = 0; j < i; j++) {
                if (tempArr[j] === tempArr[i]) {
                  i--;
                  break;
                }
              }
            }
            totalTempArr[k] = tempArr;
          }

          tempModelManager[0].thisModelPreviewThreeNumArr = [...totalTempArr];
        }

        // random number generate
        for (let b = 0; b < 5; b++) {
          let tempArr2 = new Array(multiManager.DefaultCardCount);
          for (let c = 0; c < tempArr2.length; c++) {
            let tempNum = Math.floor(Math.random() * 78);
            tempArr2[c] = tempNum;
            for (let d = 0; d < c; d++) {
              if (tempArr2[d] === tempArr2[c]) {
                c--;
                break;
              }
            }
          }
          tempNumArr.push(tempArr2);
        }

        // Card Info Arr
        let tempCardInfoArr = new Array(5);

        if (multiManager.DefaultDeckType === 3) {
          // Celtic
          for (let b = 0; b < 5; b++) {
            let tempArr = new Array(multiManager.DefaultCardCount);
            for (let c = 0; c < tempArr.length; c++) {
              if (c === 2) {
                tempArr[c] = rotateCardInfo;
              } else {
                tempArr[c] = tempCardInfo;
              }
            }
            tempCardInfoArr[b] = tempArr;
          }
        } else if (
          multiManager.DefaultDeckType !== 0 &&
          multiManager.DefaultDeckType !== 3
        ) {
          // Three, Seven
          for (let b = 0; b < 5; b++) {
            let tempArr = new Array(multiManager.DefaultCardCount);
            for (let c = 0; c < tempArr.length; c++) {
              tempArr[c] = tempCardInfo;
            }
            tempCardInfoArr[b] = tempArr;
          }
        } else if (multiManager.DefaultDeckType === 0) {
          //free
          for (let b = 0; b < 5; b++) {
            let tempArr = new Array(multiManager.DefaultCardCount);
            for (let c = 0; c < tempArr.length; c++) {
              let tempObj = { ...tempCardInfo2 };
              tempObj.newIdx = tempArr.length - c;
              tempArr[c] = tempObj;
            }
            tempCardInfoArr[b] = tempArr;
          }
        }
        if (multiManager.DefaultDeckType !== 0) {
          let tempRemainCountArr = new Array(5);
          for (let i = 0; i < 5; i++) {
            tempRemainCountArr[i] = 0;
          }
          tempModelManager[0].remainCardCount = [...tempRemainCountArr];
        } else if (multiManager.DefaultDeckType === 0) {
          let tempRemainCountArr = new Array(5);
          for (let i = 0; i < 5; i++) {
            tempRemainCountArr[i] = multiManager.DefaultCardCount;
          }
          tempModelManager[0].remainCardCount = [...tempRemainCountArr];
        }
        let tabTempInfoArr = new Array(5);
        for (let tabInfo = 0; tabInfo < 5; tabInfo++) {
          let tempArr = new Array(5);
          for (let i = 0; i < 5; i++) {
            tempArr[i] = tempTabInfo;
          }
          tabTempInfoArr[tabInfo] = tempArr;
        }
        tempModelManager[0].TabOpenInfoArr = [...tabTempInfoArr];
        tempModelManager[0].thisModelFirstCardInfoArr = [...tempCardInfoArr];
        tempModelManager[0].thisModelFirstNumArr = [...tempNumArr];
        setMultiModel(tempModelManager);
      } else if (multiManager.ExistModelCount !== 1) {
        //model
        tempModelManager[multiManager.CurrentModelNumber].modelName = `Make - ${
          multiManager.CurrentModelNumber + 1
        }`;
        tempModelManager[multiManager.CurrentModelNumber].modelDefined = true;
        tempModelManager[multiManager.CurrentModelNumber].thisModelDeckType =
          multiManager.DefaultDeckType;
        tempModelManager[
          multiManager.CurrentModelNumber
        ].thisModelTotalCardCount = multiManager.DefaultCardCount;
        tempModelManager[
          multiManager.CurrentModelNumber
        ].thisModelPreviewThree = multiManager.DefaultPreviewThree;
        tempModelManager[
          multiManager.CurrentModelNumber
        ].thisModelChildNameArr = [...multiManager.DefaultNameArr];

        tempModelManager[multiManager.CurrentModelNumber].firstCardCount =
          multiManager.DefaultCardCount;
        tempModelManager[multiManager.CurrentModelNumber].extraCardCount = 0;
        // Preview Three Card Number
        if (multiManager.DefaultPreviewThree === true) {
          let totalTempArr = new Array(5);
          for (let k = 0; k < 5; k++) {
            let tempArr = new Array(3);
            for (let i = 0; i < 3; i++) {
              let ranNum = Math.floor(Math.random() * 78);
              tempArr[i] = ranNum;
              for (let j = 0; j < i; j++) {
                if (tempArr[j] === tempArr[i]) {
                  i--;
                  break;
                }
              }
            }
            totalTempArr[k] = tempArr;
          }
          tempModelManager[
            multiManager.CurrentModelNumber
          ].thisModelPreviewThreeNumArr = [...totalTempArr];
        }
        // random number generate
        for (let b = 0; b < 5; b++) {
          let tempArr2 = new Array(multiManager.DefaultCardCount);
          for (let c = 0; c < tempArr2.length; c++) {
            let tempNum = Math.floor(Math.random() * 78);
            tempArr2[c] = tempNum;
            for (let d = 0; d < c; d++) {
              if (tempArr2[d] === tempArr2[c]) {
                c--;
                break;
              }
            }
          }
          tempNumArr.push(tempArr2);
        }

        let tempCardInfoArr = new Array(5);
        if (multiManager.DefaultDeckType === 3) {
          // Celtic
          for (let b = 0; b < 5; b++) {
            let tempArr = new Array(multiManager.DefaultCardCount);
            for (let c = 0; c < tempArr.length; c++) {
              if (c === 2) {
                tempArr[c] = rotateCardInfo;
              } else {
                tempArr[c] = tempCardInfo;
              }
            }
            tempCardInfoArr[b] = tempArr;
          }
        } else if (
          multiManager.DefaultDeckType !== 0 &&
          multiManager.DefaultDeckType !== 3
        ) {
          // Three, Seven
          for (let b = 0; b < 5; b++) {
            let tempArr = new Array(multiManager.DefaultCardCount);
            for (let c = 0; c < tempArr.length; c++) {
              tempArr[c] = tempCardInfo;
            }
            tempCardInfoArr[b] = tempArr;
          }
        } else if (multiManager.DefaultDeckType === 0) {
          // Free
          for (let b = 0; b < 5; b++) {
            let tempArr = new Array(multiManager.DefaultCardCount);
            for (let c = 0; c < tempArr.length; c++) {
              let tempObj = { ...tempCardInfo2 };
              tempObj.newIdx = tempArr.length - c;
              tempArr[c] = tempObj;
            }
            tempCardInfoArr[b] = tempArr;
          }
        }
        if (multiManager.DefaultDeckType !== 0) {
          let tempRemainCountArr = new Array(5);
          for (let i = 0; i < 5; i++) {
            tempRemainCountArr[i] = 0;
          }
          tempModelManager[multiManager.CurrentModelNumber].remainCardCount = [
            ...tempRemainCountArr,
          ];
        } else if (multiManager.DefaultDeckType === 0) {
          let tempRemainCountArr = new Array(5);
          for (let i = 0; i < 5; i++) {
            tempRemainCountArr[i] = multiManager.DefaultCardCount;
          }
          tempModelManager[multiManager.CurrentModelNumber].remainCardCount = [
            ...tempRemainCountArr,
          ];
        }

        let tabTempInfoArr = new Array(5);
        for (let tabInfo = 0; tabInfo < 5; tabInfo++) {
          let tempArr = new Array(5);
          for (let i = 0; i < 5; i++) {
            tempArr[i] = tempTabInfo;
          }
          tabTempInfoArr[tabInfo] = tempArr;
        }
        tempModelManager[multiManager.CurrentModelNumber].TabOpenInfoArr = [
          ...tabTempInfoArr,
        ];

        tempModelManager[
          multiManager.CurrentModelNumber
        ].thisModelFirstCardInfoArr = [...tempCardInfoArr];
        tempModelManager[multiManager.CurrentModelNumber].thisModelFirstNumArr =
          [...tempNumArr];
        console.log(
          tempModelManager[multiManager.CurrentModelNumber]
            .thisModelFirstCardInfoArr
        );
        console.log(tempCardInfoArr);
        setMultiModel(tempModelManager);
      }
    }
  };

  return (
    <MakeNewDefaultWrapper>
      <PreviewTitle>
        Default
        <DefaultOptionSetting setOpenSetting={setOpenSetting} />
      </PreviewTitle>
      <DefaultPreviewBox />
      <DefaultMakeBtnBox>
        <DefaultMakeBtn onClick={onMakeModelHandler}>START</DefaultMakeBtn>
      </DefaultMakeBtnBox>
      {openSetting === true ? (
        <MultiOptionSetting setOpenSetting={setOpenSetting} />
      ) : null}
    </MakeNewDefaultWrapper>
  );
}

export default React.memo(MakeNewDefault);

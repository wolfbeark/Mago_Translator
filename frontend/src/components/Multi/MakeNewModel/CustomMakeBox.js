/* eslint-disable */
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  multiManagerAtom,
  multiModelAtom,
  multiModelPrefabAtom,
} from "../../../atom/multiAtom";

const CustomMakeBoxWrapper = styled(motion.div)`
  width: 100%;
  height: 80%;
  background-color: coral;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const NameSettingBox = styled(motion.div)`
  width: 100%;
  height: 60%;
  background-color: darkgreen;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const NameItem = styled(motion.div)`
  width: 100%;
  height: 15%;
  background-color: cadetblue;
  display: flex;
  align-items: center;
`;
const NameItemOrder = styled(motion.label)`
  width: 20%;
  height: 100%;
  background-color: blanchedalmond;
`;
const NameItemValue = styled(motion.input)`
  width: 80%;
  height: 100%;
  background-color: chartreuse;
`;

const CustomOptionBox = styled(motion.div)`
  width: 100%;
  height: 40%;
  background-color: indigo;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const OptionBox = styled(motion.div)`
  width: 100%;
  height: 30%;
  background-color: lightblue;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const OptionName = styled(motion.span)`
  width: 20%;
  height: 100%;
  background-color: lemonchiffon;
`;
const OptionInput = styled(motion.input)`
  width: 80%;
  height: 100%;
`;
const OptionSettingBox = styled(motion.div)`
  width: 80%;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  background-color: mediumseagreen;
`;
const OptionSettingItemBox = styled(motion.div)`
  width: 25%;
  height: 100%;
  background-color: lightslategray;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OptionToggleBox = styled(motion.div)`
  width: 20%;
  height: 100%;
  background-color: darkcyan;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const OptionToggleBtn = styled(motion.div)`
  width: 100%;
  height: 50%;
  background-color: skyblue;
`;
const OptionToggleName = styled(motion.span)`
  width: 80%;
  height: 100%;
  background-color: orange;
`;

const QuestionCustomMakeBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: coral;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const QuestionMake = styled(motion.span)`
  width: 100%;
  height: 30%;
  background-color: burlywood;
`;
const QuestionCaution = styled(motion.span)`
  width: 100%;
  height: 10%;
  background-color: blue;
`;
const QuestionBtnBox = styled(motion.div)`
  width: 100%;
  height: 10%;
  display: flex;
  background-color: cornflowerblue;
  justify-content: space-evenly;
  align-items: center;
`;
const QuestionBtn = styled(motion.button)`
  width: 30%;
  height: 100%;
  background-color: aquamarine;
`;

const ErrorBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: aliceblue;
  position: absolute;
`;

const btnVar = {
  active: {
    backgroundColor: "rgba(5, 196, 107, 1.0)",
  },
  inactive: {
    backgroundColor: "rgba(15, 188, 249, 1.0)",
  },
};
function CustomMakeBox({ isActiveQuest, setIsActiveQuest }) {
  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const deckTypeCountArr = [0, 3, 7, 11];
  const multiModelPrefab = useRecoilValue(multiModelPrefabAtom);
  const [nameValue0, setNameValue0] = useState("");
  const [nameValue1, setNameValue1] = useState("");
  const [nameValue2, setNameValue2] = useState("");
  const [nameValue3, setNameValue3] = useState("");
  const [nameValue4, setNameValue4] = useState("");

  const [deckType, setDeckType] = useState(0);
  const [cardCount, setCardCount] = useState(0);
  const [activeThree, setActiveThree] = useState(false);

  const [activeError, setActiveError] = useState(false);

  const onNameChangeHandler = (e, num) => {
    let temp = e.target.value;
    switch (num) {
      case 0:
        setNameValue0(temp);
        break;
      case 1:
        setNameValue1(temp);
        break;
      case 2:
        setNameValue2(temp);
        break;
      case 3:
        setNameValue3(temp);
        break;
      case 4:
        setNameValue4(temp);
        break;
      default:
        break;
    }
  };
  const deckTypeChanger = (num) => {
    if (deckType === num) {
      return;
    } else {
      setDeckType(num);
      setCardCount(deckTypeCountArr[num]);
    }
  };
  const cardCountChanger = (e) => {
    let temp = e.target.value.replace(/[^0-9]/g, "").replace(/(\..*)\./g, "$1");
    setCardCount(Number(temp));
  };
  const previewSettingChanger = (flag) => {
    setActiveThree(flag);
  };

  const errorChecker = () => {
    if (cardCount === 0) {
      setActiveError(true);
      setTimeout(() => {
        setActiveError(false);
        setIsActiveQuest(false);
      }, 2000);
      return false;
    } else {
      return true;
    }
  };
  const makeNewCustomModel = () => {
    let checkCount = errorChecker();
    let tempManager = JSON.parse(JSON.stringify(multiManager));
    let tempMultiModel = JSON.parse(JSON.stringify(multiModel));
    let tempObj = {};
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
    if (checkCount === false) {
      console.log("failed");
      return;
    } else {
      tempObj = JSON.parse(JSON.stringify(multiModelPrefab));
      tempObj.modelDefined = true;
      tempObj.modelType = true;
      tempObj.thisModelDeckType = deckType;
      tempObj.thisModelTotalCardCount = cardCount;
      tempObj.firstCardCount = cardCount;
      tempObj.thisModelPreviewThree = activeThree;

      //List Name
      let tempNameArr = new Array(5);
      tempNameArr[0] = nameValue0;
      tempNameArr[1] = nameValue1;
      tempNameArr[2] = nameValue2;
      tempNameArr[3] = nameValue3;
      tempNameArr[4] = nameValue4;
      for (let i = 0; i < 5; i++) {
        if (tempNameArr[i] === "") {
          tempNameArr[i] = localStorage.getItem(`DefaultListName${i + 1}`);
        }
      }
      tempObj.thisModelChildNameArr = [...tempNameArr];

      // Preview Check
      if (activeThree === true) {
        let tempArr = new Array(5);
        for (let i = 0; i < 5; i++) {
          let tempArr2 = new Array(3);
          for (let k = 0; k < 3; k++) {
            let tempNum = Math.floor(Math.random() * 78);
            tempArr2[k] = tempNum;
            for (let l = 0; l < k; l++) {
              if (tempArr2[k] === tempArr2[l]) {
                k--;
                break;
              }
            }
          }
          tempArr[i] = tempArr2;
        }
        tempObj.thisModelPreviewThreeNumArr = [...tempArr];
      }
      let ranNumArr = new Array(5);
      for (let i = 0; i < 5; i++) {
        let tempRanNumArr = new Array(cardCount);
        for (let a = 0; a < tempRanNumArr.length; a++) {
          let tempNum = Math.floor(Math.random() * 78);
          tempRanNumArr[a] = tempNum;
          for (let b = 0; b < a; b++) {
            if (tempRanNumArr[b] === tempRanNumArr[a]) {
              a--;
              break;
            }
          }
        }
        ranNumArr[i] = tempRanNumArr;
      }
      tempObj.thisModelFirstNumArr = [...ranNumArr];

      // Card Info Arr
      let tempCardInfoArr = new Array(5);
      if (deckType === 3) {
        // Celtic
        for (let b = 0; b < 5; b++) {
          let tempArr = new Array(11);
          for (let c = 0; c < tempArr.length; c++) {
            if (c === 2) {
              tempArr[c] = rotateCardInfo;
            } else {
              tempArr[c] = tempCardInfo;
            }
          }
          tempCardInfoArr[b] = tempArr;
        }
      } else if (deckType !== 0 && deckType !== 3) {
        // Three, Seven
        for (let b = 0; b < 5; b++) {
          let tempArr = new Array(deckType === 1 ? 3 : 7);
          for (let c = 0; c < tempArr.length; c++) {
            tempArr[c] = tempCardInfo;
          }
          tempCardInfoArr[b] = tempArr;
        }
      } else if (deckType === 0) {
        // Free
        for (let b = 0; b < 5; b++) {
          console.log("sdf : ", cardCount);
          let tempArr = new Array(cardCount);
          for (let c = 0; c < tempArr.length; c++) {
            let tempObj = { ...tempCardInfo2 };
            tempObj.newIdx = tempArr.length - c;
            tempArr[c] = tempObj;
          }
          tempCardInfoArr[b] = tempArr;
        }
        //console.log(tempCardInfoArr);
      }

      // remain Counter
      if (deckType !== 0) {
        let tempRemainCountArr = new Array(5);
        for (let i = 0; i < 5; i++) {
          tempRemainCountArr[i] = 0;
        }
        tempObj.remainCardCount = [...tempRemainCountArr];
      } else {
        let tempRemainCountArr = new Array(5);
        for (let i = 0; i < 5; i++) {
          tempRemainCountArr[i] = cardCount;
        }
        tempObj.remainCardCount = [...tempRemainCountArr];
      }

      tempObj.thisModelFirstCardInfoArr = [...tempCardInfoArr];
      //tempObj.thisModelFirstCardInfoArr = [...tempCardInfoArr];
      let tabTempInfoArr = new Array(5);
      for (let tabInfo = 0; tabInfo < 5; tabInfo++) {
        let tempArr = new Array(5);
        for (let i = 0; i < 5; i++) {
          tempArr[i] = tempTabInfo;
        }
        tabTempInfoArr[tabInfo] = tempArr;
      }
      //console.log(tabTempInfoArr);

      tempObj.TabOpenInfoArr = [...tabTempInfoArr];

      let itemNumArr = new Array(5);
      for (let itemNum = 0; itemNum < 5; itemNum++) {
        let tempArr = new Array(5);
        for (let i = 0; i < 5; i++) {
          tempArr[i] = 0;
        }
        itemNumArr[itemNum] = tempArr;
      }

      tempObj.SelectedTabItemNumArr = [...itemNumArr];

      // FirstControlArr

      tempMultiModel[tempManager.CurrentModelNumber] = { ...tempObj };
      setMultiModel(tempMultiModel);
    }
  };
  return (
    <>
      <CustomMakeBoxWrapper>
        <NameSettingBox>
          <NameItem>
            <NameItemOrder htmlFor="nameItem1">List 1</NameItemOrder>
            <NameItemValue
              placeholder={localStorage.getItem("DefaultListName1")}
              autoComplete="none"
              id="nameItem1"
              value={nameValue0}
              onChange={(e) => onNameChangeHandler(e, 0)}
              maxLength={20}
            />
          </NameItem>
          <NameItem>
            <NameItemOrder htmlFor="nameItem2">List 2</NameItemOrder>
            <NameItemValue
              placeholder={localStorage.getItem("DefaultListName2")}
              autoComplete="none"
              id="nameItem2"
              value={nameValue1}
              onChange={(e) => onNameChangeHandler(e, 1)}
              maxLength={20}
            />
          </NameItem>
          <NameItem>
            <NameItemOrder htmlFor="nameItem3">List 3</NameItemOrder>
            <NameItemValue
              placeholder={localStorage.getItem("DefaultListName3")}
              autoComplete="none"
              id="nameItem3"
              value={nameValue2}
              onChange={(e) => onNameChangeHandler(e, 2)}
              maxLength={20}
            />
          </NameItem>
          <NameItem>
            <NameItemOrder htmlFor="nameItem4">List 4</NameItemOrder>
            <NameItemValue
              placeholder={localStorage.getItem("DefaultListName4")}
              autoComplete="none"
              id="nameItem4"
              value={nameValue3}
              onChange={(e) => onNameChangeHandler(e, 3)}
              maxLength={20}
            />
          </NameItem>
          <NameItem>
            <NameItemOrder htmlFor="nameItem5">List 5</NameItemOrder>
            <NameItemValue
              placeholder={localStorage.getItem("DefaultListName5")}
              autoComplete="none"
              id="nameItem5"
              value={nameValue4}
              onChange={(e) => onNameChangeHandler(e, 4)}
              maxLength={20}
            />
          </NameItem>
        </NameSettingBox>
        <CustomOptionBox>
          <OptionBox>
            <OptionName>Deck Type</OptionName>
            <OptionSettingBox>
              <OptionSettingItemBox>
                <OptionToggleBox>
                  <OptionToggleBtn
                    variants={btnVar}
                    initial={false}
                    animate={deckType === 0 ? "active" : "inactive"}
                    onClick={() => {
                      deckTypeChanger(0);
                    }}
                  ></OptionToggleBtn>
                </OptionToggleBox>
                <OptionToggleName>Free</OptionToggleName>
              </OptionSettingItemBox>
              <OptionSettingItemBox>
                <OptionToggleBox>
                  <OptionToggleBtn
                    variants={btnVar}
                    initial={false}
                    animate={deckType === 1 ? "active" : "inactive"}
                    onClick={() => {
                      deckTypeChanger(1);
                    }}
                  ></OptionToggleBtn>
                </OptionToggleBox>
                <OptionToggleName>Three</OptionToggleName>
              </OptionSettingItemBox>
              <OptionSettingItemBox>
                <OptionToggleBox>
                  <OptionToggleBtn
                    variants={btnVar}
                    initial={false}
                    animate={deckType === 2 ? "active" : "inactive"}
                    onClick={() => {
                      deckTypeChanger(2);
                    }}
                  ></OptionToggleBtn>
                </OptionToggleBox>
                <OptionToggleName>Seven</OptionToggleName>
              </OptionSettingItemBox>
              <OptionSettingItemBox>
                <OptionToggleBox>
                  <OptionToggleBtn
                    variants={btnVar}
                    initial={false}
                    animate={deckType === 3 ? "active" : "inactive"}
                    onClick={() => {
                      deckTypeChanger(3);
                    }}
                  ></OptionToggleBtn>
                </OptionToggleBox>
                <OptionToggleName>Celtic</OptionToggleName>
              </OptionSettingItemBox>
            </OptionSettingBox>
          </OptionBox>
          <OptionBox>
            <OptionName>Card Count</OptionName>
            <OptionInput
              value={cardCount}
              readOnly={deckType !== 0 ? true : false}
              onChange={(e) => cardCountChanger(e)}
              maxLength={2}
            ></OptionInput>
          </OptionBox>
          <OptionBox>
            <OptionName>Preview Three Card</OptionName>
            <OptionSettingBox>
              <OptionSettingItemBox>
                <OptionToggleBox>
                  <OptionToggleBtn
                    variants={btnVar}
                    initial={false}
                    animate={activeThree === true ? "active" : "inactive"}
                    onClick={() => {
                      previewSettingChanger(true);
                    }}
                  ></OptionToggleBtn>
                </OptionToggleBox>
                <OptionToggleName>True</OptionToggleName>
              </OptionSettingItemBox>
              <OptionSettingItemBox>
                <OptionToggleBox>
                  <OptionToggleBtn
                    variants={btnVar}
                    initial={false}
                    animate={activeThree === false ? "active" : "inactive"}
                    onClick={() => {
                      previewSettingChanger(false);
                    }}
                  ></OptionToggleBtn>
                </OptionToggleBox>
                <OptionToggleName>False</OptionToggleName>
              </OptionSettingItemBox>
            </OptionSettingBox>
          </OptionBox>
        </CustomOptionBox>
      </CustomMakeBoxWrapper>
      {isActiveQuest === true ? (
        <QuestionCustomMakeBox>
          <QuestionMake>Are you Sure?</QuestionMake>
          <QuestionCaution>this setting caution</QuestionCaution>
          <QuestionBtnBox>
            <QuestionBtn onClick={() => makeNewCustomModel()}>Yes</QuestionBtn>
            <QuestionBtn onClick={() => setIsActiveQuest(false)}>
              No
            </QuestionBtn>
          </QuestionBtnBox>
          {activeError === true ? <ErrorBox>Error</ErrorBox> : null}
        </QuestionCustomMakeBox>
      ) : null}
    </>
  );
}

export default React.memo(CustomMakeBox);

/* eslint-disable */
import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  multiManagerAtom,
  multiModelAtom,
  secondSpreadItemPrefab,
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
function SecondCustomMakeBox({ isActiveQuest, setIsActiveQuest }) {
  const [activeError, setActiveError] = useState(false);

  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const { CurrentModelNumber } = multiManager;
  const { CurrentChildNumber, SecondSpread } = multiModel[CurrentModelNumber];
  const secondSpreadPrefab = useRecoilValue(secondSpreadItemPrefab);

  const deckTypeCountArr = [0, 3, 7, 11];
  const [nameValue0, setNameValue0] = useState("");
  const [nameValue1, setNameValue1] = useState("");
  const [nameValue2, setNameValue2] = useState("");
  const [nameValue3, setNameValue3] = useState("");
  const [nameValue4, setNameValue4] = useState("");
  const [deckType, setDeckType] = useState(0);
  const [cardCount, setCardCount] = useState(0);
  const [activeThree, setActiveThree] = useState(false);
  const tempClick = () => {
    // let tempObj = {
    //   isLongHeight: false,
    //   modelID: 0, // CurrentModelNumber와 비교
    //   modelName: "Untitle",
    //   modelDefined: false,
    //   modelType: false, // false = Default, true = Custom
    //   thisModelDeckType: 1,
    //   thisModelTotalCardCount: 0,
    //   firstCardCount: 0,
    //   extraCardCount: 0,
    //   remainCardCount: [],
    // };
    // let tempArr = new Array(5);
    // for (let i = 0; i < 5; i++) {
    //   let tempArr2 = new Array(5);
    //   for (let k = 0; k < 5; k++) {
    //     tempArr2[k] = tempObj;
    //   }
    //   tempArr[i] = tempArr2;
    // }
    // console.log(tempArr);
    // console.log(tempArr[CurrentChildNumber][0]);
    let tempObj = JSON.parse(JSON.stringify(multiModel));
    tempObj[CurrentModelNumber].SecondSpread[
      CurrentChildNumber
    ].isDefined = true;
    setMultiModel(tempObj);
  };
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
  const makeNewCustomSecond = () => {
    let checkCount = errorChecker();
    let tempMultiModel = JSON.parse(JSON.stringify(multiModel));
    let tempObj;
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
      return;
    } else {
      tempObj = JSON.parse(JSON.stringify(SecondSpread[CurrentChildNumber]));
      tempObj.isDefined = true;
      // Model type Custom? Default?
      tempObj.modelType = true; // custom
      // Deck Type
      tempObj.thisModelDeckType = deckType;
      // List Name
      let tempNameArr = new Array(5);
      tempNameArr[0] = nameValue0;
      tempNameArr[1] = nameValue1;
      tempNameArr[2] = nameValue2;
      tempNameArr[3] = nameValue3;
      tempNameArr[4] = nameValue4;
      for (let i = 0; i < 5; i++) {
        if (tempNameArr[i] === "") {
          tempNameArr[i] = localStorage.getItem(
            `SecondDefaultListName${i + 1}`
          );
        }
      }
      tempObj.SecondModelTabNameArr = [...tempNameArr];

      //Preview Check
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

      // Set Random Number
      let ranNumArr = new Array(5);
      for (let ri = 0; ri < 5; ri++) {
        let tempRanNumArr = new Array(cardCount);
        for (let ra = 0; ra < tempRanNumArr.length; ra++) {
          let tempNum = Math.floor(Math.random() * 78);
          tempRanNumArr[ra] = tempNum;
          for (let rb = 0; rb < ra; rb++) {
            if (tempRanNumArr[ra] === tempRanNumArr[rb]) {
              ra--;
              break;
            }
          }
        }
        ranNumArr[ri] = tempRanNumArr;
      }
      tempObj.SecondRanNumArr = [...ranNumArr];
      // thisModelDeckType // free three seven celtic
      tempObj.thisModelTotalCardCount = cardCount;
      tempObj.firstCardCount = cardCount;

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
        for (let b = 0; b < 5; b++) {
          let tempArr = new Array(deckType === 1 ? 3 : 7);
          for (let c = 0; c < tempArr.length; c++) {
            tempArr[c] = tempCardInfo;
          }
          tempCardInfoArr[b] = tempArr;
        }
      } else if (deckType === 0) {
        for (let b = 0; b < 5; b++) {
          let tempArr = new Array(cardCount);
          for (let c = 0; c < tempArr.length; c++) {
            let tempObj = { ...tempCardInfo2 };
            tempObj.newIdx = tempArr.length - c;
            tempArr[c] = tempObj;
          }
          tempCardInfoArr[b] = tempArr;
        }
      }
      tempObj.thisModelSecondCardInfoArr = [...tempCardInfoArr];

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

      tempMultiModel[CurrentModelNumber].SecondSpread[CurrentChildNumber] = {
        ...tempObj,
      };
      console.log(tempObj);
      setMultiModel(tempMultiModel);
    }
  };
  return (
    <>
      <CustomMakeBoxWrapper>
        <NameSettingBox>
          <NameItem>
            <NameItemOrder htmlFor="secondnameItem1">List 1</NameItemOrder>
            <NameItemValue
              placeholder={localStorage.getItem("SecondDefaultListName1")}
              autoComplete="none"
              id="secondnameItem1"
              value={nameValue0}
              onChange={(e) => onNameChangeHandler(e, 0)}
              maxLength={20}
            />
          </NameItem>
          <NameItem>
            <NameItemOrder htmlFor="secondnameItem2">List 2</NameItemOrder>
            <NameItemValue
              placeholder={localStorage.getItem("SecondDefaultListName2")}
              autoComplete="none"
              id="secondnameItem2"
              value={nameValue1}
              onChange={(e) => onNameChangeHandler(e, 1)}
              maxLength={20}
            />
          </NameItem>
          <NameItem>
            <NameItemOrder htmlFor="secondnameItem3">List 3</NameItemOrder>
            <NameItemValue
              placeholder={localStorage.getItem("SecondDefaultListName3")}
              autoComplete="none"
              id="secondnameItem3"
              value={nameValue2}
              onChange={(e) => onNameChangeHandler(e, 2)}
              maxLength={20}
            />
          </NameItem>
          <NameItem>
            <NameItemOrder htmlFor="secondnameItem4">List 4</NameItemOrder>
            <NameItemValue
              placeholder={localStorage.getItem("SecondDefaultListName4")}
              autoComplete="none"
              id="secondnameItem4"
              value={nameValue3}
              onChange={(e) => onNameChangeHandler(e, 3)}
              maxLength={20}
            />
          </NameItem>
          <NameItem>
            <NameItemOrder htmlFor="secondnameItem5">List 5</NameItemOrder>
            <NameItemValue
              placeholder={localStorage.getItem("SecondDefaultListName5")}
              autoComplete="none"
              id="secondnameItem5"
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
            <QuestionBtn onClick={() => makeNewCustomSecond()}>Yes</QuestionBtn>
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

export default SecondCustomMakeBox;

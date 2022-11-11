import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { multiManagerAtom } from "../../../atom/multiAtom";

const MultiOptionSettingWrapper = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: aquamarine;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const NameSettingListBox = styled(motion.div)`
  width: 100%;
  height: 60%;
  background-color: burlywood;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const NameSettingItem = styled(motion.div)`
  width: 95%;
  height: 20%;
  background-color: aliceblue;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const ListNumberBox = styled(motion.span)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
  height: 100%;
`;
const NameInput = styled(motion.input)`
  width: 90%;
  height: 100%;
  padding-left: 1%;
`;

const QuestionOptionBox = styled(motion.div)`
  width: 100%;
  height: 10%;
  background-color: beige;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const QuestionSpan = styled.span`
  width: 20%;
  height: 100%;
  background-color: blanchedalmond;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const QusetionCheckBox = styled(motion.div)`
  width: 70%;
  height: 100%;
  background-color: cadetblue;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;
const QuestionCheckItem = styled(motion.div)`
  width: 25%;
  height: 100%;
  background-color: gray;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const RadioBtnBox = styled(motion.div)`
  width: 20%;
  height: ${(props) => `${props.radiowidth.width}px`};
  background-color: salmon;
`;
const RadioName = styled(motion.span)`
  width: 80%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: mintcream;
`;

const CardCountInput = styled(motion.input)`
  width: 70%;
  height: 100%;
  background-color: cadetblue;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SetttingControlBtnBox = styled(motion.div)`
  width: 100%;
  height: 10%;
  background-color: darkslategrey;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const SettingBtn = styled(motion.button)`
  width: 20%;
  height: 90%;
  background-color: whitesmoke;
`;

const radioVar = {
  active: {
    backgroundColor: "rgba(5, 196, 107,1.0)",
  },
  inactive: {
    backgroundColor: "rgba(75, 207, 250,1.0)",
  },
};
function MultiOptionSetting(props) {
  const radioWidthRef = useRef();
  const setOpenSetting = props.setOpenSetting;
  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const {
    DefaultNameArr,
    DefaultDeckType,
    DefaultCardCount,
    DefaultPreviewThree,
  } = multiManager;
  const [radioWidth, setRadioWidth] = useState({ width: 0 });

  const [cardCount, setCardCount] = useState(DefaultCardCount);
  const [settingDeckType, setSettingDeckType] = useState(DefaultDeckType);
  const [checkPreviewThree, setCheckPreviewThree] =
    useState(DefaultPreviewThree);
  console.log(DefaultPreviewThree);
  const [list_0, setList_0] = useState(DefaultNameArr[0]);
  const [list_1, setList_1] = useState(DefaultNameArr[1]);
  const [list_2, setList_2] = useState(DefaultNameArr[2]);
  const [list_3, setList_3] = useState(DefaultNameArr[3]);
  const [list_4, setList_4] = useState(DefaultNameArr[4]);

  const closingThisBoxHandler = () => {
    setOpenSetting(false);
  };
  const onChangeValue = (e) => {
    let temp = e.target.value;
    setCardCount(temp);
  };
  const changePreviewValue = () => {
    setCheckPreviewThree((prev) => !prev);
  };

  const changeDeckType = (num) => {
    //let tempObj = JSON.parse(JSON.stringify(multiManager));
    //tempObj.DefaultDeckType = num;
    switch (num) {
      case 0: // Free
        setSettingDeckType(0);
        setCardCount(0);
        break;
      case 1: // Three
        setSettingDeckType(1);
        setCardCount(3);
        break;
      case 2: // Seven
        setSettingDeckType(2);
        setCardCount(7);
        break;
      case 3: // Celtic
        setSettingDeckType(3);
        setCardCount(11);
        break;
      default:
        break;
    }
    //setMultiManager(tempObj);
  };

  const changeListName = (e, i) => {
    e.preventDefault();
    let tempValue = e.target.value;
    switch (i) {
      case 0:
        setList_0(tempValue);
        break;
      case 1:
        setList_1(tempValue);
        break;
      case 2:
        setList_2(tempValue);
        break;
      case 3:
        setList_3(tempValue);
        break;
      case 4:
        setList_4(tempValue);
        break;
      default:
        break;
    }
  };

  const setDefaultSetting = () => {
    if (settingDeckType === 0 && cardCount === 0) {
      return;
    }
    //Recoil
    let tempManager = JSON.parse(JSON.stringify(multiManager));
    tempManager.DefaultNameArr[0] = list_0;
    tempManager.DefaultNameArr[1] = list_1;
    tempManager.DefaultNameArr[2] = list_2;
    tempManager.DefaultNameArr[3] = list_3;
    tempManager.DefaultNameArr[4] = list_4;

    tempManager.DefaultDeckType = settingDeckType;
    tempManager.DefaultCardCount = cardCount;
    tempManager.DefaultPreviewThree = checkPreviewThree;

    // LocalStorage
    localStorage.setItem("DefaultListName1", list_0);
    localStorage.setItem("DefaultListName2", list_1);
    localStorage.setItem("DefaultListName3", list_2);
    localStorage.setItem("DefaultListName4", list_3);
    localStorage.setItem("DefaultListName5", list_4);

    localStorage.setItem("DefaultDeckType", String(settingDeckType));
    localStorage.setItem("DefaultCardCount", String(cardCount));
    localStorage.setItem("DefaultPreviewThree", String(checkPreviewThree));

    setMultiManager(tempManager);
    closingThisBoxHandler();
  };
  useEffect(() => {
    const temp = radioWidthRef.current.getBoundingClientRect();
    setRadioWidth({
      width: temp.width,
    });
  }, []);
  return (
    <MultiOptionSettingWrapper>
      <NameSettingListBox>
        {DefaultNameArr.map((a, i) => {
          let tempVar;
          switch (i) {
            case 0:
              tempVar = list_0;
              break;
            case 1:
              tempVar = list_1;
              break;
            case 2:
              tempVar = list_2;
              break;
            case 3:
              tempVar = list_3;
              break;
            case 4:
              tempVar = list_4;
              break;
            default:
              break;
          }
          return (
            <NameSettingItem key={`NameSetting${i}`}>
              <ListNumberBox>{i + 1}</ListNumberBox>
              <NameInput
                placeholder={DefaultNameArr[i]}
                value={tempVar}
                onChange={(e) => {
                  changeListName(e, i);
                }}
              />
            </NameSettingItem>
          );
        })}
      </NameSettingListBox>
      <QuestionOptionBox>
        {/* DeckType Input을 라디오나 탭으로 */}
        <QuestionSpan>Deck Type</QuestionSpan>
        <QusetionCheckBox>
          <QuestionCheckItem>
            <RadioBtnBox
              ref={radioWidthRef}
              radiowidth={radioWidth}
              variants={radioVar}
              animate={settingDeckType === 0 ? "active" : "inactive"}
              onClick={() => changeDeckType(0)}
            ></RadioBtnBox>
            <RadioName>Free</RadioName>
          </QuestionCheckItem>
          <QuestionCheckItem>
            <RadioBtnBox
              radiowidth={radioWidth}
              variants={radioVar}
              animate={settingDeckType === 1 ? "active" : "inactive"}
              onClick={() => changeDeckType(1)}
            ></RadioBtnBox>
            <RadioName>Three</RadioName>
          </QuestionCheckItem>
          <QuestionCheckItem>
            <RadioBtnBox
              radiowidth={radioWidth}
              variants={radioVar}
              animate={settingDeckType === 2 ? "active" : "inactive"}
              onClick={() => changeDeckType(2)}
            ></RadioBtnBox>
            <RadioName>Seven</RadioName>
          </QuestionCheckItem>
          <QuestionCheckItem>
            <RadioBtnBox
              radiowidth={radioWidth}
              variants={radioVar}
              animate={settingDeckType === 3 ? "active" : "inactive"}
              onClick={() => changeDeckType(3)}
            ></RadioBtnBox>
            <RadioName>Celtic</RadioName>
          </QuestionCheckItem>
        </QusetionCheckBox>
      </QuestionOptionBox>
      <QuestionOptionBox>
        <QuestionSpan>Card Count</QuestionSpan>
        <CardCountInput
          maxLength={2}
          value={cardCount}
          onChange={(e) => {
            onChangeValue(e);
          }}
          readOnly={settingDeckType !== 0 ? true : false}
          required={settingDeckType === 0 ? true : false}
        ></CardCountInput>
      </QuestionOptionBox>
      <QuestionOptionBox>
        <QuestionSpan>Preview ThreeCard</QuestionSpan>
        <QusetionCheckBox>
          <QuestionCheckItem>
            <RadioBtnBox
              radiowidth={radioWidth}
              variants={radioVar}
              animate={checkPreviewThree === true ? "active" : "inactive"}
              onClick={changePreviewValue}
            ></RadioBtnBox>
            <RadioName>True</RadioName>
          </QuestionCheckItem>
          <QuestionCheckItem>
            <RadioBtnBox
              radiowidth={radioWidth}
              variants={radioVar}
              animate={checkPreviewThree === false ? "active" : "inactive"}
              onClick={changePreviewValue}
            ></RadioBtnBox>
            <RadioName>False</RadioName>
          </QuestionCheckItem>
        </QusetionCheckBox>
      </QuestionOptionBox>
      <SetttingControlBtnBox>
        <SettingBtn onClick={setDefaultSetting}>Setting</SettingBtn>
        <SettingBtn onClick={closingThisBoxHandler}>Back</SettingBtn>
      </SetttingControlBtnBox>
    </MultiOptionSettingWrapper>
  );
}

export default React.memo(MultiOptionSetting);

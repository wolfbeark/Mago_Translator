/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { multiManagerAtom, multiModelAtom } from "../../../atom/multiAtom";
import MultiDragCard from "./MultiDragCard";

// 스프레드 전체 컨테이너.
const SpreadConatiner = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(119, 140, 163, 1);
  display: flex;
  justify-content: space-between;
  //align-items: center;
  position: relative;
`;
const ErrorBox = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 216, 214, 0.5);
  position: absolute;
  z-index: 100;
`;
// 스프레드 박스
const SpreadCarpet = styled.div`
  width: 80%;
  height: 100%;
  background-color: cornsilk;
  position: relative;
`;
// 스프레드 컨트롤 박스
const SpreadControlBox = styled.div`
  width: 18%;
  height: 100%;
  background-color: honeydew;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;

const CardStorageContainer = styled.div`
  width: 90%;
  height: 20%;
  background-color: cadetblue;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1%;
`;
const CardStorage = styled.div`
  width: 100%;
  height: 100%;
  background-color: cornsilk;
  display: flex;
  align-items: center;
  padding: 1%;
  justify-content: space-evenly;
`;
const CardWaitingZone = styled.div`
  width: 45%;
  height: 100%;
  background-color: darkgoldenrod;
  //padding: 1%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CardWaitingInBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;
const CardExtraDeck = styled.div`
  width: 45%;
  height: 100%;
  background-color: darkgoldenrod;
`;
const CardCountBoard = styled.div`
  width: 100%;
  height: 20%;
  background-color: bisque;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 1%;
`;
const CardCountNotice = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: whitesmoke;
  width: 100%;
  height: 48%;
`;
const CountNoticeName = styled.span`
  width: 70%;
  height: 100%;
  background-color: aquamarine;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CountNoticeValue = styled.span`
  width: 30%;
  height: 100%;
  background-color: darkcyan;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SpreadControlBtnBox = styled.div`
  width: 100%;
  height: 60%;
  background-color: fuchsia;
`;

const PreviewBtn = styled(motion.div)`
  width: 50px;
  height: 50px;
  background-color: gray;
  position: absolute;
  bottom: 2%;
  left: 1%;
`;

function SpreadScreen() {
  const totalRef = useRef();
  const carpetRef = useRef();
  const cardWaitingZoneRef = useRef();

  const multiManager = useRecoilValue(multiManagerAtom);
  const multiModel = useRecoilValue(multiModelAtom);
  const [waitingZoneInfo, setWaitingZoneInfo] = useState({
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    x: 0,
    y: 0,
  });
  const [carpetInfo, setCarpetInfo] = useState({
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    x: 0,
    y: 0,
  });
  const [totalInfo, setTotalInfo] = useState({
    width: 0,
    height: 0,
    left: 0,
    right: 0,
    bottom: 0,
    top: 0,
    x: 0,
    y: 0,
  });
  // 카드의 cardWaitingZone 초기값
  const [defaultPos, setDefaultPos] = useState({ x: 0, y: 0 });
  const [refArr, setRefArr] = useState([totalRef, carpetRef]);
  const { CurrentModelNumber } = multiManager;
  // CurrentChildNumber : model의 star, square 등
  // 하위에 알맞은 번호 배열 찾을 때 사용
  const {
    CurrentChildNumber,
    thisModelDeckType,
    firstCardCount,
    thisModelFirstCardInfoArr,
  } = multiModel[CurrentModelNumber];
  const [newModelNumber, setNewModelNumber] = useState(CurrentModelNumber);
  const [newNumber, setNewNumber] = useState(CurrentChildNumber);

  const [openError, setOpenError] = useState(false);
  useEffect(() => {
    let tempTotal = totalRef.current.getBoundingClientRect();
    let tempInfo = cardWaitingZoneRef.current.getBoundingClientRect();
    let tempCarpetInfo = carpetRef.current.getBoundingClientRect();
    setWaitingZoneInfo({
      width: tempInfo.width,
      height: tempInfo.height,
      left: tempInfo.left,
      right: tempInfo.right,
      bottom: tempInfo.bottom,
      top: tempInfo.top,
      x: tempInfo.x,
      y: tempInfo.y,
    });
    setCarpetInfo({
      width: tempCarpetInfo.width,
      height: tempCarpetInfo.height,
      left: tempCarpetInfo.left,
      right: tempCarpetInfo.right,
      bottom: tempCarpetInfo.bottom,
      top: tempCarpetInfo.top,
      x: tempCarpetInfo.x,
      y: tempCarpetInfo.y,
    });

    setDefaultPos({
      // waitingZone 기준
      x: 0,
      y: 0,
      // Total 기준
      // x: tempInfo.x - tempCarpetInfo.x,
      // y: tempInfo.y - tempCarpetInfo.y,
    });
    setTotalInfo({
      width: tempTotal.width,
      height: tempTotal.height,
      left: tempTotal.left,
      right: tempTotal.right,
      bottom: tempTotal.bottom,
      top: tempTotal.top,
      x: tempTotal.x,
      y: tempTotal.y,
    });
  }, []);

  useEffect(() => {
    setNewNumber(multiModel[CurrentModelNumber].CurrentChildNumber);
    setNewModelNumber(multiManager.CurrentModelNumber);
  }, [
    multiModel[CurrentModelNumber].CurrentChildNumber,
    multiManager.CurrentModelNumber,
  ]);
  //console.log(waitingZoneInfo);
  const previewNumberCheck = () => {
    console.log(
      multiModel[multiManager.CurrentModelNumber].thisModelPreviewThreeNumArr[
        multiModel[multiManager.CurrentModelNumber].CurrentChildNumber
      ]
    );
  };
  return (
    <SpreadConatiner ref={totalRef}>
      <SpreadCarpet
        ref={carpetRef}
        // onClick={(e) => {
        //   console.log("its me");
        //   console.log("carept : ", carpetInfo);
        //   console.log("waiting : ", waitingZoneInfo);
        //   console.log(e.pageY);
        // }}
      >
        {multiModel[multiManager.CurrentModelNumber].thisModelPreviewThree ===
        true ? (
          <PreviewBtn onClick={previewNumberCheck}>Preview</PreviewBtn>
        ) : null}
      </SpreadCarpet>
      <SpreadControlBox>
        <CardStorageContainer>
          <CardStorage>
            <CardWaitingZone>
              <CardWaitingInBox ref={cardWaitingZoneRef}>
                {multiModel[
                  multiManager.CurrentModelNumber
                ].thisModelFirstCardInfoArr[
                  multiModel[multiManager.CurrentModelNumber].CurrentChildNumber
                ].map((a, i) => {
                  //console.log(a.isRotate);
                  return (
                    <MultiDragCard
                      key={`multiDragCard${i}${newNumber}${newModelNumber}`}
                      totalInfo={totalInfo}
                      carpetInfo={carpetInfo}
                      waitingZoneInfo={waitingZoneInfo}
                      defaultPos={defaultPos}
                      openError={openError}
                      setOpenError={setOpenError}
                      count={i}
                      refArr={refArr}
                    ></MultiDragCard>
                  );
                })}
              </CardWaitingInBox>
            </CardWaitingZone>
            <CardExtraDeck></CardExtraDeck>
          </CardStorage>
        </CardStorageContainer>
        <CardCountBoard>
          <CardCountNotice>
            <CountNoticeName>Total Count</CountNoticeName>
            <CountNoticeValue>
              {
                multiModel[multiManager.CurrentModelNumber]
                  .thisModelTotalCardCount
              }
            </CountNoticeValue>
          </CardCountNotice>
          <CardCountNotice>
            <CountNoticeName>Remain Count</CountNoticeName>
            <CountNoticeValue>
              {
                multiModel[multiManager.CurrentModelNumber].remainCardCount[
                  CurrentChildNumber
                ]
              }
            </CountNoticeValue>
          </CardCountNotice>
        </CardCountBoard>
        <SpreadControlBtnBox></SpreadControlBtnBox>
      </SpreadControlBox>
      {openError === true ? <ErrorBox>Error</ErrorBox> : null}
    </SpreadConatiner>
  );
}

export default SpreadScreen;

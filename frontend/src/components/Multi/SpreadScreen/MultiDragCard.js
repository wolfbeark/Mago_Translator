/* eslint-disable */

import React, { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { motion } from "framer-motion";
import { useRecoilValue, useRecoilState } from "recoil";
import { multiManagerAtom, multiModelAtom } from "../../../atom/multiAtom";
import Draggable from "react-draggable";
let posX = 0;
let posY = 0;

const MultiDragCardWrapper = styled(motion.div)`
  width: ${(props) => props.waitinginfo.width}px;
  height: ${(props) => props.waitinginfo.height}px;
  background-color: orangered;
  position: absolute;
  background-image: url(${(props) => props.imgsrc});
  //z-index: 100;
  /* ${(props) => {
    if (props.privaterotate === "false") {
      return css`
        transform: rotateZ("0");
      `;
    } else {
      return css`
        transform: rotateZ("-90deg");
      `;
    }
  }} */
`;

function MultiDragCard(props) {
  const cardRef = useRef();
  const setOpenError = props.setOpenError;
  const openError = props.openError;
  const cardCount = props.count;
  const totalInfo = props.totalInfo;
  const carpetInfo = props.carpetInfo;
  const waitingZoneInfo = props.waitingZoneInfo;
  const defaultPos = props.defaultPos;
  const refArr = props.refArr;
  const multiManager = useRecoilValue(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const { CurrentModelNumber } = multiManager;
  // CurrentChildNumber : model의 star, square 등
  // 하위에 알맞은 번호 배열 찾을 때 사용
  const {
    CurrentChildNumber,
    thisModelDeckType,
    firstCardCount,
    thisModelFirstCardInfoArr,
  } = multiModel[CurrentModelNumber];

  const isInSpreadZone =
    thisModelFirstCardInfoArr[CurrentModelNumber][cardCount].isInSpread;
  const isDraged =
    thisModelFirstCardInfoArr[CurrentModelNumber][cardCount].isDraged;
  const isRotate =
    thisModelFirstCardInfoArr[CurrentModelNumber][cardCount].isRotate;

  const carpetCenterX =
    -(carpetInfo.width / 2) -
    (waitingZoneInfo.x - carpetInfo.right) -
    waitingZoneInfo.width / 2;
  const carpetCenterY =
    carpetInfo.height / 2 -
    waitingZoneInfo.height / 2 -
    (waitingZoneInfo.top - totalInfo.top);

  const threePos = [
    {
      x: carpetCenterX - carpetInfo.width * 0.2,
      y: carpetCenterY,
    },
    {
      x: carpetCenterX,
      y: carpetCenterY,
    },
    {
      x: carpetCenterX + carpetInfo.width * 0.2,
      y: carpetCenterY,
    },
  ];
  const sevenPos = [
    {
      x: carpetCenterX,
      y: carpetCenterY - carpetInfo.height * 0.3,
    },
    {
      x: carpetCenterX + carpetInfo.width * 0.15,
      y: carpetCenterY + carpetInfo.height * 0.15,
    },
    {
      x: carpetCenterX - carpetInfo.width * 0.15,
      y: carpetCenterY + carpetInfo.height * 0.15,
    },
    {
      x: carpetCenterX,
      y: carpetCenterY + carpetInfo.height * 0.3,
    },
    {
      x: carpetCenterX - carpetInfo.width * 0.15,
      y: carpetCenterY - carpetInfo.height * 0.15,
    },
    {
      x: carpetCenterX + carpetInfo.width * 0.15,
      y: carpetCenterY - carpetInfo.height * 0.15,
    },
    {
      x: carpetCenterX,
      y: carpetCenterY,
    },
  ];
  const celticPos = [
    {
      x: carpetCenterX - carpetInfo.width * 0.15,
      y: carpetCenterY,
    },
    {
      x: carpetCenterX - carpetInfo.width * 0.05,
      y: carpetCenterY,
    },
    {
      // rotate
      x: carpetCenterX - carpetInfo.width * 0.1,
      y: carpetCenterY,
    },
    {
      x: carpetCenterX - carpetInfo.width * 0.1,
      y: carpetCenterY + carpetInfo.height * 0.3,
    },
    {
      x: carpetCenterX - carpetInfo.width * 0.3,
      y: carpetCenterY,
    },
    {
      x: carpetCenterX - carpetInfo.width * 0.1,
      y: carpetCenterY - carpetInfo.height * 0.3,
    },
    {
      x: carpetCenterX + carpetInfo.width * 0.1,
      y: carpetCenterY,
    },
    {
      x: carpetCenterX + carpetInfo.width * 0.3,
      y: carpetCenterY + carpetInfo.height * 0.3,
    },
    {
      x: carpetCenterX + carpetInfo.width * 0.3,
      y: carpetCenterY + carpetInfo.height * 0.1,
    },
    {
      x: carpetCenterX + carpetInfo.width * 0.3,
      y: carpetCenterY - carpetInfo.height * 0.1,
    },
    {
      x: carpetCenterX + carpetInfo.width * 0.3,
      y: carpetCenterY - carpetInfo.height * 0.3,
    },
  ];

  const [defaultCardPos, setDefaultCardPos] = useState({
    x: waitingZoneInfo.x - carpetInfo.x,
    y: waitingZoneInfo.y - carpetInfo.y,
  });
  const [cardInfo, setCardInfo] = useState({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  const [errorPos, setErrorPos] = useState({ x: 0, y: 0 });
  const [privateRotate, setPrivateRotate] = useState(
    thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isRotate
  );
  const [thisIdx, setThisIdx] = useState(0);

  const cardAniVar = {
    initial: {
      opacity: 0,
      rotateZ: privateRotate === true ? -90 : 0,
    },
    rotateTrue: {
      rotateZ: 0,
      opacity: 1,
    },
    rotateFalse: {
      rotateZ: 0,
      opacity: 1,
    },
    rotateTrueError: {
      rotateZ: -90,
      opacity: 1,
    },
    rotateFalseError: {
      rotateZ: 0,
      opacity: 1,
    },
    hover: {
      scale: 1.1,
      //boxShadow: '0 0 10px 5px black',
    },
  };

  const animateControl = () => {
    if (openError === true) {
      if (privateRotate === false) {
        return cardAniVar.rotateFalseError;
      } else {
        return cardAniVar.rotateTrueError;
      }
    } else {
      if (privateRotate === false) {
        return cardAniVar.rotateFalse;
      } else {
        return cardAniVar.rotateTrue;
      }
    }
  };

  useEffect(() => {
    setDefaultCardPos({
      x: waitingZoneInfo.x - carpetInfo.x,
      y: waitingZoneInfo.y - carpetInfo.y,
    });
    let tempObj = cardRef.current.getBoundingClientRect();
    setCardInfo({
      width: tempObj.width,
      height: tempObj.height,
      x: tempObj.x,
      y: tempObj.y,
    });
  }, [privateRotate]);

  useEffect(() => {
    if (
      thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isRotate ===
      false
    ) {
      return;
    } else {
      setPrivateRotate(true);
    }
  }, []);
  const onDragStartHandler = (e) => {
    let alpha = waitingZoneInfo.x - (e.pageX - e.offsetX);
    let beta = waitingZoneInfo.y - (e.pageY - e.offsetY);
    setErrorPos({
      x: -alpha,
      y: -beta,
    });
    let tempObj = JSON.parse(JSON.stringify(multiModel));
    tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[CurrentChildNumber][
      cardCount
    ].isDraged = true;
    tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[CurrentChildNumber][
      cardCount
    ].privateX = -alpha;
    tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[CurrentChildNumber][
      cardCount
    ].privateY = -beta;

    setMultiModel(tempObj);

    // if (
    //   multiModel[CurrentModelNumber].thisModelFirstCardInfoArr[
    //     CurrentChildNumber
    //   ][cardCount].isDraged === true
    // ) {
    //   return;
    // } else {
    //   let tempObj = JSON.parse(JSON.stringify(multiModel));
    //   tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[CurrentChildNumber][
    //     cardCount
    //   ].isDraged = true;
    //   if (
    //     tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
    //       CurrentChildNumber
    //     ][cardCount].isInSpread === true
    //   ) {
    //     tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
    //       CurrentChildNumber
    //     ][cardCount].privateX = -alpha;
    //     tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
    //       CurrentChildNumber
    //     ][cardCount].privateY = -beta;
    //   }
    //   setMultiModel(tempObj);
    // }
  };
  const onDragTestHandler = (e) => {
    posX = e.pageX;
    posY = e.pageY;

    let px = e.pageX; // - e.offsetX - carpetInfo.x;
    let py = e.pageY; // - e.offsetY - carpetInfo.y;
    if (
      px >= carpetInfo.left &&
      px <= carpetInfo.right &&
      py >= carpetInfo.top &&
      py <= carpetInfo.bottom
    ) {
      //setIsInSpread(true);
      if (
        multiModel[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].isInSpread === true
      ) {
        return;
      } else {
        let tempObj = JSON.parse(JSON.stringify(multiModel));
        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].isInSpread = true;
        tempObj[CurrentModelNumber].remainCardCount[CurrentChildNumber]--;
        setMultiModel(tempObj);
      }
    }
  };

  const onDragEndHandler = (e) => {
    let testX = e.pageX; // - e.offsetX - carpetInfo.x;
    let testY = e.pageY; // - e.offsetY - carpetInfo.y;
    let alpha;
    let beta;
    let cardObj = cardRef.current.getBoundingClientRect();
    let cardObjItem = {
      x: cardObj.x,
      y: cardObj.y,
    };
    // 카드의 상대적 위치
    if (
      thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isRotate ===
      false
    ) {
      alpha = waitingZoneInfo.x - (e.pageX - e.offsetX);
      beta = waitingZoneInfo.y - (e.pageY - e.offsetY);
    } else {
      alpha = waitingZoneInfo.x - (e.pageX - e.offsetX);
      beta = waitingZoneInfo.y - (e.pageY - e.offsetY);
    }

    // 에러 발생시 위치
    let gamma = waitingZoneInfo.x - carpetInfo.left;
    let delta = waitingZoneInfo.x - carpetInfo.right + cardInfo.width;
    let epsilon = carpetInfo.top - cardInfo.height;
    let zeta = carpetInfo.bottom - cardInfo.height * 2;

    if (
      testX >= carpetInfo.left &&
      testX <= carpetInfo.right &&
      testY >= carpetInfo.top &&
      testY <= carpetInfo.bottom
    ) {
      if (
        multiModel[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].isDraged === true &&
        multiModel[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].isInSpread === true
      ) {
        let tempObj = JSON.parse(JSON.stringify(multiModel));

        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].privateX = -alpha;
        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].privateY = -beta;

        setMultiModel(tempObj);
      }
    } else {
      let tempObj = JSON.parse(JSON.stringify(multiModel));

      if (testX < carpetInfo.left) {
        console.log("좌");
        console.log(cardObjItem.x);
        let temp = -gamma;
        let temp2 = cardObjItem.y - waitingZoneInfo.y;
        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].privateX = temp;
        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].privateY = temp2;
        // -(waitingZoneInfo.top - carpetInfo.top) +
        // e.offsetY -
        // waitingZoneInfo.height -
        // (e.pageY - e.offsetY);
      }
      if (testX > carpetInfo.right) {
        // 우
        console.log("우");
        // console.log("wait : ", waitingZoneInfo.x);
        // console.log("cardX : ", cardObjItem.x);
        // console.log("pageX : ", testX);
        // console.log("c right : ", carpetInfo.right);
        // console.log("waitY : ", waitingZoneInfo.y);
        // console.log("cardY : ", cardObjItem.y);
        let temp = -(waitingZoneInfo.x - carpetInfo.right) - cardInfo.width;
        let temp2 = cardObjItem.y - waitingZoneInfo.y;
        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].privateX = temp;
        // Y
        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].privateY = temp2;
      }
      if (testY < carpetInfo.top) {
        console.log("상");
        let temp = -(waitingZoneInfo.top - carpetInfo.top);
        let temp2 = -(waitingZoneInfo.x - cardObjItem.x);
        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].privateY = temp;
        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].privateX = temp2;
        // -(
        //   waitingZoneInfo.left -
        //   e.pageX +
        //   cardInfo.width / 2
        // );
      }
      if (testY > carpetInfo.bottom) {
        console.log("하");
        let temp = carpetInfo.height - cardInfo.height;
        let temp2 = -(waitingZoneInfo.x - cardObjItem.x);
        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].privateY = temp;
        //-(waitingZoneInfo.bottom - carpetInfo.bottom);
        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].privateX = temp2;
        // -(
        //   waitingZoneInfo.left -
        //   e.pageX +
        //   cardInfo.width / 2
        // );
      }

      if (testX < carpetInfo.left && testY > carpetInfo.bottom) {
        //좌하
        console.log("좌하");
        let temp = -gamma;
        let temp2 = carpetInfo.height - cardInfo.height;
        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].privateX = temp;
        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].privateY = temp2;
      }
      if (testX < carpetInfo.left && testY < carpetInfo.top) {
        //좌상
        console.log("좌상");
        let temp = -gamma;
        let temp2 = -(waitingZoneInfo.top - carpetInfo.top);
        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].privateX = temp;
        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].privateY = temp2;
      }
      if (testX > carpetInfo.right && testY < carpetInfo.top) {
        // 우상
        console.log("우상");
        let temp = -(waitingZoneInfo.x - carpetInfo.right) - cardInfo.width;
        let temp2 = -(waitingZoneInfo.top - carpetInfo.top);
        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].privateX = temp;
        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].privateY = temp2;
        // -(
        //   waitingZoneInfo.left -
        //   carpetInfo.right +
        //   cardInfo.width
        // );
      }
      if (testY > carpetInfo.bottom && testX > carpetInfo.right) {
        //우하
        // testX === e.pageX
        console.log("우하");
        let temp = -(waitingZoneInfo.x - carpetInfo.right) - cardInfo.width;
        let temp2 = carpetInfo.height - cardInfo.height;

        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].privateX = temp;
        tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
          CurrentChildNumber
        ][cardCount].privateY = temp2;
        // -(
        //   waitingZoneInfo.x -
        //   carpetInfo.right +
        //   cardInfo.width / 2
        // );

        // tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[
        //   CurrentChildNumber
        // ][cardCount].privateX = -(
        //   waitingZoneInfo.left -
        //   carpetInfo.right +
        //   cardInfo.width
        // );
      }
      setMultiModel(tempObj);
      setOpenError(true);
      setTimeout(() => {
        setOpenError(false);
      }, 1000);
    }
  };
  console.log(cardInfo);
  const testItem = () => {
    let temp;
    if (thisModelDeckType !== 0) {
      if (thisModelDeckType === 1) {
        if (
          thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isDraged ===
            false &&
          thisModelFirstCardInfoArr[CurrentChildNumber][cardCount]
            .isInSpread === true
          // if cardCount >= firstCardCount
          // if cardType // Tarot LenorMand... 나중에 추가
        ) {
          temp = {
            x: threePos[cardCount].x,
            y: threePos[cardCount].y,
            width:
              privateRotate === false
                ? `${waitingZoneInfo.width}px`
                : `${waitingZoneInfo.height}px`,
            height:
              privateRotate === false
                ? `${waitingZoneInfo.height}px`
                : `${waitingZoneInfo.width}px`,
            // width: `100px`,
            // height: `100px`,
          };
        } else {
          temp = {
            x: thisModelFirstCardInfoArr[CurrentChildNumber][cardCount]
              .privateX,
            y: thisModelFirstCardInfoArr[CurrentChildNumber][cardCount]
              .privateY,
            width:
              privateRotate === false
                ? `${cardInfo.width}px`
                : `${cardInfo.height}px`,
            height:
              privateRotate === false
                ? `${cardInfo.height}px`
                : `${cardInfo.width}px`,
          };
        }
      }
      if (thisModelDeckType === 2) {
        if (
          thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isDraged ===
            false &&
          thisModelFirstCardInfoArr[CurrentChildNumber][cardCount]
            .isInSpread === true
        ) {
          temp = {
            x: sevenPos[cardCount].x,
            y: sevenPos[cardCount].y,
            //zIndex: cardCount,
          };
        } else {
          temp = {
            x: thisModelFirstCardInfoArr[CurrentChildNumber][cardCount]
              .privateX,
            y: thisModelFirstCardInfoArr[CurrentChildNumber][cardCount]
              .privateY,
            //zIndex: cardCount,
          };
        }
      }
      if (thisModelDeckType === 3) {
        if (
          thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isDraged ===
            false &&
          thisModelFirstCardInfoArr[CurrentChildNumber][cardCount]
            .isInSpread === true
        ) {
          temp = {
            x: celticPos[cardCount].x,
            y: celticPos[cardCount].y,
          };
        } else {
          temp = {
            x: thisModelFirstCardInfoArr[CurrentChildNumber][cardCount]
              .privateX,
            y: thisModelFirstCardInfoArr[CurrentChildNumber][cardCount]
              .privateY,
          };
        }
      }
    } else if (thisModelDeckType === 0) {
      // Free
      if (
        thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isDraged ===
          false &&
        thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isInSpread ===
          false
      ) {
        temp = {
          x: 0,
          y: 0,
          zIndex:
            thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].newIdx,
        };
      } else {
        temp = {
          x: thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].privateX,
          y: thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].privateY,
          zIndex: 0,
        };
      }
    }
    return temp;
  };
  const onDoubleClickHandler = (e) => {
    if (
      thisModelFirstCardInfoArr[CurrentChildNumber][cardCount].isInSpread ===
      false
    ) {
      return;
    }
    let tempCardInfo = cardRef.current.getBoundingClientRect();
    let alpha;
    let beta;

    let tempObj = JSON.parse(JSON.stringify(multiModel));
    tempObj[CurrentModelNumber].thisModelFirstCardInfoArr[CurrentChildNumber][
      cardCount
    ].isRotate = !privateRotate;
    setPrivateRotate((prev) => !prev);
    setMultiModel(tempObj);
  };
  return (
    <Draggable nodeRef={cardRef}>
      <MultiDragCardWrapper
        ref={cardRef}
        imgsrc={
          privateRotate === true
            ? `${process.env.PUBLIC_URL}/img/Default0.png`
            : `${process.env.PUBLIC_URL}/img/Default0.png}`
        }
        drag
        dragMomentum={false}
        onDragStart={(e) => onDragStartHandler(e)}
        onDrag={(e) => onDragTestHandler(e)}
        onDragEnd={(e) => onDragEndHandler(e)}
        onDoubleClick={(e) => onDoubleClickHandler(e)}
        dragConstraints={
          multiModel[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].isInSpread === false
            ? refArr[0]
            : refArr[1]
        }
        dragSnapToOrigin={
          multiModel[CurrentModelNumber].thisModelFirstCardInfoArr[
            CurrentChildNumber
          ][cardCount].isInSpread === false
            ? true
            : false
        }
        waitinginfo={waitingZoneInfo}
        variants={cardAniVar}
        initial="initial"
        //privaterotate={privateRotate === true ? "true" : "false"}
        animate={privateRotate === true ? "rotateTrue" : "rotateFalse"}
        whileDrag="hover"
        style={testItem()}
      >
        {/* {
          multiModel[CurrentModelNumber].thisModelFirstNumArr[
            CurrentChildNumber
          ][cardCount]
        } */}
        {cardCount}
      </MultiDragCardWrapper>
    </Draggable>
  );
}

export default React.memo(MultiDragCard);

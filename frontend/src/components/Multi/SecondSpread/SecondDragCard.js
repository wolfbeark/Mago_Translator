/* eslint-disable */
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Draggable from "react-draggable";
import { useRecoilState, useRecoilValue } from "recoil";
import { multiManagerAtom, multiModelAtom } from "../../../atom/multiAtom";

let posX = 0;
let posY = 0;
const MultiDragCardWrapper = styled(motion.div)`
  width: ${(props) => props.waitinginfo.width}px;
  height: ${(props) => props.waitinginfo.height}px;
  background-color: orangered;
  position: absolute;
  //z-index: 100;
`;
const cardAniVar = {
  initial: {},

  rotateTrue: {
    rotateZ: -90,
    opacity: 1,
  },
  rotateFalse: {
    rotateZ: 0,
    opacity: 1,
  },
  hover: {
    scale: 1.1,
    //boxShadow: '0 0 10px 5px black',
  },
};
function SecondDragCard(props) {
  const cardRef = useRef();
  const cardCount = props.count;
  const waitingZoneInfo = props.waitingZoneInfo;
  const totalInfo = props.totalInfo;
  const carpetInfo = props.carpetInfo;
  const refArr = props.refArr;
  const setOpenError = props.setOpenError;
  const openError = props.openError;
  const absCarpetY = props.absCarpetY;
  const absWaitingY = props.absWaitingY;

  const multiManager = useRecoilValue(multiManagerAtom);
  const [multiModel, setMultiModel] = useRecoilState(multiModelAtom);
  const { CurrentModelNumber } = multiManager;
  const { CurrentChildNumber, SecondSpread } = multiModel[CurrentModelNumber];
  const { thisModelDeckType, thisModelSecondCardInfoArr, CurrentSelectNum } =
    SecondSpread[CurrentChildNumber];

  //const DeckType = SecondSpread[CurrentChildNumber].thisModelDeckType;
  const CardInfoArr =
    SecondSpread[CurrentChildNumber].thisModelSecondCardInfoArr[
      CurrentChildNumber
    ];
  //const { CurrentSelectNum } = SecondSpread[CurrentChildNumber];
  const [privateRotate, setPrivateRotate] = useState(
    thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isRotate
  );
  const [errorPos, setErrorPos] = useState({ x: 0, y: 0 });
  const [cardInfo, setCardInfo] = useState({ width: 0, height: 0, x: 0, y: 0 });

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
  // if (
  //   thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isRotate === true
  // ) {
  //   console.log(
  //     "rot true : ",
  //     thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].privateX
  //   );
  //   console.log("wait : ", waitingZoneInfo.x);
  //   let temp = cardRef.current.getBoundingClientRect();
  //   console.log(temp.width);
  // } else {
  //   console.log(
  //     "rot false : ",
  //     thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].privateX
  //   );

  //   let temp = cardRef.current.getBoundingClientRect();
  //   console.log("wait : ", waitingZoneInfo.x);
  //   console.log(temp.width);
  // }

  useEffect(() => {
    let tempObj = cardRef.current.getBoundingClientRect();
    setCardInfo({
      width: tempObj.width,
      height: tempObj.height,
      x: tempObj.x,
      y: tempObj.y,
    });
  }, []);
  useEffect(() => {
    if (
      thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isRotate === false
    ) {
      return;
    } else {
      setPrivateRotate(true);
    }
  }, []);
  //console.log("f2", waitingZoneInfo.x);
  const testItem2 = () => {
    let temp;
    if (thisModelDeckType !== 0) {
      if (thisModelDeckType === 1) {
        if (
          thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isDraged ===
            false &&
          thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isInSpread ===
            true
        ) {
          temp = {
            x: threePos[cardCount].x,
            y: threePos[cardCount].y,
          };
        } else {
          temp = {
            x: thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].privateX,
            y: thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].privateY,
          };
        }
      } else if (thisModelDeckType === 2) {
        if (
          thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isDraged ===
            false &&
          thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isInSpread ===
            true
        ) {
          temp = {
            x: sevenPos[cardCount].x,
            y: sevenPos[cardCount].y,
          };
        } else {
          temp = {
            x: thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].privateX,
            y: thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].privateY,
          };
        }
      } else if (thisModelDeckType === 3) {
        if (
          thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isDraged ===
            false &&
          thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isInSpread ===
            true
        ) {
          temp = {
            x: celticPos[cardCount].x,
            y: celticPos[cardCount].y,
          };
        } else {
          temp = {
            x: thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].privateX,
            y: thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].privateY,
          };
        }
      }
    } else if (thisModelDeckType === 0) {
      if (
        thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isDraged ===
          false &&
        thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isInSpread ===
          false
      ) {
        temp = {
          x: 0,
          y: 0,
          zIndex:
            thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].newIdx,
        };
      } else {
        temp = {
          x: thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].privateX,
          y: thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].privateY,
          zIndex: 0,
        };
      }
    }
    return temp;
  };
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
    //console.log(e.pageX);
    if (
      thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isInSpread !==
      true
    ) {
      return;
    }
    // 여기에 다시 포지션 잡는 코드 실험해야함
    let tempCard = cardRef.current.getBoundingClientRect();
    let alpha;
    let beta;

    let tempMulti = JSON.parse(JSON.stringify(multiModel));
    tempMulti[CurrentModelNumber].SecondSpread[
      CurrentChildNumber
    ].thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isRotate =
      !privateRotate;
    setPrivateRotate((prev) => !prev);
    setMultiModel(tempMulti);
  };
  const onDragStartHandler = (e) => {
    let alpha = waitingZoneInfo.x - (e.pageX - e.offsetX);
    let beta = waitingZoneInfo.y - (e.pageY - e.offsetY);
    setErrorPos({
      x: -alpha,
      y: -beta,
    });
    let tempObj = JSON.parse(JSON.stringify(multiModel));
    let tempObj2 =
      tempObj[CurrentModelNumber].SecondSpread[CurrentChildNumber]
        .thisModelSecondCardInfoArr[
        SecondSpread[CurrentChildNumber].CurrentSelectNum
      ][cardCount];
    // tempObj[CurrentModelNumber].SecondSpread[CurrentChildNumber]
    //   .thisModelSecondCardInfoArr[
    //   SecondSpread[CurrentChildNumber].CurrentSelectNum
    // ][cardCount].isDraged = true;

    tempObj2.isDraged = true;
    tempObj2.privateX = -alpha;
    tempObj2.privateY = -beta;

    setMultiModel(tempObj);
  };
  const onDragTestHandler = (e) => {
    posX = e.pageX;
    posY = e.pageY;

    let px = e.pageX; // - e.offsetX - carpetInfo.x;
    let py = e.pageY; // - e.offsetY - carpetInfo.y;
    let absCarpetBottom = absCarpetY + carpetInfo.height;
    if (
      px >= carpetInfo.left &&
      px <= carpetInfo.right &&
      py >= absCarpetY &&
      py <= absCarpetBottom
    ) {
      if (
        thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isInSpread ===
        true
      ) {
        return;
      } else {
        let tempObj = JSON.parse(JSON.stringify(multiModel));
        let tempObj2 =
          tempObj[CurrentModelNumber].SecondSpread[CurrentChildNumber]
            .thisModelSecondCardInfoArr[
            SecondSpread[CurrentChildNumber].CurrentSelectNum
          ][cardCount];

        tempObj2.isInSpread = true;

        tempObj[CurrentModelNumber].SecondSpread[CurrentChildNumber]
          .remainCardCount[CurrentSelectNum]--;
        setMultiModel(tempObj);
      }
    }
  };
  const onDragEndHandler = (e) => {
    let testX = e.pageX; // - e.offsetX - carpetInfo.x;
    let testY = e.pageY; // - e.offsetY - carpetInfo.y;

    let absCarpetBottom = absCarpetY + carpetInfo.height;

    let tempObj = JSON.parse(JSON.stringify(multiModel));
    let tempCardInfo = {
      ...thisModelSecondCardInfoArr[CurrentSelectNum][cardCount],
    };

    // 카드의 상대적 위치
    //  absCarpetY
    // console.log(waitingZoneInfo.x);
    console.log(e.pageX);
    console.log(e.offsetX);
    let alpha = waitingZoneInfo.x - (e.pageX - e.offsetX);
    let beta = absWaitingY - (e.pageY - e.offsetY);

    let cardObj = cardRef.current.getBoundingClientRect();
    let cardObjItem = {
      x: cardObj.x,
      y: cardObj.y,
    };

    // 에러 발생시 위치
    let gamma = waitingZoneInfo.x - carpetInfo.left;
    let delta = waitingZoneInfo.x - carpetInfo.right + cardInfo.width;
    let epsilon = carpetInfo.top - cardInfo.height;
    let zeta = carpetInfo.bottom - cardInfo.height * 2;

    if (
      testX >= carpetInfo.left &&
      testX <= carpetInfo.right &&
      testY >= absCarpetY &&
      testY <= absCarpetBottom
    ) {
      console.log("success");
      // absWaitingY
      if (tempCardInfo.isDraged === true && tempCardInfo.isInSpread === true) {
        tempCardInfo.privateX = -alpha;
        tempCardInfo.privateY = -beta;

        tempObj[CurrentModelNumber].SecondSpread[
          CurrentChildNumber
        ].thisModelSecondCardInfoArr[CurrentSelectNum][cardCount] =
          tempCardInfo;
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

  return (
    <Draggable nodeRef={cardRef}>
      <MultiDragCardWrapper
        ref={cardRef}
        drag
        waitinginfo={waitingZoneInfo}
        onDoubleClick={(e) => onDoubleClickHandler(e)}
        dragMomentum={false}
        onDragStart={(e) => onDragStartHandler(e)}
        onDrag={(e) => onDragTestHandler(e)}
        onDragEnd={(e) => {
          onDragEndHandler(e);
        }}
        dragConstraints={
          thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isInSpread ===
          false
            ? refArr[0]
            : refArr[1]
        }
        dragSnapToOrigin={
          thisModelSecondCardInfoArr[CurrentSelectNum][cardCount].isInSpread ===
          false
            ? true
            : false
        }
        variants={cardAniVar}
        initial="initial"
        animate={privateRotate === true ? "rotateTrue" : "rotateFalse"}
        whileDrag="hover"
        style={testItem2()}
      >
        {cardCount}
      </MultiDragCardWrapper>
    </Draggable>
  );
}

export default SecondDragCard;

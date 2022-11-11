/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { multiManagerAtom, secondManagerAtom } from "../atom/multiAtom";

const HomeWrapper = styled.div`
  width: 100%;
  height: ${(props) => (props.test === "true" ? "200vh" : "100vh")};
  position: relative;
`;
const backgroundAni = keyframes`
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
`;
const HomeContainer = styled.div`
  width: 100%;
  height: 100%;
  background: linear-gradient(
    120deg,
    ${(props) => props.theme.gra1},
    ${(props) => props.theme.gra2},
    ${(props) => props.theme.gra3},
    ${(props) => props.theme.gra4}
  );
  background-size: 500% 500%;
  animation: ${backgroundAni} 15s ease infinite;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function Home() {
  const [test, setTest] = useState(false);
  const [multiManager, setMultiManager] = useRecoilState(multiManagerAtom);
  const [secondManager, setSecondManager] = useRecoilState(secondManagerAtom);
  const navigate = useNavigate();

  useEffect(() => {
    let valid = sessionStorage.getItem("AccessAuthority");
    if (valid === "false" || valid === null || valid === undefined) {
      navigate("/auth");
    } else {
      let flag_1 = localStorage.getItem("MultiLoginHistory");
      if (flag_1 === null || flag_1 === "false") {
        let tempObj = JSON.parse(JSON.stringify(multiManager));
        let tempObj2 = JSON.parse(JSON.stringify(secondManager));
        // 최초의 값들. 최초의 최초의 값.
        // DeckType
        localStorage.setItem("DefaultDeckType", "1"); // 0 Free 1 Three
        // DeckName
        localStorage.setItem("DefaultListName1", "Star");
        localStorage.setItem("DefaultListName2", "Square");
        localStorage.setItem("DefaultListName3", "Triangle");
        localStorage.setItem("DefaultListName4", "Circle");
        localStorage.setItem("DefaultListName5", "Heart");
        // Card Count
        localStorage.setItem("DefaultCardCount", "3");
        // Preview Three Card
        localStorage.setItem("DefaultPreviewThree", "true");

        // Recoil Manager 에 담아줄것
        // 이 부분은 최초의 로그인 여부기 때문에 존재하지 않으니
        // 현재 아래 처럼 쓰는게 아니라 직접 값을 넣어줘야한다 최초의 값과 동일하게

        tempObj.DefaultNameArr[0] = "Star";
        tempObj.DefaultNameArr[1] = "Square";
        tempObj.DefaultNameArr[2] = "Triangle";
        tempObj.DefaultNameArr[3] = "Circle";
        tempObj.DefaultNameArr[4] = "Heart";

        //tempObj.DefaultNameArr = ["Star", "Square", "Triangle", "Circle", "Heart"]

        tempObj.DefaultCardCount = 3;
        tempObj.DefaultPreviewThree = true;
        tempObj.DefaultDeckType = 1;

        // second manager
        // DeckType
        localStorage.setItem("SecondDefaultDeckType", "1"); // 0 Free 1 Three
        // DeckName
        localStorage.setItem("SecondDefaultListName1", "Star");
        localStorage.setItem("SecondDefaultListName2", "Square");
        localStorage.setItem("SecondDefaultListName3", "Triangle");
        localStorage.setItem("SecondDefaultListName4", "Circle");
        localStorage.setItem("SecondDefaultListName5", "Heart");
        // Card Count
        localStorage.setItem("SecondDefaultCardCount", "3");
        // Preview Three Card
        localStorage.setItem("SecondDefaultPreviewThree", "true");

        tempObj2.DefaultNameArr[0] = "Star";
        tempObj2.DefaultNameArr[1] = "Square";
        tempObj2.DefaultNameArr[2] = "Triangle";
        tempObj2.DefaultNameArr[3] = "Circle";
        tempObj2.DefaultNameArr[4] = "Heart";
        //tempObj.DefaultNameArr = ["Star", "Square", "Triangle", "Circle", "Heart"]
        tempObj2.DefaultCardCount = 3;
        tempObj2.DefaultPreviewThree = true;
        tempObj2.DefaultDeckType = 1;

        setMultiManager(tempObj);
        setSecondManager(tempObj2);
      }

      // 만약 MultiLoginHistory가 존재한다면
      // 위 내용이 이미 존재한다는 뜻이니 로컬스토리지에서
      // 가져와서 리코일에 담아줄 것
      else {
        let tempObj = JSON.parse(JSON.stringify(multiManager));
        let tempObj2 = JSON.parse(JSON.stringify(secondManager));

        tempObj.DefaultDeckType = Number(
          localStorage.getItem("DefaultDeckType")
        ); // 0 Free 1 Three
        // DeckName
        tempObj.DefaultNameArr[0] = localStorage.getItem("DefaultListName1");
        tempObj.DefaultNameArr[1] = localStorage.getItem("DefaultListName2");
        tempObj.DefaultNameArr[2] = localStorage.getItem("DefaultListName3");
        tempObj.DefaultNameArr[3] = localStorage.getItem("DefaultListName4");
        tempObj.DefaultNameArr[4] = localStorage.getItem("DefaultListName5");
        // Card Count
        tempObj.DefaultCardCount = Number(
          localStorage.getItem("DefaultCardCount")
        );
        // Preview Three Card
        tempObj.DefaultPreviewThree = Boolean(
          localStorage.getItem("DefaultPreviewThree")
        );

        // DeckType
        tempObj2.DefaultDeckType = Number(
          localStorage.getItem("SecondDefaultDeckType")
        ); // 0 Free 1 Three
        // DeckName
        tempObj2.DefaultNameArr[0] = localStorage.getItem(
          "SecondDefaultListName1"
        );
        tempObj2.DefaultNameArr[1] = localStorage.getItem(
          "SecondDefaultListName2"
        );
        tempObj2.DefaultNameArr[2] = localStorage.getItem(
          "SecondDefaultListName3"
        );
        tempObj2.DefaultNameArr[3] = localStorage.getItem(
          "SecondDefaultListName4"
        );
        tempObj2.DefaultNameArr[4] = localStorage.getItem(
          "SecondDefaultListName5"
        );
        // Card Count
        tempObj2.DefaultCardCount = Number(
          localStorage.getItem("SecondDefaultCardCount")
        );
        // Preview Three Card
        tempObj2.DefaultPreviewThree = Boolean(
          localStorage.getItem("SecondDefaultPreviewThree")
        );
        setMultiManager(tempObj);
        setSecondManager(tempObj2);
      }
    }
  }, []);
  //console.log(multiManager);

  return (
    <HomeWrapper test={test && "true"}>
      <button
        style={{
          position: "absolute",
        }}
        onClick={(e) => {
          e.preventDefault();
          setTest(!test);
        }}
      >
        test
      </button>
      <button
        style={{
          position: "absolute",
          left: "10%",
        }}
        onClick={(e) => {
          e.preventDefault();
          navigate("/multi");
        }}
      >
        multi
      </button>
      <HomeContainer></HomeContainer>
    </HomeWrapper>
  );
}

export default React.memo(Home);

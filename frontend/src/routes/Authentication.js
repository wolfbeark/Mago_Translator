import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const AuthenticationWrapper = styled(motion.div)`
  width: 100%;
  height: 100vh;
  position: relative;
`;

const backgroundAni = keyframes`
    0%{background-position:0% 50%}
    50%{background-position:100% 50%}
    100%{background-position:0% 50%}
`;
const AuthenticationContainer = styled.div`
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
const AuthQuestionBox = styled(motion.div)`
  width: 40%;
  height: 60%;
  background-color: navy;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
`;
const AuthInput = styled(motion.input)`
  width: 80%;
  height: 20%;
`;
const AuthBtn = styled(motion.button)`
  width: 30%;
  height: 20%;
  background-color: gray;
`;

function Authentication() {
  const [value, setValue] = useState("");
  const PASSWORD = `spaceorca`;

  const navigate = useNavigate();
  const onChangeHandler = (e) => {
    setValue(e.target.value);
  };
  const confirmHandler = () => {
    if (value !== PASSWORD) {
      sessionStorage.setItem("AccessAuthority", "false");
      return;
    } else {
      sessionStorage.setItem("AccessAuthority", "true");
      navigate("/");
    }
  };
  useEffect(() => {
    let flag = sessionStorage.getItem("AccessAuthority");
    if (Boolean(flag) === true) {
      navigate("/");
    }
  }, []);
  return (
    <AuthenticationWrapper>
      <AuthenticationContainer>
        <AuthQuestionBox>
          <AuthInput
            value={value}
            type="password"
            onChange={(e) => {
              onChangeHandler(e);
            }}
          ></AuthInput>
          <AuthBtn
            onClick={(e) => {
              e.preventDefault();
              confirmHandler();
            }}
          >
            Next
          </AuthBtn>
        </AuthQuestionBox>
      </AuthenticationContainer>
    </AuthenticationWrapper>
  );
}

export default Authentication;

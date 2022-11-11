/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const DefaultOptionSettingWrapper = styled(motion.div)`
  position: absolute;
  width: 10%;
  height: ${(props) => props.optionwidth.width + `px`};
  background-color: tan;
  right: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function SecondDefaultOptionSetting(props) {
  const optionRef = useRef();
  const [optionWidth, setOptionWidth] = useState({ width: 0 });

  const setOpenSetting = props.setOpenSetting;

  // const openSettingPanelHandler = () => {
  //   setOpenSetting(true);
  // };
  useEffect(() => {
    let tempObj = optionRef.current.getBoundingClientRect();
    setOptionWidth({
      width: tempObj.width,
    });
  }, []);
  return (
    <DefaultOptionSettingWrapper ref={optionRef} optionwidth={optionWidth}>
      OPT
    </DefaultOptionSettingWrapper>
  );
}

export default SecondDefaultOptionSetting;

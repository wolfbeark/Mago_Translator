/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilValue } from "recoil";
import { multiManagerAtom } from "../../../atom/multiAtom";

const DefaultPreviewBoxWrapper = styled(motion.div)`
  width: 100%;
  height: 70%;
  background-color: coral;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const PreviewContent = styled(motion.div)`
  width: 100%;
  height: 100%;
  background-color: navy;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;
const PreviewDefaultNameContainer = styled(motion.div)`
  width: 70%;
  height: 95%;
  background-color: gray;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;
const PreviewDefaultName = styled.span`
  width: 90%;
  height: 13%;
  background-color: snow;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const PreviewDefaultSettingContainer = styled(motion.div)`
  width: 30%;
  height: 95%;
  background-color: azure;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

const PreviewSettingBox = styled(motion.div)`
  width: 100%;
  height: 30%;
  background-color: brown;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SettingListName = styled.span`
  width: 100%;
  height: 50%;
  background-color: seagreen;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SettingListContent = styled.span`
  width: 100%;
  height: 50%;
  background-color: goldenrod;
  display: flex;
  justify-content: center;
  align-items: center;
`;
function DefaultPreviewBox() {
  const multiManager = useRecoilValue(multiManagerAtom);
  const deckTypeNameArr = ["Free", "Three", "Seven", "Celtic"];
  useEffect(() => {}, [multiManager]);
  return (
    <DefaultPreviewBoxWrapper>
      <PreviewContent>
        <PreviewDefaultNameContainer>
          {multiManager.DefaultNameArr.map((a, i) => {
            return (
              <PreviewDefaultName key={`DefaultName${i}`}>
                {a}
              </PreviewDefaultName>
            );
          })}
        </PreviewDefaultNameContainer>
        <PreviewDefaultSettingContainer>
          <PreviewSettingBox>
            <SettingListName>Deck Type</SettingListName>
            <SettingListContent>
              {deckTypeNameArr[multiManager.DefaultDeckType]}
            </SettingListContent>
          </PreviewSettingBox>
          <PreviewSettingBox>
            <SettingListName>Preview 3 Card</SettingListName>
            <SettingListContent>
              {String(multiManager.DefaultPreviewThree)}
            </SettingListContent>
          </PreviewSettingBox>
          <PreviewSettingBox>
            <SettingListName>Card Count</SettingListName>
            <SettingListContent>
              {multiManager.DefaultCardCount}
            </SettingListContent>
          </PreviewSettingBox>
        </PreviewDefaultSettingContainer>
      </PreviewContent>
    </DefaultPreviewBoxWrapper>
  );
}

export default React.memo(DefaultPreviewBox);

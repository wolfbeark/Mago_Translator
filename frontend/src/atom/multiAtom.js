import { atom, selectorFamily } from "recoil";

let secondSpreadItem = {
  isOpen: false,
  isLongHeight: false,
  isDefined: false,
  modelType: false, // false default, true custom
  thisModelDeckType: 1,
  thisModelTotalCardCount: 0,
  firstCardCount: 0,
  extraCardCount: 0,
  thisModelPreviewThree: false,
  thisModelPreviewThreeNumArr: [],
  thisModelSecondCardInfoArr: [],
  remainCardCount: [],
  SecondRanNumArr: [],
  CurrentSelectNum: 0,
  SecondModelTabNameArr: ["Star", "Square", "Triangle", "Circle", "Heart"],
  SecondCardInfoArr: [[]], // 현재 사용되지 않음
};
export const secondSpreadItemPrefab = atom({
  key: "secondSpreadItemPrefab",
  default: {
    isLongHeight: false,
    isDefined: false,
    CurrentSelectNum: 0,
    SecondModelTabNameArr: ["Star", "Square", "Triangle", "Circle", "Heart"],
    SecondCardInfoArr: [[]],
  },
});
export const multiManagerAtom = atom({
  key: "multiManagerAtom",
  default: {
    isLongHeight: false,
    SpreadDefaultHeight: 0,
    ExistModelCount: 1, // 모델의 카운트 (모델 == 최상위)
    // 최상위 모델의 존재 숫자
    CurrentModelNumber: 0, // 현재 선택된 모델 넘버
    DefaultDeckType: 1,
    DefaultNameArr: ["Star", "Square", "Triangle", "Circle", "Heart"],
    DefaultCardCount: 3,
    DefaultPreviewThree: true,
  },
});
// FirstModelCount === 0 && CurrentModelNumber === 0

export const secondManagerAtom = atom({
  key: "secondManagerAtom",
  default: {
    //isLongHeight: false,
    //SpreadDefaultHeight: 0,
    ExistModelCount: 1, // 모델의 카운트 (모델 == 최상위)
    // 최상위 모델의 존재 숫자
    CurrentSecondModelNumber: 0, // 현재 선택된 모델 넘버
    DefaultDeckType: 1,
    DefaultNameArr: ["Star", "Square", "Triangle", "Circle", "Heart"],
    DefaultCardCount: 3,
    DefaultPreviewThree: true,
  },
});

export const multiModelAtom = atom({
  key: "multiModelAtom",
  default: [
    {
      isLongHeight: false,
      modelID: 0, // CurrentModelNumber와 비교
      modelName: "Untitle",
      modelDefined: false,
      modelType: false, // false = Default, true = Custom
      thisModelDeckType: 1,
      thisModelTotalCardCount: 0,
      firstCardCount: 0,
      extraCardCount: 0,
      remainCardCount: [],
      thisModelPreviewThree: true,
      // Preview 3장 번호 배열 필요
      thisModelPreviewThreeNumArr: [],
      thisModelChildNameArr: [],
      isFirstFold: false,
      thisModelFirstNumArr: [],
      // CurrentChildNumber : star냐 square냐 이거, Number
      CurrentChildNumber: 0,
      thisModelFirstCardInfoArr: [],
      TabOpenInfoArr: [
        [{ isOpen: false, isCreated: false, isLongHeight: false }],
      ],
      SelectedTabItemNumArr: [],
      Item0TabNum: 0, // 마지막에 열려있던 CurrentChildNumber
      //
      Item1TabNum: 0,
      Item2TabNum: 0,
      Item3TabNum: 0,
      Item4TabNum: 0,
      SecondSpreadModelArr: [],

      SecondSpread: [
        // star
        {
          ...secondSpreadItem,
        },
        // square
        {
          ...secondSpreadItem,
        },
        // triangle
        {
          ...secondSpreadItem,
        },
        // circle
        {
          ...secondSpreadItem,
        },
        // heart
        {
          ...secondSpreadItem,
        },
      ],
    },
  ],
});
export const multiModelSelector = selectorFamily({
  key: "multiModelSelectorFamily",
  get:
    (params) =>
    ({ get }) => {
      const data = get(multiModelAtom)[params].isFirstFold;
      //const tempData = data[params];
      return data;
    },
  set:
    (params) =>
    ({ set, get }, newValue) => {
      const data = get(multiModelAtom);
      const tempArr = JSON.parse(JSON.stringify(data));
      tempArr[params].isFirstFold = newValue;
      set(multiModelAtom, tempArr);
    },
});
export const multiHeightSelector = selectorFamily({
  key: "multiHeightSelector",
  get:
    (params) =>
    ({ get }) => {
      const data = get(multiModelAtom);
      const tempData = JSON.parse(JSON.stringify(data));
      return tempData[params].isLongHeight;
    },
  set:
    (params) =>
    ({ set, get }, newValue) => {
      const data = get(multiModelAtom);
      const tempData = JSON.parse(JSON.stringify(data));
      tempData[params].isLongHeight = newValue;
      set(multiModelAtom, tempData);
    },
});

// Prefabs
export const multiModelPrefabAtom = atom({
  key: "multiModelPrefabAtom",
  default: {
    isLongHeight: false,
    modelID: 0, // CurrentModelNumber와 비교
    modelName: "Untitle",
    modelDefined: false,
    modelType: false, // false = Default, true = Custom
    thisModelDeckType: 1,
    thisModelTotalCardCount: 0,
    firstCardCount: 0,
    extraCardCount: 0,
    remainCardCount: [],
    thisModelPreviewThree: true,
    // Preview 3장 번호 배열 필요
    thisModelPreviewThreeNumArr: [],
    thisModelChildNameArr: [],
    isFirstFold: false,
    thisModelFirstNumArr: [],
    // CurrentChildNumber : star냐 square냐 이거, Number
    CurrentChildNumber: 0,
    thisModelFirstCardInfoArr: [],
    TabOpenInfoArr: [
      [{ isOpen: false, isCreated: false, isLongHeight: false }],
    ],
    SelectedTabItemNumArr: [],
    FirstControlArr: [],
    SecondSpreadModelArr: [],
    SecondSpread: [
      // star
      {
        ...secondSpreadItem,
      },
      // square
      {
        ...secondSpreadItem,
      },
      // triangle
      {
        ...secondSpreadItem,
      },
      // circle
      {
        ...secondSpreadItem,
      },
      // heart
      {
        ...secondSpreadItem,
      },
    ],
  },
});

// isLongHeight: false,
//     modelID: 0, // CurrentModelNumber와 비교
//     modelName: "Untitle",
//     modelDefined: false,
//     modelType: false, // false = Default, true = Custom
//     thisModelDeckType: 1,
//     thisModelTotalCardCount: 0,
//     firstCardCount: 0,
//     extraCardCount: 0,
//     thisModelPreviewThree: true,
//     thisModelPreviewThreeNumArr: [],
//     thisModelFirstNumArr: [],
//     isFirstFold: false,
//     CurrentChildNumber: 0,

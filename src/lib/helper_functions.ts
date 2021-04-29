/************ Contents **********
 
1. getRandomNumber
2. changeBackgroundStyle

*********************************/

// 1. getRandomNumber
export const getRandomNumber = (maxNumber) => {
  return Math.floor(Math.random() * maxNumber);
};

// 2. changeBackgroundStyle
export const changeBackgroundStyle = (condition) => {
  const backgroundImg: HTMLElement = document.querySelector(".background-img");

  // Change of style when event is fired accord to answer being right or wrong
  if (condition) {
    backgroundImg.style.filter =
      "invert(64%) sepia(60%) saturate(2316%) hue-rotate(123deg) brightness(95%) contrast(87%)";
  } else {
    backgroundImg.style.filter =
      "invert(25%) sepia(99%) saturate(2207%) hue-rotate(334deg) brightness(88%) contrast(88%)";
  }

  // Style of background is reset to original
  const timeout = setTimeout(() => {
    backgroundImg.style.filter =
      "invert(96%) sepia(89%) saturate(2878%) hue-rotate(305deg) brightness(102%) contrast(98%)";
  }, 200);

  return () => clearTimeout(timeout);
};

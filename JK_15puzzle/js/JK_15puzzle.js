const boxContainer = document.getElementById('#boxContainer');
const boxItems = document.getElementsByClassName('boxItem');
const activeBox = document.getElementsByClassName('.activeBox')[0];
const boxItems0 = document.getElementById('15');

// 그래픽 처리
const HORIZONMOVEPX = 100;
const VERTICALMOVEPX = 100;

// 배열 처리
let currentPosiIndex;
let tempNewPosiVal;
const currentPuzzleArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
const answerPuzzleArr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

document.addEventListener('keydown', goDirection);

setNewGame();

function setNewGame() {

  // 초기 판 세팅
  for (let i = 0; i < boxItems.length; i++) {
    currentPosiIndex = 15;
    let x = Math.floor(i % 4);
    let y = Math.floor(i / 4);
    boxItems[i].style.left = `${HORIZONMOVEPX * x}px`;
    boxItems[i].style.top = `${VERTICALMOVEPX * y}px`;
  }
}

function makeRandom() {
  // for (let i = 0; i < 4, i++) {
  //   for (let j = 0; j < 4, j++) {
  // currentPuzzleArr[i][j] = 
  //   }
  // }
}

function goDirection(e) {
  switch (e.key) {
    case 'ArrowUp':
      if (Math.floor(currentPosiIndex / 4) != 3) {  // 0 Arr의 index가 12~15 아닐때
        goUp();
      }
      break;
    case 'ArrowDown':
      if (Math.floor(currentPosiIndex / 4) != 0) {  // 0 Arr의 index가 0~3 아닐때
        goDown();
      }
      break;
    case 'ArrowLeft':
      if (currentPosiIndex % 4 != 3) {  // 0 Arr의 index가 3~~15 아닐때
        goLeft();
      }
      break;
    case 'ArrowRight':
      if (currentPosiIndex % 4 != 0) {  // 0 Arr의 index가 0~12 아닐때
        goRight();
      }
      break;
  }
}

function goUp() {
  let otherPosiIndex = currentPosiIndex + 4;  // 11 = 15 - 4
  // let currentBoxX = currentPosiIndex % 4;
  let currentBoxY = Math.floor((currentPosiIndex) / 4);

  //// 픽셀 바꾸기
  // 아래쪽 박스 위쪽으로
  let moveToOtherPx = currentBoxY * HORIZONMOVEPX;
  boxItems[currentPuzzleArr[otherPosiIndex]].style.top = `${moveToOtherPx}px`;

  // 0 박스 아래쪽으로
  let moveToActivePx = (currentBoxY + 1) * HORIZONMOVEPX;
  boxItems[15].style.top = `${moveToActivePx}px`;

  //// 배열 바꾸기
  let otherValue = currentPuzzleArr[otherPosiIndex];    // 왼쪽 배열의 값 가져오기
  tempNewPosiVal = otherValue;
  currentPuzzleArr[otherPosiIndex] = 15;  // 오른쪽에 왼쪽 값 넣기
  currentPuzzleArr[currentPosiIndex] = tempNewPosiVal;
  currentPosiIndex = otherPosiIndex;
}

function goDown() {
  let otherPosiIndex = currentPosiIndex - 4;  // 11 = 15 - 4
  // let currentBoxX = currentPosiIndex % 4;
  let currentBoxY = Math.floor((currentPosiIndex) / 4);

  //// 픽셀 바꾸기
  // 위쪽 박스 아래쪽으로
  let moveToOtherPx = currentBoxY * HORIZONMOVEPX;
  boxItems[currentPuzzleArr[otherPosiIndex]].style.top = `${moveToOtherPx}px`;

  // 0 박스 위쪽으로
  let moveToActivePx = (currentBoxY - 1) * HORIZONMOVEPX;
  boxItems[15].style.top = `${moveToActivePx}px`;

  //// 배열 바꾸기
  let otherValue = currentPuzzleArr[otherPosiIndex];    // 왼쪽 배열의 값 가져오기
  tempNewPosiVal = otherValue;
  currentPuzzleArr[otherPosiIndex] = 15;  // 오른쪽에 왼쪽 값 넣기
  currentPuzzleArr[currentPosiIndex] = tempNewPosiVal;
  currentPosiIndex = otherPosiIndex;
}

function goLeft() {
  let otherPosiIndex = currentPosiIndex + 1;  // 15 = 14 + 1
  let currentBoxX = currentPosiIndex % 4;
  // let currentBoxY = Math.floor((currentPosiIndex) / 4);

  //// 픽셀 바꾸기
  // 오른쪽 박스 왼쪽으로
  let moveToOtherPx = currentBoxX * HORIZONMOVEPX;
  boxItems[currentPuzzleArr[otherPosiIndex]].style.left = `${moveToOtherPx}px`;

  // 0 박스 오른쪽으로
  let moveToActivePx = (currentBoxX + 1) * HORIZONMOVEPX;
  boxItems[15].style.left = `${moveToActivePx}px`;

  //// 배열 바꾸기
  let otherValue = currentPuzzleArr[otherPosiIndex];    // 왼쪽 배열의 값 가져오기
  tempNewPosiVal = otherValue;
  currentPuzzleArr[otherPosiIndex] = 15;  // 오른쪽에 왼쪽 값 넣기
  currentPuzzleArr[currentPosiIndex] = tempNewPosiVal;
  currentPosiIndex = otherPosiIndex;
}

function goRight() {
  let otherPosiIndex = currentPosiIndex - 1;  // 14 = 15 - 1
  let currentBoxX = currentPosiIndex % 4;
  // let currentBoxY = Math.floor((currentPosiIndex) / 4);

  //// 픽셀 바꾸기
  // 왼쪽 박스 오른쪽으로
  let moveToOtherPx = currentBoxX * HORIZONMOVEPX;
  boxItems[currentPuzzleArr[otherPosiIndex]].style.left = `${moveToOtherPx}px`;

  // 0 박스 왼쪽으로
  let moveToActivePx = (currentBoxX - 1) * HORIZONMOVEPX;
  boxItems[15].style.left = `${moveToActivePx}px`;

  //// 배열 바꾸기
  let otherValue = currentPuzzleArr[otherPosiIndex];    // 왼쪽 배열의 값 가져오기
  tempNewPosiVal = otherValue;
  currentPuzzleArr[otherPosiIndex] = 15;  // 왼쪽에 오른쪽 값 넣기
  currentPuzzleArr[currentPosiIndex] = tempNewPosiVal;
  currentPosiIndex = otherPosiIndex;
}
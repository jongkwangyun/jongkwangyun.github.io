const tdBoxs = document.querySelectorAll('.tdBox');
const numBox = document.querySelectorAll('.numBox');
const activeBox = document.querySelector('.activeBox');

// 그래픽 처리
const HORIZONMOVEPX = 100;
const VERTICALMOVEPX = 100;

// 배열 처리
let oldPosiArr = [];
let newPosiArr = [];
let tempNewPosiVal;
const currentTableArr = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]];
const answerTableArr = [[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 0]];

document.addEventListener('keydown', goDirection);

setNewGame();

function setNewGame() {
  oldPosiArr[0] = 3; oldPosiArr[1] = 3;
  newPosiArr[0] = 3; newPosiArr[1] = 3;
}

function makeRandom() {
  // for (let i = 0; i < 4, i++) {
  //   for (let j = 0; j < 4, j++) {
  // currentTableArr[i][j] = 
  //   }
  // }
}

function goDirection(e) {
  switch (e.key) {
    case 'ArrowUp':
      console.log('ArrowUp')
      goUp();
      break;
    case 'ArrowDown':
      console.log('ArrowDown')
      goDown();
      break;
    case 'ArrowLeft':
      console.log('ArrowLeft')
      goLeft();
      break;
    case 'ArrowRight':
      console.log('ArrowRight')
      goRight();
      break;
  }
}

function goRight() {
  if (oldPosiArr[1] > 0) {
    newPosiArr[1] -= 1;
    let newPosiStr = newPosiArr.join('');;

    // tdBox 클래스 돌림
    for (let tdBox of tdBoxs) {
      // 태그 바꾸기
      oldPosiStr = tdBox.id.substring(2, 4);
      if (newPosiStr == oldPosiStr) {
        const oldActiveBox = activeBox.parentElement  // old 임시 저장

        // old 삭제 후 그대로 new 에 붙임
        // const removedActiveBox = activeBox.parentElement.removeChild(activeBox);  // 자식인 activeBox 제거 후 변수 저장
        tdBox.appendChild(activeBox);  // new에 붙임
        activeBox.classList.remove('activeBox');
        setTimeout(activeBox.classList.add('activeBox'), 2000);


        // new 쪽 div 삭제 후 old 에 붙임
        const removedNumBox = tdBox.removeChild(tdBox.children[0]);
        oldActiveBox.appendChild(removedNumBox);

        // 배열 바꾸기
        tempNewPosiVal = currentTableArr[newPosiArr[0]][newPosiArr[1]];
        currentTableArr[newPosiArr[0]][newPosiArr[1]] = 'A';
        currentTableArr[oldPosiArr[0]][oldPosiArr[1]] = tempNewPosiVal;
      }
    }
  }

  oldPosiArr[0] = newPosiArr[0];
  oldPosiArr[1] = newPosiArr[1];
  console.log(currentTableArr);
  return;
}
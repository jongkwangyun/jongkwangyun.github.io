const t1 = document.querySelector('#t1');
const t2 = document.querySelector('#t2');
const t3 = document.querySelector('#t3');
const t4 = document.querySelector('#t4');
const t5 = document.querySelector('#t5');
const t6 = document.querySelector('#t6');
const t7 = document.querySelector('#t7');
const t8 = document.querySelector('#t8');
const t9 = document.querySelector('#t9');

let sign = 'X';
let gameOver = 0;
let gameCount = 0;
const tsArray = [t1, t2, t3, t4, t5, t6, t7, t8, t9];

function drawSign(event) {
  if (event.target.innerHTML === "") {
    event.target.innerHTML = sign;
  }

  gameCount++;
  winCheck();
  sign = sign === 'X' ? 'O' : 'X'  // 그린 후 부호 변경
}

function winCheck() {
  if (t5.innerHTML.length > 0) {  // 5 위치에서 가능한 승리 수 확인
    if (((t1.innerHTML == t5.innerHTML) && (t5.innerHTML == t9.innerHTML)) ||
      ((t2.innerHTML == t5.innerHTML) && (t5.innerHTML == t8.innerHTML)) ||
      ((t3.innerHTML == t5.innerHTML) && (t5.innerHTML == t7.innerHTML)) ||
      ((t4.innerHTML == t5.innerHTML) && (t5.innerHTML == t6.innerHTML))) {
      gameOver = 1;
    }
  }
  if (t1.innerHTML.length > 0) {  // 1 위치에서 가능한 가로세로 승리 수 확인
    if (((t1.innerHTML == t2.innerHTML) && (t2.innerHTML == t3.innerHTML)) ||
      ((t1.innerHTML == t4.innerHTML) && (t4.innerHTML == t7.innerHTML))) {
      gameOver = 1;
    }
  }
  if (t9.innerHTML.length > 0) {  // 9 위치에서 가능한 가로세로 승리 수 확인
    if (((t9.innerHTML == t6.innerHTML) && (t6.innerHTML == t3.innerHTML)) ||
      ((t9.innerHTML == t8.innerHTML) && (t8.innerHTML == t7.innerHTML))) {
      gameOver = 1;
    }
  }
  if (gameOver != 1 && gameCount == 9) {
    gameOver = 2;
  }
  console.log(gameCount)
  if (gameOver > 0) {
    if (gameOver == 1) {
      document.querySelector('div').innerHTML = sign + ' 승리!!';
    } else if (gameOver == 2) {
      document.querySelector('div').innerHTML = '무승부!!';
    }
    tsArray.forEach(t => t.removeEventListener('click', drawSign));  // 게임 끝난 후 추가로 그리기 해제
  }
}

tsArray.forEach(t => t.addEventListener('click', drawSign));
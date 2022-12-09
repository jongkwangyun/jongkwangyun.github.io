// 각 칸을 상수로 저장
const t1 = document.querySelector('#t1');
const t2 = document.querySelector('#t2');
const t3 = document.querySelector('#t3');
const t4 = document.querySelector('#t4');
const t5 = document.querySelector('#t5');
const t6 = document.querySelector('#t6');
const t7 = document.querySelector('#t7');
const t8 = document.querySelector('#t8');
const t9 = document.querySelector('#t9');
const tds = Array.from(document.getElementsByTagName('td'));  // HTMLCollection을 Array로 변환해야 forEach 사용 가능하다.
const pyosik1 = document.getElementsByClassName('cursorSelItem')[0];
const pyosik2 = document.getElementsByClassName('cursorSelItem')[1];
const pyosik3 = document.getElementsByClassName('cursorSelItem')[2];
const pyosiks = [pyosik1, pyosik2, pyosik3];
let cursor1 = '', cursor2 = '';

let sign = '',  // 초기 부호 저장
  sign1 = '',
  sign2 = '';
let gameOver = 0;  // 게임 끝 관련 변수로 저장
let gameCount = 0;  // 표시 횟수 변수로 저장
const tsArray = [t1, t2, t3, t4, t5, t6, t7, t8, t9];  // 이벤트 리스너 처리를 위한 배열 지정

tsArray.forEach(t => t.addEventListener('click', drawSign));  // t1~t9 이벤트 리스너 추가 간결하게 표현
pyosiks.forEach(i => i.addEventListener('click', selectPyosik));  // 표식 선택 이벤트 리스너 추가

function selectPyosik(event) {
  switch (event.target.id) {
    case 'cursorSelItem1':
      sign1 = '❌', sign2 = '⭕';
      cursor1 = 'xcursor', cursor2 = 'ocursor';
      break;
    case 'cursorSelItem2':
      sign1 = '🍗', sign2 = '🍕';
      cursor1 = 'ccursor', cursor2 = 'pcursor';
      break;
    case 'cursorSelItem3':
      sign1 = '🌙', sign2 = '⭐';
      cursor1 = 'mcursor', cursor2 = 'scursor';
      break;
    default:
  }
  document.getElementById('cursorSelBody').style.display = 'none';
  tds.forEach(td => td.classList.add(cursor1));  // 커서 모양 X 지정
  sign = sign1;
}

// 클릭시 X 또는 O 표시할 함수
function drawSign(event) {  // event : javascript가 주는 기본 정보를 argument로 받는다.
  if (event.target.innerHTML == "") {  // 클릭 이벤트가 발생한 태그 객체의 HTML 값이 비어있을때
    event.target.innerHTML = sign;  // 현재 저장된 부호를 출력한다.
    gameCount++;  // 1회 클릭시마다 +1 한다.
  }
  console.log(`sign = ${sign}, sign1 = ${sign1}, sign2 = ${sign2}`);
  console.log(cursor1, cursor2);  //////////////////////////// test
  console.log(gameCount);
  checkWin();  // 승리 조건이 충족되었는지 검사한다.
  checkGameOver();  // 승리 혹은 무승부인지 확인한다.
  defineSign();  // gameCount를 이용해 현재 부호를 결정한다.
}

function defineSign() {
  if (gameCount % 2 == 0) {
    sign = sign1;
    tds.forEach(td => td.classList.replace(cursor2, cursor1));  // 커서 모양 X 지정
  } else {
    sign = sign2;
    tds.forEach(td => td.classList.replace(cursor1, cursor2));  // 커서 모양 O 지정
  }
}

function checkWin() {
  if (t5.innerHTML.length > 0) {  // t5 위치에 부호가 있을때 가능한 승리 수 확인
    if (((t1.innerHTML == t5.innerHTML) && (t5.innerHTML == t9.innerHTML)) ||
      ((t2.innerHTML == t5.innerHTML) && (t5.innerHTML == t8.innerHTML)) ||
      ((t3.innerHTML == t5.innerHTML) && (t5.innerHTML == t7.innerHTML)) ||
      ((t4.innerHTML == t5.innerHTML) && (t5.innerHTML == t6.innerHTML))) {
      gameOver = 1;  // 한 쪽이 승리시 1
    }
  }
  if (t1.innerHTML.length > 0) {  // t1 위치에 부호가 있을때 가능한 승리 수 확인
    if (((t1.innerHTML == t2.innerHTML) && (t2.innerHTML == t3.innerHTML)) ||
      ((t1.innerHTML == t4.innerHTML) && (t4.innerHTML == t7.innerHTML))) {
      gameOver = 1;
    }
  }
  if (t9.innerHTML.length > 0) {  // t9 위치에 부호가 있을때 가능한 승리 수 확인
    if (((t9.innerHTML == t6.innerHTML) && (t6.innerHTML == t3.innerHTML)) ||
      ((t9.innerHTML == t8.innerHTML) && (t8.innerHTML == t7.innerHTML))) {
      gameOver = 1;
    }
  }
  if (gameOver != 1 && gameCount == 9) {  // 한 쪽이 승리하지 않고 9회 그렸을때
    gameOver = 2;  // 무승부시 2
  }
}

function checkGameOver() {
  if (gameOver > 0) {
    if (gameOver == 1) {
      document.querySelector('#result').innerHTML = `${sign} 승리!!`;  // 마지막 그린 부호 승리
      tds.forEach(td => td.classList.replace(td.classList.item(0), 'wincursor'));  // 커서 모양 교체
    } else if (gameOver == 2) {  // 무승부시
      document.querySelector('#result').innerHTML = '무승부!!';
      tds.forEach(td => td.classList.replace(td.classList.item(0), 'drawcursor'));  // 커서 모양 교체
    }
    tsArray.forEach(t => t.removeEventListener('click', drawSign));  // 게임 끝난 후 추가로 그리기 해제
  }
}
const { body } = document; //const body = document.body; 도큐먼트 객체 안에 바디라는 속성이 들어있음, 구조분해 할당, destructuring이라고함, 객체의 속성과 속성을 담는 변수명이 같을 때  

const $table = document.createElement('table');
const $result = document.createElement('div'); //결과창
const rows = [];
let turn = 'O';

// [
//   [td, td, td],
//   [td, td, td],
//   [td, td, td],
// ]

const checkWinner = (target) => {
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;

  // 세 칸 다 채워졌나?
  let hasWinner = false;
  // 가로줄 검사
  if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }
  // 세로줄 검사
  if (
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn
  ) {
    hasWinner = true;
  }
  // 대각선 검사
  if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn
  ) {
    hasWinner = true;
  }
  if (
    rows[0][2].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][0].textContent === turn
  ) {
    hasWinner = true;
  }
  return hasWinner;
};


const callback = (event) => {
  if (event.target.textContent !== '') { // 칸이 이미 채워져 있는가?
    console.log('빈칸이 아닙니다.');
    return;
  }
  // 빈칸이면
  console.log('빈칸입니다');
  event.target.textContent = turn;
  // 승부 판단하기
  const hasWinner = checkWinner(event.target);
  if (hasWinner) {
    $result.textContent = `${turn}님이 승리!`;
    $table.removeEventListener('click', callback);//게임이 완전히 종료될 때 붙여주는게 좋음
    return;
  }
  // 무승부 검사
  const draw = rows.flat().every((cell) => cell.textContent);
  if (draw) {
    $result.textContent = `무승부`;
    return;
  }
  turn = turn === 'X' ? 'O' : 'X'; //삼항 연상자 turn이 x일 때는 o로 바꾸고 o일 때는 x로 바꿔라
};

for (let i = 1; i <= 3; i++) {
  const $tr = document.createElement('tr');
  const cells = [];
  for (let j = 1; j <= 3; j++) {
    const $td = document.createElement('td');
    cells.push($td);
    $tr.append($td);
  }
  rows.push(cells);
  $table.append($tr);
}
$table.addEventListener('click', callback); // 이벤트 버블링을 이용한 것, 클릭은 td에 하고 있지만 이벤트는 테이블에 달았음, 이벤트 타겟도 td에 달렸음
body.append($table);
body.append($result);
//table은 변수로 지정해준다. 테이블 안에 tr, td를 넣어야하기 때문에
//document.createElement('td');와 같이 태그를 만들면 $를 사용해 변수로 빼놓는다, 재사용이 쉽기 때문에
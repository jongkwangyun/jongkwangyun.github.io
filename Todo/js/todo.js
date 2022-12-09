const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const listUl = document.querySelector('#listUl');
const date = new Date();
let nowMsec = date.getMilliseconds();

todoForm.addEventListener('submit', addTodo);  // 엔터시 목록 추가

function addTodo(event) {
  event.preventDefault();  // submit 기본동작(새로고침) 막기
  const listLi = document.createElement('li');
  const listLeftSpan = document.createElement('span');
  const listCenterSpan = document.createElement('span');
  const listRightSpan = document.createElement('span');
  listLeftSpan.className = 'listLeftSpan';
  listCenterSpan.className = 'listCenterSpan';
  listRightSpan.className = 'listRightSpan';
  listCenterSpan.addEventListener('click', drawCancel);

  // listCenterSpanArr.push(listCenterSpan);
  // listCenterSpanArr.forEach(i => i.addEventListener('click', drawCancel));  // 취소선 이벤트 리스너 추가

  listCenterSpan.textContent = todoInput.value;  // <li>에 텍스트 추가
  listLi.appendChild(listLeftSpan);  // 왼쪽에 가상의 박스 생성
  listLi.appendChild(listCenterSpan);  // 중앙에 리스트 박스 생성
  listLi.appendChild(listRightSpan);  // 오른쪽에 삭제 박스 생성
  listUl.appendChild(listLi);  // <ul>에 <li> 추가
  todoInput.value = null;
}

function drawCancel(event) {
  console.log(event.target);
  console.log(nowMsec);
}


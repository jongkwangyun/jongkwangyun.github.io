// "use strict";

const html = document.documentElement;
const todoForm = document.querySelector('#todoForm');
const todoInput = document.querySelector('#todoInput');
const listUl = document.querySelector('#listUl');
const itemStateDiv = document.querySelector('#itemStateDiv');
const checkAll = document.querySelector('#checkAll');
const itemLeftWord = document.querySelector('#itemLeftWord');
const itemLeftSpan = document.querySelector('#itemLeftSpan');
const itemAll = document.querySelector('#itemAll');
const itemActive = document.querySelector('#itemActive');
const itemCompleted = document.querySelector('#itemCompleted');
const itemClear = document.querySelector('#itemClear');

const todoStorage = window.localStorage;

let listLi;
let listLeftSpan, listCenterSpan, listRightSpan;
let outBG;

let date;
let nowMsec;
let doThing;
let checked = false;
let lsValue;  // localStorage의 Value
const lsValueArr = {};
let checkAllFlag;
let itemLeftCount = 0;
const sortStorageArr = [];

todoForm.addEventListener('submit', saveTodo);  // 엔터시 목록 추가
checkAll.addEventListener('click', handleCheckAll);
itemAll.addEventListener('click', selStateAll);
itemActive.addEventListener('click', selStateActive);
itemCompleted.addEventListener('click', selStateCompleted);
itemClear.addEventListener('click', doClear);

loadTodo();
showCheckAll();

function loadTodo() {
  makeTodoStorageSortedArr();
  if (todoStorage.length - 1 > 0) {
    for (let i = 0; i < sortStorageArr.length; i++) {
      nowMsec = sortStorageArr[i][0];
      doThing = sortStorageArr[i][1];
      checked = sortStorageArr[i][2];
      addTodo();
      if (checked) {  // localStorage checked: true에 따라 체크, 취소선
        listLeftSpan.classList.add('listLeftSpanCheck');
        listCenterSpan.classList.add('listCenterSpanCheck');
      }
    }
  } else {  // 
    while (listUl.lastElementChild) {
      listUl.removeChild(listUl.lastElementChild);
    }
  }
  handleItemLeft();
  whichState();
}

function showCheckAll() {
  if (todoStorage.length - 1 === 0) {  // localStorage에 checked 있는지 확인 후 checkAllFlag에 값 설정
    checkAllFlag = false;
    checkAll.className = '';
  } else {
    for (let i = 0; i < todoStorage.length; i++) {
      if (todoStorage.key(i) == 'selState') {
        continue;
      }
      lsValue = JSON.parse(todoStorage.getItem(todoStorage.key(i)));
      if (!lsValue.checked) {
        checkAllFlag = false;
        checkAll.classList.remove('allCheck');
        break;
      } else {
        checkAllFlag = true;
        checkAll.classList.add('allCheck');
      }
    }
  }
  handleItemLeft();
}

function saveTodo(event) {  // localStorage에 값 저장하기
  event.preventDefault();  // submit 기본동작(새로고침) 막기
  date = new Date;
  nowMsec = date.getTime();  // id(key) 변수
  doThing = todoInput.value;
  checked = false;
  lsValueArr.do = doThing;  // localStorage의 key: do
  lsValueArr.checked = checked;  //  localStorage의 key: checked
  todoStorage.setItem(nowMsec, JSON.stringify(lsValueArr));  // localStorage에 값 저장
  addTodo();
}

function addTodo() {  // 태그 추가하기
  listLi = document.createElement('li');
  listLeftSpan = document.createElement('span');
  listCenterSpan = document.createElement('span');
  listRightSpan = document.createElement('span');

  listLeftSpan.className = 'listLeftSpan';
  listCenterSpan.className = 'listCenterSpan';
  listCenterSpan.textContent = doThing;  // <li>에 텍스트 추가
  listRightSpan.className = 'listRightSpan';
  listLi.id = nowMsec;

  listLeftSpan.addEventListener('click', handleCheckedLeftSpan);  // 왼쪽 checked 확인 이벤트 리스너 추가
  // listCenterSpan.addEventListener('click', handleCheckedCenterSpan);  // 가운데 checked 확인 이벤트 리스너 추가
  listCenterSpan.addEventListener('dblclick', editDBClick);  // 더블 클릭 수정 이벤트 리스너 추가
  listRightSpan.addEventListener('click', removeTodo);  // 삭제용 x 클릭 이벤트 리스너 추가

  showTodo();
  hasTodoListChild();
  handleItemLeft();
}

function showTodo() {  // 화면에 할 일 목록 보이기
  listLi.appendChild(listLeftSpan);  // 왼쪽에 가상의 박스 생성
  listLi.appendChild(listCenterSpan);  // 중앙에 리스트 박스 생성
  listLi.appendChild(listRightSpan);  // 오른쪽에 삭제 박스 생성
  listUl.appendChild(listLi);  // <ul>에 <li> 추가
  todoInput.value = null;  // input 값 초기화
  handleItemLeft();
}

function handleCheckedLeftSpan(event) {  // 아이템 별 체크박스 체크 되었는지 확인하기
  event.target.classList.toggle('listLeftSpanCheck');
  event.target.nextSibling.classList.toggle('listCenterSpanCheck');

  // 체크시 localStorage에 값 반전하여 저장
  lsValue = JSON.parse(todoStorage.getItem(event.target.parentElement.id));
  lsValue.checked = !lsValue.checked;
  checked = lsValue.checked;
  todoStorage.setItem(event.target.parentElement.id, JSON.stringify(lsValue));
  showCheckAll();
  handleItemLeft();
}

// function handleCheckedCenterSpan(event) {
//   event.target.classList.toggle('listCenterSpanCheck')
//   event.target.previousSibling.classList.toggle('listLeftSpanCheck');

//   // 체크시 localStorage에 값 반전하여 저장
//   lsValue = JSON.parse(todoStorage.getItem(event.target.parentElement.id));
//   lsValue.checked = !lsValue.checked;
//   checked = lsValue.checked;
//   todoStorage.setItem(event.target.parentElement.id, JSON.stringify(lsValue));
//   showCheckAll();
//   handleItemLeft();
// }

function removeTodo(event) {
  event.target.parentElement.remove();
  todoStorage.removeItem(event.target.parentElement.id);
  hasTodoListChild();
  handleItemLeft();
}

function hasTodoListChild() {    // <ul>이 자식 노드 갖는지 검사 후 있으면 하단 메뉴 펼치기
  if (listUl.hasChildNodes()) {
    itemStateDiv.style.display = 'flex';
  } else {
    itemStateDiv.style.display = 'none';
    if (checkAll.classList.contains('allCheck')) {
      checkAll.classList.remove('allCheck');
    }
    if (checkAll.classList.contains('allUncheck')) {
      checkAll.classList.remove('allUncheck');
    }
  }
  checkAll.classList.add('allUncheck');
  showCheckAll();
}

function handleCheckAll() {
  checkAll.classList.toggle('allCheck');
  checkAllFlag = !checkAllFlag
  for (let i = 0; i < todoStorage.length; i++) {
    if (todoStorage.key(i) === 'selState') {
      continue;
    }
    lsValue = JSON.parse(todoStorage.getItem(todoStorage.key(i)));
    lsValue.checked = checkAllFlag;
    todoStorage.setItem(todoStorage.key(i), JSON.stringify(lsValue));
  }
  for (let i = 0; i < listUl.childElementCount; i++) {
    if (checkAllFlag) {
      listUl.childNodes[i].childNodes[0].classList.add('listLeftSpanCheck');
      listUl.childNodes[i].childNodes[1].classList.add('listCenterSpanCheck');
    } else {
      listUl.childNodes[i].childNodes[0].classList.remove('listLeftSpanCheck');
      listUl.childNodes[i].childNodes[1].classList.remove('listCenterSpanCheck');
    }
  }
  handleItemLeft();
}

function handleItemLeft() {
  itemLeftCount = 0;
  for (let i = 0; i < todoStorage.length; i++) {
    if (todoStorage.key(i) == 'selState') {
      continue;
    }
    lsValue = JSON.parse(todoStorage.getItem(todoStorage.key(i)));
    if (!lsValue.checked) {
      itemLeftCount++;
    }
  }
  itemLeftSpan.textContent = itemLeftCount;
  if (itemLeftCount == 1) {
    itemLeftWord.textContent = 'item left'
  } else {
    itemLeftWord.textContent = 'items left'
  }
}

function selStateAll() {
  todoStorage.setItem('selState', 'All');
  itemAll.classList.add('itemSel');
  itemActive.classList.remove('itemSel');
  itemCompleted.classList.remove('itemSel');

  for (let i = 0; i < listUl.childElementCount; i++) {
    listUl.childNodes[i].style.display = 'inline-table';
  }
}

function selStateActive() {
  todoStorage.setItem('selState', 'Active');
  itemAll.classList.remove('itemSel');
  itemActive.classList.add('itemSel');
  itemCompleted.classList.remove('itemSel');

  for (let i = 0; i < listUl.childElementCount; i++) {
    if (listUl.childNodes[i].firstChild.classList.contains('listLeftSpanCheck')) {
      listUl.childNodes[i].style.display = 'none';
    } else {
      listUl.childNodes[i].style.display = 'inline-table';
    }
  }
}

function selStateCompleted() {
  todoStorage.setItem('selState', 'Completed');
  itemAll.classList.remove('itemSel');
  itemActive.classList.remove('itemSel');
  itemCompleted.classList.add('itemSel');

  for (let i = 0; i < listUl.childElementCount; i++) {
    if (listUl.childNodes[i].firstChild.classList.contains('listLeftSpanCheck')) {
      listUl.childNodes[i].style.display = 'inline-table';
    } else {
      listUl.childNodes[i].style.display = 'none';
    }
  }
}

function whichState() {
  switch (todoStorage.getItem('selState')) {
    case 'All':
      selStateAll();
      break;
    case 'Active':
      selStateActive();
      break;
    case 'Completed':
      selStateCompleted();
      break;
    default:
      selStateAll();
  }
}

function doClear() {
  const deleteIdArr = [];
  for (let i = 0; i < todoStorage.length; i++) {
    if (Object.keys(todoStorage)[i] === 'selState') {
      continue;
    }
    lsValue = JSON.parse(todoStorage.getItem(Object.keys(todoStorage)[i]));
    if (lsValue.checked) {
      deleteIdArr.push(Object.keys(todoStorage)[i]);  // 삭제할 id 목록 생성. 이 부분 없으면 안됨
      for (let j = 0; j < listUl.childElementCount; j++) {  // HTML 태그 있는지 찾기
        if (Object.keys(todoStorage)[i] == listUl.children[j].id) {
          listUl.children[j].remove();
        }
      }
    }
  }
  deleteIdArr.forEach(id => todoStorage.removeItem(id));
  hasTodoListChild();
}

function editDBClick(event) {
  const editInput = document.createElement('input');
  const oldLiChild2 = event.target.parentElement.children[1];

  editInput.type = 'text';
  editInput.textContent = event.target.textContent;
  editInput.value = event.target.textContent;
  editInput.className = 'editInput';

  event.target.parentElement.replaceChild(editInput, oldLiChild2);
  editInput.focus();

  handleOutBG();

  editInput.addEventListener('keydown', editEndbyEnter);
  document.addEventListener('click', editEndbyOutClick);

  function editEndbyEnter(e) {  // 엔터키 입력시 완료시키기
    e.target.parentElement.replaceChild(oldLiChild2, e.target.parentElement.children[1]);
    editInput.removeEventListener('keydown', editEndbyEnter);

    outBG.remove();  // 외부 배경 삭제
  }

  function editEndbyOutClick(e) {  // input 상자 외부 클릭시 완료시키기
    if (!(e.target.classList.contains('editInput'))) {  // 클릭한 곳이 수정중인 곳인지
      editInput.parentElement.replaceChild(oldLiChild2, editInput.parentNode.children[1]);
      document.removeEventListener('click', editEndbyOutClick);
    }

    outBG.remove();  // 외부 배경 삭제
  }

}

function handleOutBG() {  // 외부 배경 투명100%로 설정
  outBG = document.createElement('div');
  html.style.position = 'relative';
  outBG.id = 'outBG';
  html.appendChild(outBG);
}

function makeTodoStorageSortedArr() {
  let tempArr;
  for (let i = 0; i < todoStorage.length; i++) {
    if (Object.keys(todoStorage)[i] === 'selState') {
      continue;
    }
    nowMsec = todoStorage.key(i);
    tempArr = JSON.parse(todoStorage.getItem(todoStorage.key(i)));
    sortStorageArr.push([nowMsec, tempArr.do, tempArr.checked]);
  }
  sortStorageArr.sort();
};
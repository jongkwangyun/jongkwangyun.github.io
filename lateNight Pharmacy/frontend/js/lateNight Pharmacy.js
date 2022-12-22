// findLocation();

const cardList = document.querySelector('.card-list');
const card = document.getElementsByClassName('card');

// 시계 표시
var now = new Date();
window.addEventListener("load", function () {
  var utcString = now.toISOString().substring(0, 19);
  var year = now.getFullYear();
  var month = now.getMonth() + 1;
  var day = now.getDate();
  var hour = now.getHours();

  var minute = now.getMinutes();
  var localDatetime = year + "-" +
    (month < 10 ? "0" + month.toString() : month) + "-" +
    (day < 10 ? "0" + day.toString() : day) + "T" +
    (hour < 10 ? "0" + hour.toString() : hour) + ":" +
    (minute < 10 ? "0" + minute.toString() : minute);
  utcString.substring(16, 19);
  var datetimeField = document.getElementById("date");
  datetimeField.value = localDatetime;
});

let pharmacyJSON;
let pharmacyRaw;
let DUTYTIMEXC;  // 사용자 입력 요일 or 오늘 요일
const posi = [];  // 카카오맵에서 사용할 위치

let userSelDistance = 1500;  // 선택한 거리
let userSelWeekday = now.getDay();  // 선택한 요일 월: 1, 화: 2, 수: 3, 목: 4, 금: 5, 토: 6, 일: 7, 공휴일: 8
let userSelCloseTime = 2400;  // 선택한 시간
let appendCount = 999;  // 사용자 입력 목록 보여줄 개수

// 강남역 중심부 위도, 경도  37.498095, 127.027610
var userLat = 37.498095;
var userLng = 127.027610;



/* 데이터 예시
DISTANCE: 101
DUTYADDR: "서울특별시 강남구 강남대로 388, 강남센타빌딩 지하 2층 2호 (역삼동)"
DUTYNAME: "강남역2번출구약국"
DUTYTEL1: "02-565-5490"
DUTYTIME1C: "1930"
DUTYTIME1S: "0930"
DUTYTIME2C: "1930"
DUTYTIME2S: "0930"
DUTYTIME3C: "1930"
DUTYTIME3S: "0830"
DUTYTIME4C: "1930"
DUTYTIME4S: "0930"
DUTYTIME5C: "2000"
DUTYTIME5S: "0930"
DUTYTIME6C: "1700"
DUTYTIME6S: "0800"
DUTYTIME7C: "1100"
DUTYTIME7S: "0830"
DUTYTIME8C: "2030"
DUTYTIME8S: "1000"
HPID: "C1109584"
POSTCDN1: "062"
POSTCDN2: "32"
WGS84LAT: "37.4974495848055"
WGS84LON: "127.028422526103"
WORK_DTTM: "2022-12-20 17:42:50.0"
*/

/* 데이터 가져오기//////////////////////////////////////////// */
let info;

let arr = [];
let arr2 = [];
let arr3 = [];
let arr4 = [];
let arr5 = [];
let arr6 = [];
let array = [];

(function main() {
  list1();
  list2();
  list3();
  list4();
  list5();
  list6();

  array = arr.concat(arr2, arr3, arr4, arr5, arr6);

  requestApi();

})();


function list1() {
  let xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    "http://openapi.seoul.go.kr:8088/6a62515758326d7938397967674b4f/json/TbPharmacyOperateInfo/1/1000/", false);
  xhr.send();

  info = JSON.parse(xhr.responseText);

  for (let value in info.TbPharmacyOperateInfo.row) {

    arr[value] = info.TbPharmacyOperateInfo.row[value];
  }
};

function list2() {
  let xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    "http://openapi.seoul.go.kr:8088/6a62515758326d7938397967674b4f/json/TbPharmacyOperateInfo/1001/2000/", false);
  xhr.send();

  info = JSON.parse(xhr.responseText);

  for (let value in info.TbPharmacyOperateInfo.row) {

    arr2[value] = info.TbPharmacyOperateInfo.row[value];
  }
};

function list3() {
  let xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    "http://openapi.seoul.go.kr:8088/6a62515758326d7938397967674b4f/json/TbPharmacyOperateInfo/2001/3000/", false);
  xhr.send();

  info = JSON.parse(xhr.responseText);

  for (let value in info.TbPharmacyOperateInfo.row) {

    arr3[value] = info.TbPharmacyOperateInfo.row[value];
  }
};

function list4() {
  let xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    "http://openapi.seoul.go.kr:8088/6a62515758326d7938397967674b4f/json/TbPharmacyOperateInfo/3001/4000/", false);
  xhr.send();

  info = JSON.parse(xhr.responseText);

  for (let value in info.TbPharmacyOperateInfo.row) {

    arr4[value] = info.TbPharmacyOperateInfo.row[value];
  }
};

function list5() {
  let xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    "http://openapi.seoul.go.kr:8088/6a62515758326d7938397967674b4f/json/TbPharmacyOperateInfo/4001/5000/", false);
  xhr.send();

  info = JSON.parse(xhr.responseText);

  for (let value in info.TbPharmacyOperateInfo.row) {

    arr5[value] = info.TbPharmacyOperateInfo.row[value];
  }
};

function list6() {
  let xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    "http://openapi.seoul.go.kr:8088/6a62515758326d7938397967674b4f/json/TbPharmacyOperateInfo/5001/6000/", false);
  xhr.send();

  info = JSON.parse(xhr.responseText);

  for (let value in info.TbPharmacyOperateInfo.row) {

    arr6[value] = info.TbPharmacyOperateInfo.row[value];
  }
};


function requestApi() {
  pharmacyRaw = array;

  handleResponse();
}

// function requestApi() {
//   let openPharmacyApiUrl = 'http://openapi.seoul.go.kr:8088' +
//     '/6a495a4f5a796a6b33396946646748'  // 인증키
//     + '/json/TbPharmacyOperateInfo'
//     + '/1'
//     + '/1000/';

//   var xhr = new XMLHttpRequest();

//   xhr.onreadystatechange = () => {
//     if (xhr.readyState == 4) {
//       if (xhr.status == 200) {
//         pharmacyJSON = JSON.parse(xhr.responseText);
//         pharmacyRaw = pharmacyJSON.TbPharmacyOperateInfo.row;
//         console.log(pharmacyJSON.TbPharmacyOperateInfo.row);

//         handleResponse();
//       }
//     }
//   }

//   xhr.open("GET", openPharmacyApiUrl, true);
//   xhr.send();
// }


// 데이터 응답 받았을때 실행할 함수
function handleResponse() {
  addArrPrototype();

  let pharmacyRawFiltered = pharmacyRaw.setDistanceFromGangnam().getByDistance().getSortedDistance().getByWeekdayTime(userSelWeekday);

  appendData(pharmacyRawFiltered);
}

function addArrPrototype() {

  // 약국 ~ 강남역(추후 현위치) 거리 계산 함수 (아래 주석 함수 수정)
  Array.prototype.setDistanceFromGangnam = function () {
    for (let item of this) {
      // console.log(userLat);
      item.DISTANCE = calcDistance(userLat, userLng, item.WGS84LAT, item.WGS84LON);  // item.distanceFromGangnam 추후 현위치로 변경시 변수명 수정
    }

    return this;
  };

  // userSelDiatance 로 데이터 필터링
  Array.prototype.getByDistance = function () {
    return this.filter((val) => (val.DISTANCE <= userSelDistance));
  };

  // 거리 오름차순 정렬
  Array.prototype.getSortedDistance = function () {
    return this.sort((a, b) => a.DISTANCE - b.DISTANCE);
  };

  // 시간으로 필터링. 인자: 유저 입력한 요일
  Array.prototype.getByWeekdayTime = function (userSelWeekday) {
    DUTYTIMEXC = `DUTYTIME${userSelWeekday}C`;

    return this.filter((val) => parseInt(val[DUTYTIMEXC]) >= userSelCloseTime);
  };
}

// 사용자 입력한 설정 개수에 따라 append 하는 함수
// DISTANCE: 101
// DUTYADDR: "서울특별시 강남구 강남대로 388, 강남센타빌딩 지하 2층 2호 (역삼동)"
// DUTYNAME: "강남역2번출구약국"
// DUTYTIME1C: "1930"
// DUTYTEL1: "02-565-5490"
function appendData(Arr) {
  for (let i = 0; i < appendCount; i++) {
    const cardDiv = document.createElement('div');
    const cardBody = document.createElement('div');

    // 약국명, 거리, 닫는시간, 주소, 번호
    const DUTYNAME_h4 = document.createElement('h4');
    const DISTANCE_h6 = document.createElement('h6');
    const DUTYTIMECLOSE_h6 = document.createElement('h6');
    const DUTYADDR_p = document.createElement('p');
    const DUTYTEL1_p = document.createElement('p');

    DUTYNAME_h4.innerText = Arr[i].DUTYNAME;
    DISTANCE_h6.innerText = `${Arr[i].DISTANCE}m`;
    DUTYTIMECLOSE_h6.innerText = `닫는시간 ${Arr[i][DUTYTIMEXC].slice(0, 2)}:${Arr[i][DUTYTIMEXC].slice(2)}`;
    DUTYADDR_p.innerText = Arr[i].DUTYADDR;
    DUTYTEL1_p.innerText = Arr[i].DUTYTEL1;

    cardDiv.classList.add('card');
    cardBody.classList.add('card-body');
    DUTYNAME_h4.classList.add('card-title');
    DISTANCE_h6.classList.add('card-subtitle', 'mb-2', 'text-muted');
    DUTYTIMECLOSE_h6.classList.add('card-subtitle', 'mb-2', 'text-muted');
    DUTYADDR_p.classList.add('card-text');
    DUTYTEL1_p.classList.add('card-text');

    // 위도 경도 태그에 넣기
    cardDiv.setAttribute('data-lat', Arr[i].WGS84LAT);
    cardDiv.setAttribute('data-lng', Arr[i].WGS84LON);

    cardBody.appendChild(DUTYNAME_h4);
    cardBody.appendChild(DISTANCE_h6);
    cardBody.appendChild(DUTYTIMECLOSE_h6);
    cardBody.appendChild(DUTYADDR_p);
    cardBody.appendChild(DUTYTEL1_p);
    cardDiv.appendChild(cardBody);

    cardDiv.addEventListener('click', moveMapByClick, true);

    // 부모 태그에 붙이기
    cardList.appendChild(cardDiv)
  }
}


// 위도, 경도 차이 이용하여 거리 계산하는 함수 - https://thesunrises.tistory.com/958
function calcDistance(lat1, lon1, lat2, lon2) {
  var theta = lon1 - lon2;
  let dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1))
    * Math.cos(deg2rad(lat2)) * Math.cos(deg2rad(theta));
  dist = Math.acos(dist);
  dist = rad2deg(dist);
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;
  return parseInt(Number(dist * 1000).toFixed(2));

  function deg2rad(deg) {
    return (deg * Math.PI / 180);
  }

  function rad2deg(rad) {
    return (rad * 180 / Math.PI);
  }
}



// 지도 이동
function moveMapByClick() {
  // card 나머지 class 속성에서 cardSel 있으면 제거하고 클릭한거한테 준다.
  for (let item of card) {
    if ((item.classList.contains('cardSel'))) {
      item.classList.remove('cardSel');
    }
  }

  event.currentTarget.classList.add('cardSel');

  // 클릭한 객체가 갖고 있는 Lat, Lng 를 받는다.
  posi[0] = event.currentTarget.getAttribute('data-lat');
  posi[1] = event.currentTarget.getAttribute('data-lng')

  // 부드럽게 이동
  // function panTo() {
  //   // 이동할 위도 경도 위치를 생성합니다 
  //   var moveLatLon = new kakao.maps.LatLng(posi[0], posi[1]);

  //   // 지도 중심을 부드럽게 이동시킵니다
  //   // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
  //   map.panTo(moveLatLon);
  // }

  setCenter();
  showMarker();
}


// 지도 이동
function setCenter() {
  // 이동할 위도 경도 위치를 생성합니다 
  var moveLatLon = new kakao.maps.LatLng(posi[0], posi[1]);

  // 지도 중심을 이동 시킵니다
  map.setCenter(moveLatLon);
}

// 내 위치 중심 지도 이동
function setMyCenter() {
  // 이동할 위도 경도 위치를 생성합니다 
  var moveLatLon = new kakao.maps.LatLng(userLat, userLng);

  // 지도 중심을 이동 시킵니다
  map.setCenter(moveLatLon);
}


// 마커 표시
function showMarker() {
  // 마커가 표시될 위치입니다 
  var markerPosition = new kakao.maps.LatLng(posi[0], posi[1]);

  // 마커를 생성합니다
  var marker = new kakao.maps.Marker({
    position: markerPosition
  });

  // 마커가 지도 위에 표시되도록 설정합니다
  marker.setMap(map);

  // 아래 코드는 지도 위의 마커를 제거하는 코드입니다
  // marker.setMap(null); 
}


// // 현위치 받아오는 함수
// function findLocation() {

//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       myLat = position.coords.latitude;
//       myLng = position.coords.longitude;

//       console.log(myLat);
//       setMyCenter();
//     });

//   } else {
//     alert("위치 찾기 실패");
//   }
// }

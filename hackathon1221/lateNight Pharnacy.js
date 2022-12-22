// function findLocation() {
//   if (navigator.geolocation) {
//     navigator.geolocation.getCurrentPosition(showYourLocation);

//   } else {
//     loc.innerHTML = "이 문장은 사용자의 웹 브라우저가 Geolocation API를 지원하지 않을 때 나타납니다!";
//   }
// }

// function showYourLocation(position) {
//   var userLat = position.coords.latitude;
//   var userLng = position.coords.longitude;

//   console.log(userLat, userLng);

//   var imgUrl = "http://maps.googleapis.com/maps/api/staticmap?center=" + userLat + "," + userLng + "&zoom=15&size=500x400&sensor=false";
//   document.getElementById("mapLocation").innerHTML = "<img src='" + imgUrl + "'>";
// }

// findLocation();



let pharmacyJSON;
let pharmacyRaw;
let DUTYTIMEXC;  // 사용자 입력 요일 or 오늘 요일

let userSelDistance = 2000;  // 선택한 거리
let userSelWeekday = 1;  // 선택한 요일 월: 1, 화: 2, 수: 3, 목: 4, 금: 5, 토: 6, 일: 7, 공휴일: 8
let userSelCloseTime = 1930;  // 선택한 시간
let appendCount = 3;  // 사용자 입력 목록 보여줄 개수

// 강남역 중심부 위도, 경도
let latGangnam = 37.498095;
let lngGangnam = 127.027610;


requestApi();



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

function requestApi() {
  let openPharmacyApiUrl = 'http://openapi.seoul.go.kr:8088' +
    '/6a495a4f5a796a6b33396946646748'  // 인증키
    + '/json/TbPharmacyOperateInfo'
    + '/1'
    + '/1000/';

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        pharmacyJSON = JSON.parse(xhr.responseText);
        pharmacyRaw = pharmacyJSON.TbPharmacyOperateInfo.row;

        handleResponse();
      }
    }
  }

  xhr.open("GET", openPharmacyApiUrl, true);
  xhr.send();
}

// 데이터 응답 받았을때 실행할 함수
function handleResponse() {
  let pharmacyRawFiltered = pharmacyRaw.setDistanceFromGangnam().getByDistance().getSortedDistance().getByWeekdayTime(userSelWeekday);

  appendData(pharmacyRawFiltered);
}

// 자전거거치소 ~ 강남역(추후 현위치) 거리 계산 함수 (아래 주석 함수 수정)
Array.prototype.setDistanceFromGangnam = function () {
  for (let item of this) {
    item.DISTANCE = calcDistance(latGangnam, lngGangnam, item.WGS84LAT, item.WGS84LON);  // item.distanceFromGangnam 추후 현위치로 변경시 변수명 수정
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
}

// 시간으로 필터링. 인자: 유저 입력한 요일
Array.prototype.getByWeekdayTime = function (userSelWeekday) {
  DUTYTIMEXC = `DUTYTIME${userSelWeekday}C`;

  return this.filter((val) => parseInt(val[DUTYTIMEXC]) <= userSelCloseTime);
}

// 사용자 입력한 설정 개수에 따라 append 하는 함수
// DISTANCE: 101
// DUTYADDR: "서울특별시 강남구 강남대로 388, 강남센타빌딩 지하 2층 2호 (역삼동)"
// DUTYNAME: "강남역2번출구약국"
// DUTYTEL1: "02-565-5490"
function appendData(Arr) {
  for (let i = 0; i < appendCount; i++) {
    const DUTYADDRDiv = document.createElement('div');
    const DUTYNAMEDiv = document.createElement('div');
    const DUTYTEL1Div = document.createElement('div');
    const DUTYTIMECLOSEDiv = document.createElement('div');
    const DISTANCEDiv = document.createElement('div');
    const listItem = document.createElement('div');  // 데이터 담을 부모

    DUTYADDRDiv.innerText = Arr[i].DUTYADDR;
    DUTYNAMEDiv.innerText = Arr[i].DUTYNAME;
    DUTYTEL1Div.innerText = Arr[i].DUTYTEL1;
    DUTYTIMECLOSEDiv.innerText = Arr[i][DUTYTIMEXC];
    DISTANCEDiv.innerText = Arr[i].DISTANCE;

    listItem.appendChild(DUTYADDRDiv);
    listItem.appendChild(DUTYNAMEDiv);
    listItem.appendChild(DUTYTEL1Div);
    listItem.appendChild(DUTYTIMECLOSEDiv);
    listItem.appendChild(DISTANCEDiv);

    console.log(listItem);

    // 부모 태그에 붙이기
    ///// 코드 필요
  }
}

// 위도, 경도 차이 이용하여 거리 계산하는 함수 - https://thesunrises.tistory.com/958
function calcDistance(lat1, lon1, lat2, lon2) {
  var theta = lon1 - lon2;
  dist = Math.sin(deg2rad(lat1)) * Math.sin(deg2rad(lat2)) + Math.cos(deg2rad(lat1))
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
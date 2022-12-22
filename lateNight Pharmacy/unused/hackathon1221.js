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



let bicycleJSON;
let bicycleRaw;
let userSelDistance = 10000;
let latGangnam = 37.498095;
let lngGangnam = 127.027610;



requestApi();


function requestApi() {
  let openBicycleApiUrl = 'http://openapi.seoul.go.kr:8088/'
    + '6a495a4f5a796a6b33396946646748/json/bikeList/'  // 인증키
    + '1/'
    + '1000/';

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        bicycleJSON = JSON.parse(xhr.responseText);
        bicycleRaw = bicycleJSON.rentBikeStatus.row

        handleResponse();
      }
    }
  }

  xhr.open("GET", openBicycleApiUrl, true);
  xhr.send();
}

// 데이터 응답 받았을때 실행할 함수
function handleResponse() {
  let bicycleRawFiltered = bicycleRaw.setDistanceFromGangnam().getByDistance().getSortedDistance());

  /* 데이터 예시
  distanceFromGangnam: 3691
  parkingBikeTotCnt: "7"
  rackTotCnt: "10"
  shared: "70"
  stationId: "ST-1441"
  stationLatitude: "37.52400970"
  stationLongitude: "127.00144958"
  stationName: "839. 보광동 삼성리버빌아파트 앞"
  */

  appendData(bicycleRawFiltered);
}

// 자전거거치소 ~ 강남역(추후 현위치) 거리 계산 함수 (아래 주석 함수 수정)
Array.prototype.setDistanceFromGangnam = function () {
  for (let item of this) {
    item.distanceFromGangnam = calcDistance(latGangnam, lngGangnam, item.stationLatitude, item.stationLongitude);  // item.distanceFromGangnam 추후 현위치로 변경시 변수명 수정
  }

  return this;
};

// userSelDiatance 로 데이터 필터링
Array.prototype.getByDistance = function () {
  return this.filter((val) => (val.distanceFromGangnam <= userSelDistance));
};

// 거리 오름차순 정렬
Array.prototype.getSortedDistance = function () {
  return this.sort((a, b) => a.distanceFromGangnam - b.distanceFromGangnam);
}

// 설정 개수에 따라 append 하는 함수. stationName(이름), rackTotCnt(주차 가능 대수), parkingBikeTotCnt(현재 남은 대수), distanceFromGangnam(현 위치로부터 거리)
function appendData(Arr) {
  const appendCount = 3;

  for (let i = 0; i < appendCount; i++) {
    const stationNameDiv = document.createElement('div');
    const rackTotCntDiv = document.createElement('div');
    const parkingBikeTotCntDiv = document.createElement('div');
    const distanceFromGangnamDiv = document.createElement('div');
    const listItem = document.createElement('div');

    stationNameDiv.innerText = Arr[i].stationName.substring(Arr[i].stationName.indexOf('.') + 2);
    rackTotCntDiv.innerText = Arr[i].rackTotCnt;
    parkingBikeTotCntDiv.innerText = Arr[i].parkingBikeTotCnt;
    distanceFromGangnamDiv.innerText = Arr[i].distanceFromGangnam;

    listItem.appendChild(stationNameDiv);
    listItem.appendChild(rackTotCntDiv);
    listItem.appendChild(parkingBikeTotCntDiv);
    listItem.appendChild(distanceFromGangnamDiv);

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
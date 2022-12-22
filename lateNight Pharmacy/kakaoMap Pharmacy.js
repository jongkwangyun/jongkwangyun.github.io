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
  function panTo() {
    // 이동할 위도 경도 위치를 생성합니다 
    var moveLatLon = new kakao.maps.LatLng(posi[0], posi[1]);

    // 지도 중심을 부드럽게 이동시킵니다
    // 만약 이동할 거리가 지도 화면보다 크면 부드러운 효과 없이 이동합니다
    map.panTo(moveLatLon);
  }

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

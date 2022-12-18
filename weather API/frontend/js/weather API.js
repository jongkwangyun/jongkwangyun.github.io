const todayTitle = document.getElementById('todayTitle');

/*
base_time : 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300 (1일 8회)
API 제공 시간(~이후) : 02:10, 05:10, 08:10, 11:10, 14:10, 17:10, 20:10, 23:10
*/

/* category 분류
      항목명           단위         압축bit수
TMP : 1시간 기온       ℃            10
UUU : 풍속(동서성분)   m/s          12
VVV : 풍속(남북성분)   m/s          12
VEC : 풍향             deg          10
WSD : 풍속             m/s          10
SKY : 하늘상태         코드값       4          맑음(1), 구름많음(3), 흐림(4)
PTY : 강수형태         코드값       4          없음(0), 비(1), 비/눈(2), 눈(3), 소나기(4) 
POP : 강수확률         %            8
WAV : 파고             M            8
PCP : 1시간 강수량     범주 (1 mm)  8          강수없음
REH : 습도             %            8
SNO : 1시간 신적설     범주 (1 cm)  8          적설없음, 1cm미
*/

let danGi;

// 날짜 관련
let now = new Date();
let dbYesterday = new Date(now.setDate(now.getDate() - 2));
let yesterday = new Date(now.setDate(now.getDate() + 1));
let tomorrow = new Date(now.setDate(now.getDate() + 2));

// 엊그제, 어제, 오늘, 내일 YYYYMMDD
let DbYesterdayY4MMDD = dbYesterday.getFullYear().toString() + (dbYesterday.getMonth() + 1).toString() + dbYesterday.getDate().toString();
let yesterdayY4MMDD = yesterday.getFullYear().toString() + (yesterday.getMonth() + 1).toString() + yesterday.getDate().toString();
let todayY4MMDD = now.getFullYear().toString() + (now.getMonth() + 1).toString() + now.getDate().toString();
let tomorrowY4MMDD = tomorrow.getFullYear().toString() + (tomorrow.getMonth() + 1).toString() + tomorrow.getDate().toString();
let timeToday = parseInt(now.getHours());  // 현재 시간

let eoJe = (yesterday.getMonth() + 1).toString() + '/' + yesterday.getDate().toString();
let oNul = (now.getMonth() + 1).toString() + '/' + now.getDate().toString();
let naeIl = (tomorrow.getMonth() + 1).toString() + '/' + tomorrow.getDate().toString();

// 배열: 온도: TMP, 하늘상태: SKY, 강수형태: PTY, 강수확률: POP, 습도: REH
let categoryArr = [];

// 문자열 선언
const TMP = 'TMP';
const POP = 'POP';
const REH = 'REH';
const SP = 'SP'
const SKY = 'SKY';
const PTY = 'PTY';
let SKYorPTY = '';
const GOTOWORK = 'goToWork';
const OFFWORK = 'offWork';
const NOW = 'now';

// 기상청 API '단기예보조회' 주소
let openApiUrl = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?'
  + 'serviceKey=SIpPDkmlBo0qtyFV%2FAeWpSdkJnYP7eifbqscOfjbMv54A%2FcMn%2FXTobs6G7YY5KBtM6uQO2cqcTkvxpO%2BxEfq6g%3D%3D'
  + '&pageNo=1'
  + '&numOfRows=1000'
  + '&dataType=JSON'
  + '&base_date=' + DbYesterdayY4MMDD
  + '&base_time=2300'
  + '&nx=61'  // 61, 125 : 강남구 역삼 1동(비트캠프)
  + '&ny=125'


// 페이지 로딩 되자마자 실행
document.body.onload = () => {
  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        danGi = JSON.parse(xhr.responseText);
        handleResponse();
      }
    }
  }
  xhr.open("GET", openApiUrl, true);
  xhr.send();
}



// 기상청 API 응답 받았을때 실행
function handleResponse() {
  console.log(getValue(SP, yesterdayY4MMDD, GOTOWORK));  // 온도: TMP, 강수확률: POP, 습도: REH, 하늘 및 강수: SP (하늘상태: SKY, 강수형태: PTY)
  console.log(SKYorPTY)
}

// 값 얻기
function getValue(category, whichdate, goOff) {  // 온도: TMP, 강수확률: POP, 습도: REH, 하늘 및 강수: SP (하늘상태: SKY, 강수형태: PTY)

  getCategoryDateArr(category, whichdate, goOff);
  const returnVal = getReturnVal(category, goOff);

  return returnVal;


}

function getCategoryDateArr(category, whichdate, goOff) {
  // 배열을 카테고리별 가공 후 날짜별 가공
  getCategoryArr(category);
  getWhichdateArr(whichdate);

  if (category = SP) {  // SP 일때만 검사
    // 출/퇴근 강수 확인
    if (goOff == GOTOWORK) {  // 출근 시간 강수 확인  
      if (categoryArr[7].fcstValue == '0' && categoryArr[8].fcstValue == '0') {
        SKYorPTY = SKY;  // 강수 없음
        getCategoryArr(SKY);
        getWhichdateArr(whichdate);
      }
    } else if (goOff == OFFWORK) {  // 퇴근 시간 강수 확인
      if (categoryArr[17].fcstValue == '0' && categoryArr[18].fcstValue == '0') {
        SKYorPTY = SKY;
        getCategoryArr(SKY);
        getWhichdateArr(whichdate);
      }
    }
  }
}

function getCategoryArr(category) {
  const danGiArr = danGi.response.body.items.item;  // item 객체 모음 배열

  if (category == SP) {
    SKYorPTY = PTY;
    // 강수형태(PTY) 지정 날짜 데이터 배열 만든다.
    categoryArr = danGiArr.filter(v => v.category == PTY);  // category 배열을 필터로 생성

    // 두 개 시간 중 숫자 더 큰걸로 표시한다.
  } else {
    categoryArr = danGiArr.filter(v => v.category == category);  // category 배열을 필터로 생성
  }
}

function getWhichdateArr(whichdate) {
  categoryArr = categoryArr.filter(v => v.fcstDate == whichdate)
  return categoryArr;
}

function getReturnVal(category, goOff) {
  if (category == TMP || category == POP || category == REH) {  // 온도, 강수확률, 습도 리턴
    switch (goOff) {
      case GOTOWORK:
        return Math.round((parseInt(categoryArr[7].fcstValue) + parseInt(categoryArr[8].fcstValue)) / 2);  // parseInt(시간항목.값)
        break;
      case OFFWORK:
        return Math.round((parseInt(categoryArr[17].fcstValue) + parseInt(categoryArr[18].fcstValue)) / 2);
        break;
      case NOW:
        return parseInt(categoryArr[timeToday].fcstValue);
        break;
      default:
        return -999;
    }
  } else if (category == SP) {  // 하늘 및 강수 리턴
    if (goOff == GOTOWORK) {
      return parseInt(categoryArr[7].fcstValue) > parseInt(categoryArr[8].fcstValue) ? parseInt(categoryArr[7].fcstValue) : parseInt(categoryArr[8].fcstValue);
    } else if (goOff == OFFWORK) {
      return parseInt(categoryArr[17].fcstValue) > parseInt(categoryArr[18].fcstValue) ? parseInt(categoryArr[17].fcstValue) : parseInt(categoryArr[18].fcstValue);
    } else {
      return -888;
    }
  } else {
    console.log(category);
    return -777;
  }
}


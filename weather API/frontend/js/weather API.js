// 태그 객체 변수 선언
const yesterdayTitle = document.getElementById('yesterdayTitle');
const todayTitle = document.getElementById('todayTitle');
const todayTime = document.getElementById('todayTime');
const tomorrowTitle = document.getElementById('tomorrowTitle');

const yeIcon = document.getElementById('yeIcon');
const yesterdayTemp = document.getElementById('yesterdayTemp');
const yeGoIcon = document.getElementById('yeGoIcon');
const yeGoTemp = document.getElementById('yeGoTemp');
const yeOffIcon = document.getElementById('yeOffIcon');
const yeOffTemp = document.getElementById('yeOffTemp');

const todayIcon = document.getElementById('todayIcon');
const todayCondition = document.getElementsByClassName('todayCondition');
const todayGoIcon = document.getElementById('todayGoIcon');
const todayCondition21 = document.getElementsByClassName('todayCondition21');
const todayOffIcon = document.getElementById('todayOffIcon');
const todayCondition22 = document.getElementsByClassName('todayCondition22');

const toIcon = document.getElementById('toIcon');
const tomorrowTemp = document.getElementById('tomorrowTemp');
const toGoIcon = document.getElementById('toGoIcon');
const toGoTemp = document.getElementById('toGoTemp');
const toGoDrop = document.getElementById('toGoDrop');
const toOffIcon = document.getElementById('toOffIcon');
const toOffTemp = document.getElementById('toOffTemp');
const toOffDrop = document.getElementById('toOffDrop');



// 날짜 관련
let now = new Date();
let nowToday = new Date(now);
let dbYesterday = new Date(now.setDate(now.getDate() - 2));
let yesterday = new Date(now.setDate(now.getDate() + 1));
let tomorrow = new Date(now.setDate(now.getDate() + 2));
const WEEKDAY = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
let nowHour = nowToday.getHours().toString().padStart(2, '0');
let nowMinute = nowToday.getMinutes().toString().padStart(2, '0');

// 엊그제, 어제, 오늘, 내일 YYYYMMDD
let nowY4MMDD;  // 현 시간 기준 조회시 필요한 Y4MMDD
let nowBaseTime;  // 현 시간 기준 조회시 필요한 BaseTime
let DbYesterdayY4MMDD = dbYesterday.getFullYear().toString() + ((dbYesterday.getMonth() + 1).toString()).padStart(2, '0') + dbYesterday.getDate().toString();
let yesterdayY4MMDD = yesterday.getFullYear().toString() + ((yesterday.getMonth() + 1).toString()).padStart(2, '0') + yesterday.getDate().toString();
let todayY4MMDD = nowToday.getFullYear().toString() + ((nowToday.getMonth() + 1).toString()).padStart(2, '0') + nowToday.getDate().toString();
let tomorrowY4MMDD = tomorrow.getFullYear().toString() + ((tomorrow.getMonth() + 1).toString()).padStart(2, '0') + tomorrow.getDate().toString();
let timeToday;  // 현재 시간

// 어제, 오늘, 내일에 쓸 변수 선언
let oNul = (nowToday.getMonth() + 1).toString() + '/' + nowToday.getDate().toString();
let eoJe = (yesterday.getMonth() + 1).toString() + '/' + yesterday.getDate().toString();
let naeIl = (tomorrow.getMonth() + 1).toString() + '/' + tomorrow.getDate().toString();
let nowTime = `${nowHour}:${nowMinute}`;
let yeWeekday = WEEKDAY[yesterday.getDay()];
let todayWeekday = WEEKDAY[nowToday.getDay()];
let toWeekday = WEEKDAY[tomorrow.getDay()];

// 어제, 오늘, 내일 날짜 HTML 에 입력
yesterdayTitle.innerText = `🥚 어제 ${eoJe}${yeWeekday}`;
todayTitle.innerText = `🐣 오늘 ${oNul}${todayWeekday}`;
tomorrowTitle.innerText = `🦢 내일 ${naeIl}${toWeekday}`;
todayTime.innerText = `⏰ ${nowTime}`;

// JSON parse 해서 객체 선언
let danGi = {};

// 배열: 온도: TMP, 하늘상태: SKY, 강수형태: PTY, 강수확률: POP, 습도: REH
let categoryArr = [];

// 문자열 선언
const TMP = 'TMP';
const POP = 'POP';
const REH = 'REH';
const SP = 'SP'
const SKY = 'SKY';
const PTY = 'PTY';
const GOTOWORK = 'goToWork';
const OFFWORK = 'offWork';
const NOW = 'now';
let goToWorkNum;
let offWorkNum;

// 아이콘 사이즈 관련
const LARGE = 'today';
const MEDIUM = 'yeto';
const SMALL = 'yetoGoOff';

let SKYorPTY = '';



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


// 데이터 요청 실행
getDanGi();
getDanGiNow();

function getDanGi() {

  // 기상청 API '단기예보조회' 주소 엊그제 데이터 가져옴
  let openApiUrl = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?'
    + 'serviceKey=SIpPDkmlBo0qtyFV%2FAeWpSdkJnYP7eifbqscOfjbMv54A%2FcMn%2FXTobs6G7YY5KBtM6uQO2cqcTkvxpO%2BxEfq6g%3D%3D'
    + '&pageNo=1'
    + '&numOfRows=1000'
    + '&dataType=JSON'
    + '&base_date=' + DbYesterdayY4MMDD
    + '&base_time=2300'
    + '&nx=61'  // 61, 125 : 강남구 역삼 1동(비트캠프)
    + '&ny=125';

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        danGi = JSON.parse(xhr.responseText);
        // getDanGiNow();
      }
    }
  }

  xhr.open("GET", openApiUrl, true);
  xhr.send();
}


// 현 시간 기준 예보 받아오기
function getDanGiNow() {
  // 현 시간 기준으로 현재 데이터 가져올 날짜, 시간 변수에 저장
  if (parseInt(nowHour + nowMinute) < 300) {  // 현 시간 02:00 이전일 경우 어제 23:00 기준 데이터 가져옴
    nowY4MMDD = yesterdayY4MMDD;
    nowBaseTime = '2300'
  } else {
    nowY4MMDD = todayY4MMDD;
    if (parseInt(nowHour + nowMinute) < 600) {  // 현 시간 06:00 이전일 경우 오늘 02:00 기준 데이터 가져옴  0200 기준: 0300 0400 0500 0600 ... 현 시간 06:00 일 경우 05:00 기준 데이터: 0600 0700 ...
      nowBaseTime = '0200';
    } else if (parseInt(nowHour + nowMinute) < 0900) {
      nowBaseTime = '0500';
    } else if (parseInt(nowHour + nowMinute) < 1200) {
      nowBaseTime = '0800';
    } else if (parseInt(nowHour + nowMinute) < 1500) {
      nowBaseTime = '1100';
    } else if (parseInt(nowHour + nowMinute) < 1800) {
      nowBaseTime = '1400';
    } else if (parseInt(nowHour + nowMinute) < 2100) {
      nowBaseTime = '1700';
    } else if (parseInt(nowHour + nowMinute) < 2400) {
      nowBaseTime = '2000';
    } else {
      console.log('getDanGiNow() -> nowBaseTime 변수 에러');
      nowBaseTime = '0000';
    }
  }

  // https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=SIpPDkmlBo0qtyFV%2FAeWpSdkJnYP7eifbqscOfjbMv54A%2FcMn%2FXTobs6G7YY5KBtM6uQO2cqcTkvxpO%2BxEfq6g%3D%3D&pageNo=1&numOfRows=1000&dataType=JSON&base_date=20230120&base_time=0500&nx=61&ny=125
  
  // 현 시간 기준 조회시 가져올 데이터 주소
  let openNowApiUrl = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?'
    + 'serviceKey=SIpPDkmlBo0qtyFV%2FAeWpSdkJnYP7eifbqscOfjbMv54A%2FcMn%2FXTobs6G7YY5KBtM6uQO2cqcTkvxpO%2BxEfq6g%3D%3D'
    + '&pageNo=1'
    + '&numOfRows=1000'
    + '&dataType=JSON'
    + '&base_date=' + nowY4MMDD
    + '&base_time=' + nowBaseTime
    + '&nx=61'  // 61, 125 : 강남구 역삼 1동(비트캠프)
    + '&ny=125';

  var xhr = new XMLHttpRequest();

  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4) {
      if (xhr.status == 200) {
        nowDanGi = JSON.parse(xhr.responseText);  // 데이터 정상 응답
        handleResponse();
      }
    }
  }

  xhr.open("GET", openNowApiUrl, true);
  xhr.send();
}


// 기상청 API 응답 받았을때 실행
function handleResponse() {

  // 어제, 오늘, 내일 데이터 채우기
  yeIcon.className = getIconClassName(getValue(SP, yesterdayY4MMDD, NOW), MEDIUM);
  yesterdayTemp.innerText = `🌡온도 ${getValue(TMP, yesterdayY4MMDD, NOW)} ℃`;
  yeGoIcon.className = getIconClassName(getValue(SP, yesterdayY4MMDD, GOTOWORK), SMALL);
  yeGoTemp.innerText = `🌡온도 ${getValue(TMP, yesterdayY4MMDD, GOTOWORK)} ℃`;
  yeOffIcon.className = getIconClassName(getValue(SP, yesterdayY4MMDD, OFFWORK), SMALL);
  yeOffTemp.innerText = `🌡온도 ${getValue(TMP, yesterdayY4MMDD, OFFWORK)} ℃`;

  todayIcon.className = getIconClassName(getValue(SP, todayY4MMDD, NOW), LARGE);
  todayCondition[0].innerText = `🌡온도 ${getValue(TMP, todayY4MMDD, NOW)} ℃`;
  todayCondition[1].innerText = `💧습도 ${getValue(REH, todayY4MMDD, NOW)} %`;
  todayCondition[2].innerText = `☂강수 ${getValue(POP, todayY4MMDD, NOW)} %`;
  todayGoIcon.className = getIconClassName(getValue(SP, todayY4MMDD, GOTOWORK), MEDIUM);
  todayCondition21[0].innerText = `🌡온도 ${getValue(TMP, todayY4MMDD, GOTOWORK)} ℃`;
  todayCondition21[1].innerText = `💧습도 ${getValue(REH, todayY4MMDD, GOTOWORK)} %`;
  todayCondition21[2].innerText = `☂강수 ${getValue(POP, todayY4MMDD, GOTOWORK)} %`;
  todayOffIcon.className = getIconClassName(getValue(SP, todayY4MMDD, OFFWORK), MEDIUM);
  todayCondition22[0].innerText = `🌡온도 ${getValue(TMP, todayY4MMDD, OFFWORK)} ℃`;
  todayCondition22[1].innerText = `💧습도 ${getValue(REH, todayY4MMDD, OFFWORK)} %`;
  todayCondition22[2].innerText = `☂강수 ${getValue(POP, todayY4MMDD, OFFWORK)} %`;

  toIcon.className = getIconClassName(getValue(SP, tomorrowY4MMDD, NOW), MEDIUM);
  tomorrowTemp.innerText = `🌡온도 ${getValue(TMP, tomorrowY4MMDD, NOW)} ℃`;
  toGoIcon.className = getIconClassName(getValue(SP, tomorrowY4MMDD, GOTOWORK), SMALL);
  toGoTemp.innerText = `🌡온도 ${getValue(TMP, tomorrowY4MMDD, GOTOWORK)} ℃`;
  toGoDrop.innerText = `☂강수 ${getValue(POP, tomorrowY4MMDD, GOTOWORK)} %`;
  toOffIcon.className = getIconClassName(getValue(SP, tomorrowY4MMDD, OFFWORK), SMALL);
  toOffTemp.innerText = `🌡온도 ${getValue(TMP, tomorrowY4MMDD, OFFWORK)} ℃`;
  toOffDrop.innerText = `☂강수 ${getValue(POP, tomorrowY4MMDD, OFFWORK)} %`;
}

// 해, 구름 등 기상상황에 따른 아이콘 얻기
function getIconClassName(value, iconSize) {
  let iSize = '';
  if (iconSize == LARGE) {
    iSize = LARGE;
  } else if (iconSize == MEDIUM) {
    iSize = MEDIUM;
  } else if (iconSize == SMALL) {
    iSize = SMALL;
  }

  if (SKYorPTY == SKY) {  // 강수 없을 때
    switch (value) {
      case 1:
        return `${iSize}Sun`;
        break;
      case 3:
        return `${iSize}Cloud`;
        break;
      case 4:
        return `${iSize}Blur`;
        break;
      default:
        return -555;
    }
  } else if (SKYorPTY == PTY) {
    switch (value) {
      case 1:
        return `${iSize}Rain`;
        break;
      case 2:
        return `${iSize}Rainsnow`;
        break;
      case 3:
        return `${iSize}Snow`;
        break;
      case 4:
        return `${iSize}Shower`;
        break;
      default:
        return -544;
    }
  } else {
    return -533;
  }
}

// 값 얻기
// category: 온도: TMP, 강수확률: POP, 습도: REH, 하늘 및 강수: SP (하늘상태: SKY, 강수형태: PTY)
// whichdate : yesterdayY4MMDD, todayY4MMDD, tomorrowY4MMDD
// goOff : GOTOWORK, OFFWORK, NOW
function getValue(category, whichdate, goOff) {
  getCategoryDateArr(category, whichdate, goOff);

  return getReturnVal(category, goOff);
}

// category별 날짜별 배열 얻기
// category: 온도: TMP, 강수확률: POP, 습도: REH, 하늘 및 강수: SP (하늘상태: SKY, 강수형태: PTY)
// whichdate : yesterdayY4MMDD, todayY4MMDD, tomorrowY4MMDD
// goOff : GOTOWORK, OFFWORK, NOW
function getCategoryDateArr(category, whichdate, goOff) {
  // 배열을 카테고리별 가공 후 날짜별 가공
  getCategoryArr(category, whichdate, goOff);
  getWhichdateArr(whichdate);

  // 오늘 데이터 배열에서 제거된 값 때문에 인덱스 변경
  if (whichdate == todayY4MMDD) {
    goToWorkNum = 7 - parseInt(nowBaseTime.slice(0, 2)) - 1;  // 출근num(7) - nowBaseTime(2) - 1 = 4
    goToWorkNum = goToWorkNum < 0 ? 7 : goToWorkNum;  // 현 시간 0900 이상일시 어제 데이터 사용하므로 7로 리셋
    offWorkNum = 17 - parseInt(nowBaseTime.slice(0, 2)) - 1;  // 퇴근num(17) - nowBaseTime(11) - 1 = 5
    offWorkNum = offWorkNum < 0 ? 17 : offWorkNum;  // 현 시간이 1800 이상일시 어제 데이터 사용하므로 17로 리셋
    timeToday = parseInt(nowHour) - parseInt(nowBaseTime.slice(0, 2)) - 1;
  } else {
    goToWorkNum = 7;
    offWorkNum = 17;
    timeToday = parseInt(now.getHours());
  }

  if (category = SP) {  // SP 일때만 검사
    // 출/퇴근 강수 확인
    if (goOff == GOTOWORK) {  // 출근 시간 강수 확인  
      if (categoryArr[goToWorkNum].fcstValue == '0' && categoryArr[goToWorkNum + 1].fcstValue == '0') {
        SKYorPTY = SKY;  // 강수 없음
        getCategoryArr(SKY);
        getWhichdateArr(whichdate);
      }
    } else if (goOff == OFFWORK) {  // 퇴근 시간 강수 확인
      if (categoryArr[offWorkNum].fcstValue == '0' && categoryArr[offWorkNum + 1].fcstValue == '0') {
        SKYorPTY = SKY;
        getCategoryArr(SKY);
        getWhichdateArr(whichdate);
      }
    } else if (goOff == NOW) {  // 현재 시간 강수 확인
      // console.log(category, whichdate, goOff, timeToday, categoryArr);
      if (categoryArr[timeToday].fcstValue == '0') {
        SKYorPTY = SKY;
        getCategoryArr(SKY);
        getWhichdateArr(whichdate);
      }
    }
  }
}

// category 별 배열 변경
function getCategoryArr(category, whichdate, goOff) {

  let danGiArr = danGi.response.body.items.item;  // item 객체 모음 배열

  // 오늘 날씨 중 출근 퇴근은 현 시간 기준으로 (엊그제 or 실시간) 쓸지 결정
  if (whichdate == todayY4MMDD) {

    // NOW 이면 최근 데이터 반영
    if (goOff == NOW) {
      danGiArr = nowDanGi.response.body.items.item;

      // 출근일때
    } else if (goOff == GOTOWORK) {

      // 현 시간이 0900 이전이면 오늘 출근에 오늘 0500 기준 데이터 사용
      if (parseInt(nowHour + nowMinute) < 900) {
        danGiArr = nowDanGi.response.body.items.item;
      }

      // 퇴근일때
    } else if (goOff == OFFWORK) {

      // 현 시간이 1800 이전이면 오늘 퇴근에 오늘 1400 기준 데이터 사용
      if (parseInt(nowHour + nowMinute) < 1800) {
        danGiArr = nowDanGi.response.body.items.item;
      }
    }

    // 내일 날씨는 현시간 받은 데이터 사용
  } else if (whichdate == tomorrowY4MMDD) {
    danGiArr = nowDanGi.response.body.items.item;
  }


  // 카테고리가 SP 이면 하늘상황, 강수형태로 분기
  if (category == SP) {
    SKYorPTY = PTY;
    // 강수형태(PTY) 지정 날짜 데이터 배열 만든다.
    categoryArr = danGiArr.filter(v => v.category == PTY);  // category 배열을 필터로 생성

    // 두 개 시간 중 숫자 더 큰걸로 표시한다.
  } else {
    categoryArr = danGiArr.filter(v => v.category == category);  // category 배열을 필터로 생성
  }
}

// category 받아 날짜별 배열 변경
function getWhichdateArr(whichdate) {
  categoryArr = categoryArr.filter(v => v.fcstDate == whichdate)
  return categoryArr;
}

// 온도, 습도, 강수확률 return
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
    } else if (goOff == NOW) {
      return parseInt(categoryArr[timeToday].fcstValue)
    } else {
      return -888;
    }
  } else {
    return -777;
  }
}


/* base_time
0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300 (1일 8회)
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


/* 변수 선언 ----------------------------------------------------  */

let danGi;

// 날짜 관련
let now = new Date();
let dbYesterday = new Date(now.setDate(now.getDate() - 2));
let yesterday = new Date(now.setDate(now.getDate() + 1));
let tomorrow = new Date(now.setDate(now.getDate() + 2));

// 엊그제, 어제, 오늘, 내일
let yearDbYesterdayStr = dbYesterday.getFullYear().toString();
let monthDbYesterdayStr = (dbYesterday.getMonth() + 1).toString();
let dateDbYesterdayStr = dbYesterday.getDate().toString();
let DbYesterdayY4MMDD = yearDbYesterdayStr + monthDbYesterdayStr + dateDbYesterdayStr;

let yearYesterdayStr = yesterday.getFullYear().toString();
let monthYesterdayStr = (yesterday.getMonth() + 1).toString();
let dateYesterdayStr = yesterday.getDate().toString();
let yesterdayY4MMDD = yearYesterdayStr + monthYesterdayStr + dateYesterdayStr;

let yearTodayStr = now.getFullYear().toString();
let monthTodayStr = (now.getMonth() + 1).toString();
let dateTodayStr = now.getDate().toString();
let todayY4MMDD = yearTodayStr + monthTodayStr + dateTodayStr;

let yearTomorrowStr = tomorrow.getFullYear().toString();
let monthTomorrowStr = (tomorrow.getMonth() + 1).toString();
let dateTomorrowStr = tomorrow.getDate().toString();
let tomorrowY4MMDD = yearTomorrowStr + monthTomorrowStr + dateTomorrowStr;

let eoJe = `${monthYesterdayStr}/${dateYesterdayStr}`;
let oNul = `${monthTodayStr}/${dateTodayStr}`;
let naeIl = `${monthTomorrowStr}/${dateTomorrowStr}`;

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

// 배열: 온도, 하늘상태, 강수형태, 강수확률, 습도
let danGiTMPArr = [];
let danGiSKYArr = [];
let danGiPTYArr = [];
let danGiPOPArr = [];
let danGiREHArr = [];

/* 변수 선언 종료 ---------------------------------------------------- */


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


/* 함수 선언 ---------------------------------------------------- */

// 기상청 API 응답 받았을때 실행
function handleResponse() {
  const danGiArr = danGi.response.body.items.item;  // item 객체 모음 배열
  danGiTMPArr = danGiArr.filter(v => v.category == 'TMP');  // 온도 배열을 필터로 생성
  danGiSKYArr = danGiArr.filter(v => v.category == 'SKY');  // 하늘상태 배열을 필터로 생성
  danGiPTYArr = danGiArr.filter(v => v.category == 'PTY');  // 강수형태 배열을 필터로 생성
  danGiPOPArr = danGiArr.filter(v => v.category == 'POP');  // 강수확률 배열을 필터로 생성
  danGiREHArr = danGiArr.filter(v => v.category == 'REH');  // 습도 배열을 필터로 생성

  console.log(getTemp(yesterdayY4MMDD, 'max'));

  danGiSKYSelDateArr = danGiSKYArr.filter(v => v.fcstDate == '20221217');
  console.log(danGiSKYSelDateArr);

}

// 온도 얻기
function getTemp(whichDate, minNowMax) {
  const danGiTMPSelDateValArr = [];  // 어제 온도 값 배열 선언

  danGiTMPSelDateArr = danGiTMPArr.filter(v => v.fcstDate == whichDate);
  for (let v of danGiTMPSelDateArr) {
    danGiTMPSelDateValArr.push(parseInt(v.fcstValue));
  }

  switch (minNowMax) {
    case 'min':
      return Math.min(...danGiTMPSelDateValArr);
      break;
    case 'max':
      return Math.max(...danGiTMPSelDateValArr);
      break;
    case 'now':

      return Math.max(...danGiTMPSelDateValArr);
      break;
    default:
      return -999;
  }
}


// express 라이브러리 로딩하기
const { query } = require('express');
const express = require('express');

// HTTP 요청을 다루는 라이브러리 로딩하기
const request = require('request');

// 웹서버 포트 번호
const port = 3000;

// express()를 호출하여 웹서버를 준비한다.
const app = express();

// POST 요청으로 보낸 payload 데이터를 분석할 객체를 지정하기
// => Content-Type: application/x-www.form-urlencoded 형식으로 된 payload 처리
app.use(express.urlencoded({ extended: true }));

app.listen(
  port,  // 포트 번호 지정
  () => {
    console.log(`${port}번 포트에서 서버 시작했음!`);
  }  // 서버가 시작되었을 때 호출될 함수 = 리스너 = 이벤트 핸들러
);

app.get('/proxy2', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Content-Type', 'applicaiton/json; charset=UTF-8');

  let openApiUrl = 'https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?'
    + 'serviceKey=SIpPDkmlBo0qtyFV%2FAeWpSdkJnYP7eifbqscOfjbMv54A%2FcMn%2FXTobs6G7YY5KBtM6uQO2cqcTkvxpO%2BxEfq6g%3D%3D'
    + '&pageNo=1'
    + '&numOfRows=1000'
    + '&dataType=JSON'
    + '&base_date=20221217'
    + '&base_time=1100'
    + '&nx=61'  // 61, 125 : 강남구 역삼 1동(비트캠프)
    + '&ny=125'

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

  request.get({
    uri: openApiUrl
  }, (error, response, body) => {
    res.send(body);
  });
});

/* 원래는 프록시 요청을 해야 하지만 공공데이터 단기예보 API 는 직접 요청으로도 데이터 수신 가능하여 구현하지 않았습니다. */
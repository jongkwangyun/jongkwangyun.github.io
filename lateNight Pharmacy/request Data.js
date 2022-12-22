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
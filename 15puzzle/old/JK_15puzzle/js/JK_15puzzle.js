const boxItemsByQuerySelectorAll = document.querySelectorAll('.boxItem');
const boxItemsByClassName = document.getElementsByClassName('boxItem');
const boxItemsByTagName = document.getElementsByTagName('div');

const boxItemByQuerySelector = document.querySelector('#index0');
const boxItemById = document.getElementById('#index0');

// const Arr = Array.prototype.slice.call(boxItemsByQuerySelectorAll);
const Arr = [1, 2, 3];

Arr.sort(() => -1);

console.log(Arr)
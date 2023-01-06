const dogs = [
  {
    이름: '맥스',
    무게: 10,
    견종: '보스턴 테리어',
    지역: '위스콘신',
    색상: '검정색',
  },
  {
    이름: '도니',
    무게: 90,
    견종: '래브라도레트리버',
    지역: '캔자스',
    색상: '검정색',
  },
  {
    이름: '섀도',
    무게: 40,
    견종: '래브라도레트리버',
    지역: '위스콘신',
    색상: '갈색',
  },
];

function getDogNames(dogs, filterFunc) {
  return dogs
    .filter(filterFunc)
    .map(dog => dog['이름'])
}

const weightCheck = weight => dog => dog['무게'] < weight;

console.log(getDogNames(dogs, weightCheck(20)));
let puzzle = document.querySelector(".puzzle-container");
let startButton = document.querySelector(".startBtn");
let complete = document.querySelector(".complete-text");
let puzzleList = puzzle.children;

let cnt = 16;
let j = 0;

let lll = new Array(cnt).fill().forEach((n, i) => {
    let li = document.createElement("li");
    li.setAttribute("index", i);
    li.classList.add(`list${i}`);
    puzzle.appendChild(li);

    j++;

    li.innerText = j;
});


puzzle.addEventListener("click", (e) => {
    let emptyList = document.querySelector(".list15");

    let emptyBox = Array.from(puzzleList).indexOf(emptyList);
    let targetBox = Array.from(puzzleList).indexOf(e.target);
    let num = emptyBox - targetBox;

    switch (num) {
        case 1: {
            // 빈칸이 오른쪽에 있을 때
            puzzle.insertBefore(emptyList, e.target);
            break;
        }
        case -1: {
            // 빈칸이 왼쪽에 있을 때
            puzzle.insertBefore(e.target, emptyList);
            break;
        }
        case 4: {
            // 빈칸이 아래에 있을 때
            puzzle.insertBefore(emptyList, e.target);
            puzzle.insertBefore(e.target, puzzleList[emptyBox + 1]);
            break;
        }
        case -4: {
            // 빈칸이 위에 있을 때
            puzzle.insertBefore(emptyList, e.target);
            puzzle.insertBefore(e.target, puzzleList[emptyBox]);
            break;
        }
    }

    checkIndex();
});

startButton.addEventListener("click", () => {
    let newList = Array.from(puzzleList).sort(() => Math.random() - 0.5);

    newList.map((li) => puzzle.append(li));
});

function checkIndex() {
    let result = [];

    Array.from(puzzleList).map((li) => {
        let id = li.getAttribute("index");
        let count = Array.from(puzzleList).indexOf(li);

        if (+id === count) {
            result.push(true);
        } else {
            result.push(false);
        }
    });

    setTimeout(() => {
        result.indexOf(false) === -1 && alert("Complete!");
    }, 0);
}
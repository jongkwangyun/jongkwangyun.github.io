const todoMainDiv = document.querySelector("#todoMain");
const input = document.querySelector("#userInput");
const todoMenuDiv = document.querySelector("#todoBottom");
const todoListDiv = document.querySelector("#todoList");
const todoListCount = document.querySelector("#todoListCount");

const allSelectbox = document.querySelector("#allSelect");
const listAllBtn = document.querySelector("#listAll");
const listActiveBtn = document.querySelector("#listActive");
const listCompletedBtn = document.querySelector("#listCompleted");
const clearCompletedBtn = document.querySelector("#clearCompleted");

let listCount = 0;
let checkboxID = 0;
let currentList = "listAll";

input.addEventListener("keydown", (event) => {

    if (input.value != "" &&  event.key == "Enter") {
        
        const childDiv = document.createElement("div");
        childDiv.classList.add("todoItem");

        const childInput = document.createElement("input");
        childInput.type = "checkbox";
        childInput.id = `list${checkboxID}`
        const childLabel = document.createElement("label");
        childLabel.htmlFor = `list${checkboxID}`;
        checkboxID++;
        listCount++;

        const childP = document.createElement("p");
        childP.innerHTML = input.value;
        input.value = "";

        childInput.addEventListener("change", () => {
            if (childInput.checked) {
                childP.classList.add("complete");
                localStorage.setItem(childInput.id,childInput.id);
            }
            else {
                childP.classList.remove("complete");
                localStorage.removeItem(childInput.id);
            }         
            updateList(currentList);
        });
        
        const childBtn = document.createElement("button");
        childBtn.innerHTML = "×";
        childBtn.addEventListener("click", () => {
            todoListDiv.removeChild(childDiv);
            childDiv.remove();
            listCount--;
            todoListCount.innerHTML = `${listCount} items left`

            if (listCount === 0) {
                todoMenuDiv.style.display = "none";
                checkboxID = 0;
            }

            localStorage.removeItem(childInput.id);
            localStorage.setItem("data",todoListDiv.innerHTML);

            updateList(currentList);
        });

        childDiv.appendChild(childInput);
        childDiv.appendChild(childLabel);
        childDiv.appendChild(childP);
        childDiv.appendChild(childBtn);

        todoListDiv.appendChild(childDiv);

        const divHeight = (childDiv.offsetHeight / 2) - 15;
        childLabel.style.top = `${divHeight}px`;

        todoMenuDiv.style.display = "block";
        todoListCount.innerHTML = `${listCount} items left`

        localStorage.setItem("data",todoListDiv.innerHTML);       
        localStorage.setItem("countId",checkboxID);

        updateList(currentList);
    }
});

allSelectbox.addEventListener("change", () => {
    if (allSelectbox.checked) {
        todoListDiv.childNodes.forEach((element) => {
            if (!element.firstChild.checked) {
                element.firstChild.click();
            }
        })
    } else {
        todoListDiv.childNodes.forEach((element) => {
            if (element.firstChild.checked) {
                element.firstChild.click();
            }
        })
    }
});

listAllBtn.addEventListener("click", () => {
    currentList = "listAll"
    localStorage.setItem("currentList",currentList);

    updateAllList();
    listAllBtn.classList.add("selectedListStyle");
    listActiveBtn.classList.remove("selectedListStyle");
    listCompletedBtn.classList.remove("selectedListStyle");
});
listActiveBtn.addEventListener("click", () => {
    currentList = "listActive"
    localStorage.setItem("currentList",currentList);

    updateActiveList();
    listAllBtn.classList.remove("selectedListStyle");
    listActiveBtn.classList.add("selectedListStyle");
    listCompletedBtn.classList.remove("selectedListStyle");
});
listCompletedBtn.addEventListener("click", () => {
    currentList = "listCompleted"
    localStorage.setItem("currentList",currentList);

    updateCompletedList();
    listAllBtn.classList.remove("selectedListStyle");
    listActiveBtn.classList.remove("selectedListStyle");
    listCompletedBtn.classList.add("selectedListStyle");
});
clearCompletedBtn.addEventListener("click", () => {
    let clearList = [];
    for (let element of todoListDiv.childNodes) {    
        if (element.firstChild.checked) {
            clearList.push(element);
        }
    }
    for (let i= 0; i < clearList.length; i++) {
        clearList[i].lastChild.click();
    }

    localStorage.setItem("data",todoListDiv.innerHTML);
    updateList(currentList);

    if (allSelectbox.checked) {
        allSelectbox.click();
    }
});


window.onload = function() {
    if (localStorage.length != 0) {        
        todoListDiv.innerHTML = localStorage.getItem("data");
        listCount = 0;
        checkboxID = parseInt(localStorage.getItem("countId"));

        todoListDiv.childNodes.forEach((child) => {
            child.style.display = "block";
            child.childNodes[0].addEventListener("change", () => {
                if (child.childNodes[0].checked) {
                    child.childNodes[2].classList.add("complete");
                    localStorage.setItem(child.childNodes[0].id,child.childNodes[0].id);
                }
                else {
                    child.childNodes[2].classList.remove("complete");
                    localStorage.removeItem(child.childNodes[0].id);
                }       
                updateList(currentList);     
            })

            child.childNodes[3].addEventListener("click", () => {
                todoListDiv.removeChild(child);
                child.remove();
                listCount--;
                todoListCount.innerHTML = `${listCount} items left`

                if (listCount === 0) {
                    todoMenuDiv.style.display = "none";
                    checkboxID = 0;
                }

                localStorage.removeItem(child.childNodes[0].id);
                localStorage.setItem("data",todoListDiv.innerHTML);    
                
                updateList(currentList);    
            })
            listCount++;
        })

        if (listCount > 0) {
            todoMenuDiv.style.display = "block";
            todoListCount.innerHTML = `${listCount} items left`
        }

        for (let data in localStorage) {
            if (data.substring(0,4) === "list") {
                let completedItem = document.querySelector(`#${data}`);

                if (completedItem) {
                    completedItem.click();
                }
                else {
                    localStorage.removeItem(data);
                }

            }
            
        }
        currentList = localStorage.getItem("currentList");
        document.getElementById(currentList).click();
        updateList(currentList);
    }
};


function updateList(currentList) {
    switch (currentList) {
        case "listAll":
            updateAllList();
            break;
        case "listActive":
            updateActiveList();
            break;
        case "listCompleted":
            updateCompletedList();
            break;
        default:
            break;
    }
}



function updateAllList() {
    let activeCount = 0;
    todoListDiv.childNodes.forEach((todoItem) => {
        todoItem.style.display = "block";       
        if (!todoItem.firstChild.checked) {
            activeCount++;
        } 
    })
    if (activeCount === listCount) {
        clearCompletedBtn.style.display = "none";
    } else {
        clearCompletedBtn.style.display = "initial";
    }
    todoListCount.innerHTML = `${activeCount} items left`
}

function updateActiveList() {
    let activeCount = 0;
    todoListDiv.childNodes.forEach((todoItem) => {
        if (todoItem.firstChild.checked) {
            todoItem.style.display = "none";
        } else {
            todoItem.style.display = "block";
            activeCount++;
        }        
    })    
    todoListCount.innerHTML = `${activeCount} items left`
    clearCompletedBtn.style.display = "none";
}

function updateCompletedList() {
    let completedCount = 0;
    let activeCount = 0;
    todoListDiv.childNodes.forEach((todoItem) => {
        if (!todoItem.firstChild.checked) {
            todoItem.style.display = "none";
            activeCount++;
        } else {
            todoItem.style.display = "block";
            completedCount++;
        }           
    })
    if (completedCount === 0) {
        clearCompletedBtn.style.display = "none";
    } else {
        clearCompletedBtn.style.display = "initial";
    }
    todoListCount.innerHTML = `${activeCount} items left`
}
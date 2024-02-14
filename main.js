let userInput = document.querySelector(".task-input");
let addButton = document.querySelector(".button-add");
let tabs = document.querySelectorAll(".tab-type div");
let underLine = document.getElementById("tab-underline");
let taskList = [];
let mode = "all";
let filterList = [];

addButton.addEventListener("mousedown", addTask);
userInput.addEventListener("keydown", function (event) {
  if (event.keyCode === 13) {
    addTask(event);
  }
});
for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
  });
}

function addTask() {
  let taskValue = userInput.value;
  if (taskValue === "") return alert("할일을 입력해주세요");
  let task = {
    content: taskValue,
    isComplete: false,
    id: randomIDGenerator(),
  };

  taskList.push(task);
  userInput.value = "";
  render();
}

function render() {
  let result = "";
  list = [];
  if (mode === "all") {
    list = taskList;
  } else {
    // else if(mode=== "ongoing" || mode==="done") 을 결국 else 로 치환할 수 있다.
    list = filterList;
  }

  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete) {
      result += `<div class="task task-done" id="${list[i].id}">
            <span>${list[i].content}</span>
            <div class="button-box">
            <button onclick="toggleDone('${list[i].id}')"><i class="fas fa-undo-alt"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
            </div>
        </div>`;
    } else {
      result += `<div class="task" id="${list[i].id}" >
            <span>${list[i].content}</span>
            <div class="button-box">
            <button onclick="toggleDone('${list[i].id}')"><i class="fa fa-check"></i></button>
            <button onclick="deleteTask('${list[i].id}')"><i class="fa fa-trash"></i></button>
            </div>
        </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = result;
}

function toggleDone(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  filter();
}

function deleteTask(id) {
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id === id) {
      taskList.splice(i, 1);
    }
  }

  filter();
}
function filter(e) {
  if (e) {
    mode = e.target.id;
    underLine.style.width = e.target.offsetWidth + "px";
    underLine.style.left = e.target.offsetLeft + "px";
    underLine.style.top =
      e.target.offsetTop + (e.target.offsetHeight - 4) + "px";
  } // 진행중 상태에서 끝남으로 표시하면 바로 사라지는 부분은 event가 없음 그래서 조건추가

  filterList = [];
  if (mode === "ongoing") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete == false) {
        filterList.push(taskList[i]);
      }
    }
  } else if (mode === "done") {
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete) {
        filterList.push(taskList[i]);
      }
    }
  }
  render();
}

function randomIDGenerator() {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return "_" + Math.random().toString(36).substr(2, 9);
}

document.getElementById("main").innerHTML = "<button id='btn1'>Start</button>";
const btn1 = document.getElementById("btn1");
const main = document.getElementById("main");
var obj;
let questions;
var count = 0,
  index = 0;
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
fetch(
  "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data.results);
    obj = data.results;
  });
function createQuestion(i) {
  main.innerHTML = "";
  const question = document.createElement("h3");
  question.id = "question";
  question.textContent = obj[i].question;
  main.appendChild(question);
  createOptions(i);
}
function createOptions(index) {
  var options = [...obj[index].incorrect_answers];
  options.push(obj[index].correct_answer);
  shuffleArray(options);
  const div = document.createElement("div");
  div.id = "options";
  for (let j = 0; j < 4; j++) {
    const label = document.createElement("label");
    const input = document.createElement("input");
    input.type = "radio";
    input.id = `op${j}`;
    input.className = "ans";
    input.name = "ans";
    const span = document.createElement("span");
    span.id = `ans${j}`;
    span.textContent = options[j];
    label.appendChild(input);
    label.appendChild(span);
    div.appendChild(label);
  }
  main.appendChild(div);
}
function check() {
  const allOptions = document.getElementsByName("ans");
  allOptions.forEach((item, i) => {
    if (item.checked) {
      if (
        document.getElementById(`ans${i}`).innerText ==
        obj[index].correct_answer
      ) {
        count += 1;
      }
    }
  });
}
function NextQuestion() {
  if (index == 9) {
    main.innerHTML = "";
    console.log(count);
    const result = document.createElement("h4");
    console.log(result);
    result.textContent = `Your score is: ${count}/10`;
    console.log(result);
    main.appendChild(result);
  } else {
    check();
    index += 1;
    createQuestion(index);
    createButton();
  }
}
function createButton() {
  const btn = document.createElement("button");
  btn.id = "btn";
  btn.textContent = "Submit";
  main.appendChild(btn);
  btn.addEventListener("click", NextQuestion);
}
function onClick() {
  document.getElementById("btn1").remove();
  createQuestion(index);
  createButton();
}
btn1.addEventListener("click", onClick);

// Load application styles
import 'styles/index.css';

const monthNames = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const $yearNmonthEl = document.querySelector('.year-n-month-box');
const $dayEl = document.querySelector('.day-box');
const $dateEl = document.querySelector('.date-box');
const $tr = document.querySelectorAll('.week');

let today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let day = today.getDay();
let date = today.getDate();

let firstDay;
let prevTarget;

document.querySelector('tbody').addEventListener('click', getDateData);
document.querySelector('.left-btn').addEventListener('click', () => renderCalendar(year, month - 1, day, date));
document.querySelector('.right-btn').addEventListener('click', () => renderCalendar(year, month + 1, day, date));

function getDateData(e) {
  const [year, month, date] = e.target.id.split('-');
  e.target.style.background = "red";
  e.target.style.color = "white";
  if (!e.target.id) return e.target.style.background = "white";
  if (prevTarget === e.target) {
    e.target.style.background = "red";
    e.target.style.color = "white";
    return;
  }
  if (!!prevTarget) {
    prevTarget.style.background = "white";
    prevTarget.style.color = "#000000";
  }
  prevTarget = e.target;
  $dayEl.textContent = e.target.dataset.day;
  $dateEl.textContent = date;

  currentDay = `${year}-${month + 1}-${date}`;
  todosArr = [];
}

function setFirstDay(lastDay, lastDate) {
  if (lastDate === 30) {
    firstDay = !lastDay ? 6 : lastDay - 1;
  } else if (lastDate === 31) {
    firstDay = !lastDay ? 5 : lastDay - 2;
  } else if (lastDate === 28) {
    firstDay = lastDay === 6 ? 0 : lastDay + 1;
  } else {
    firstDay = lastDay;
  }
}

function getEmptyTd() {
  for (let i = 0; i < firstDay; i++) {
    $tr[0].innerHTML += '<td></td>';
  }
}

function getAllDate(year, month, lastDate) {
  let index = 0;
  for (let j = 0; j < lastDate; j++) {
    $tr[index].innerHTML += `
    <td id='${year}-${month + 1}-${j + 1}' data-day='${dayNames[(j + firstDay) % 7]}'>
      ${j + 1}
    </td>
    `
    if ($tr[index].children.length === 7) index++;
  }
}

function getCalendar(year, month, lastDay, lastDate) {
  setFirstDay(lastDay, lastDate);
  getEmptyTd();
  getAllDate(year, month, lastDate);
}

function renderCalendar(yearData, monthData, dayData, dateData) {
  if (monthData === -1) {
    monthData = 11;
    yearData -= 1;
  }
  if (monthData === 12) {
    monthData = 0;
    yearData += 1;
  }

  let lastDay = new Date(yearData, monthData + 1, 0).getDay();
  let lastDate = new Date(yearData, monthData + 1, 0).getDate();

  for (let i = 0; i < 6; i++) {
    $tr[i].innerHTML = '';
  }

  $yearNmonthEl.textContent = `${monthNames[monthData]} ${yearData}`;
  $dayEl.textContent = dayNames[dayData];
  $dateEl.textContent = dateData;

  year = yearData;
  month = monthData;

  getCalendar(yearData, monthData, lastDay, lastDate);
}

renderCalendar(year, month, day, date);
/*
[Calendar]
1. XXXXXX 날짜 및 요일 확인 기능 (작년, 제작년, 내년 등 모두 포함)
2. XXXXXX 날짜 선택 기능
3. XXXXXX 선택된 날짜 표기 기능 (날짜 숫자색 변경)

[Todo]
4. 날짜 선택시, 해당 날짜에 대한 Todo List 보여주기 기능
5. Todo List에 Todo Item 추가 기능 (해당 날짜의 Todo Item으로 추가됨)
6. 다른 날짜 선택시, 새롭게 선택된 날짜에 대한 Todo List 보여주기 기능

------------------------------------------------------------------------------------------------------
1. 아래 이미지의 달력과 기능 및 스타일이 최대한 일치하도록 달력을 만들어주세요. 과거나 미래의 연도 또한 보여줄 수 있어야 합니다.
2. 달력 아래에는 Todo List가 보여야 합니다.
3. Todo List는 날짜별로 관리되기 때문에, 날짜를 클릭할때마다 Todo List는 클릭된 날짜에 해당하는 Todo List를 보여주어야 합니다.
4. Todo List의 기능 및 스타일은 샘플 링크를 참고하여 작업해주세요.

<Todo 정보를 어떤 형식의 구조로 다룰 것인지에 대해 깊게 고민해보세요.>
*/
let currentDay = `${year}-${month + 1}-${date}`;
const todoList = [];
let todosArr = [];
console.log(todosArr);
const $inputEl = document.querySelector('.create-data');
const $todoListEl = document.querySelector('ul');

$inputEl.addEventListener('keydown', (e) => { if (e.keyCode === 13) creatTodo(e) });

function creatTodo({ target: { value } }) {
  todoList.push({ date: currentDay })
  todosArr.push({
    id: todosArr.length,
    status: 'todo',
    title: value
  });

  // todoList.forEach(element => {
  //   if (element.date === currentDay) {

  //   }
  // });






  // todoList.todos = todosArr;








  // const $td = document.querySelectorAll('td');
  // $td.forEach(el => {
  //   if (el.id === currentDay) todoList.push({ date: currentDay });
  // });
  // todoList.forEach(day => {
  //   if (day.date === currentDay) {
  //     day.todos = todosArr
  //   }
  // });

  console.log('todoList', todoList);
  renderCreateTodo(value);
}

// 랜더러
function renderTodoList(todos) {
  // ul 안에 있는 li 지우기. ul dom 이 array(유사배열객체) -> 지우고. length = 0이 좋은 방법인가....?

  todos.map(({ title }) => {
    const liEl = document.createElement('li');
    liEl.textContent = title;
    $todoListEl.appendChild(liEl);
  });
}

function renderCreateTodo(value) {
  const liEl = document.createElement('li');
  liEl.textContent = value;
  $todoListEl.appendChild(liEl);
}

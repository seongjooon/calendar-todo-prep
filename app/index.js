import 'styles/index.css';
const MONTH_NAMES = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const $yearNmonthEl = document.querySelector('.year-n-month-box');
const $dayEl = document.querySelector('.day-box');
const $dateEl = document.querySelector('.date-box');
const $tr = document.querySelectorAll('.week');

const today = new Date();
let year = today.getFullYear();
let month = today.getMonth();
let day = today.getDay();
let date = today.getDate();

let firstDay;
let prevTarget;

document.querySelector('tbody').addEventListener('click', targetDate);
document.querySelector('.left-btn').addEventListener('click', () => renderCalendar(year, month - 1, day, date));
document.querySelector('.right-btn').addEventListener('click', () => renderCalendar(year, month + 1, day, date));

function targetDate(e) {
  const [year, month, date] = e.target.id.split('-');

  changeDateColor(e.target);

  prevTarget = e.target;
  $dayEl.textContent = e.target.dataset.day;
  $dateEl.textContent = date;
  currentDay = `${year}-${month}-${date}`;

  renderTodoList();
}

function changeDateColor(targetedDate) {
  targetedDate.style.background = "red";
  targetedDate.style.color = "white";

  if (!targetedDate.id) return targetedDate.style.background = "white";
  if (prevTarget === targetedDate) {
    targetedDate.style.background = "red";
    targetedDate.style.color = "white";
    return;
  }
  if (!!prevTarget) {
    prevTarget.style.background = "white";
    prevTarget.style.color = "#000000";
  }
}

function setFirstDay(lastDay, lastDate) {
  switch (lastDate) {
    case 30:
      firstDay = !lastDay ? 6 : lastDay - 1;
    case 31:
      firstDay = !lastDay ? 5 : lastDay - 2;
    case 28:
      firstDay = lastDay === 6 ? 0 : lastDay + 1;
    default:
      firstDay = lastDay;
  }
}

function getEmptyDate() {
  for (let i = 0; i < firstDay; i++) {
    $tr[0].innerHTML += '<td></td>';
  }
}

function getAllData(year, month, lastDate) {
  let index = 0;
  for (let j = 0; j < lastDate; j++) {
    $tr[index].innerHTML += `
    <td id='${year}-${month + 1}-${j + 1}' data-day='${DAY_NAMES[(j + firstDay) % 7]}'>
      ${j + 1}
    </td>
    `;
    if ($tr[index].children.length === 7) index++;
  }
}

function getCalendar(year, month, lastDay, lastDate) {
  setFirstDay(lastDay, lastDate);
  getEmptyDate();
  getAllData(year, month, lastDate);
}

function renderCalendar(yearData, monthData, dayData, dateData) {
  switch (monthData) {
    case -1:
      monthData = 11;
      yearData -= 1;
      break;
    case 12:
      monthData = 0;
      yearData += 1;
      break;
  }

  for (let i = 0; i < 6; i++) {
    $tr[i].innerHTML = '';
  }

  let lastDay = new Date(yearData, monthData + 1, 0).getDay();
  let lastDate = new Date(yearData, monthData + 1, 0).getDate();

  $yearNmonthEl.textContent = `${MONTH_NAMES[monthData]} ${yearData}`;
  $dayEl.textContent = DAY_NAMES[dayData];
  $dateEl.textContent = dateData;

  year = yearData;
  month = monthData;

  getCalendar(yearData, monthData, lastDay, lastDate);
}

renderCalendar(year, month, day, date);

let currentDay = `${year}-${month + 1}-${date}`;
let todosArr = [];
const $inputEl = document.querySelector('.create-data');
const $todoListEl = document.querySelector('ul');

$inputEl.addEventListener('keydown', (e) => { if (e.keyCode === 13) creatTodo(e) });

function creatTodo({ target: { value } }) {
  todosArr.push({ day: currentDay, todos: [] });

  todosArr
    .filter(({ day }) => day === currentDay)[0].todos
    .push({
      id: Math.floor(Math.random() * 1000000),
      status: 'todo',
      title: value
    });

  renderTodoList();
}

function renderTodoList() {
  while ($todoListEl.firstChild) {
    $todoListEl.removeChild($todoListEl.firstChild);
  }

  if (!todosArr.filter(({ day }) => day === currentDay)[0]) return;

  todosArr
    .filter(({ day }) => day === currentDay)[0].todos
    .forEach(({ title }) => {
      const liEl = document.createElement('li');
      liEl.textContent = title;
      $todoListEl.appendChild(liEl);
    });
}

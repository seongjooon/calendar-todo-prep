# Calendar Todo Project

날짜 별로 관리할 수 있는 Todo List를 만드는 것이 이번 과제입니다.

상세 내용은 아래 TODO 부분을 참고해주세요.

## Setup

Install dependencies

```sh
$ npm install
```

## Development

```sh
$ npm start
# visit http://localhost:8080
```

- HTML 수정: `index.html`를 수정하시면 됩니다.
- JS 수정: `/app/index.js`를 수정하시면 됩니다.
- CSS 수정: `/assets/styles/index.css`를 수정하시면 됩니다.

## TODO

1. 아래 이미지의 달력과 기능 및 스타일이 최대한 일치하도록 달력을 만들어주세요. 과거나 미래의 연도 또한 보여줄 수 있어야 합니다.

![Calendar](/calendar.gif)

2. 달력 아래에는 Todo List가 보여야 합니다.
3. Todo List는 날짜별로 관리되기 때문에, 날짜를 클릭할때마다 Todo List는 클릭된 날짜에 해당하는 Todo List를 보여주어야 합니다.
4. Todo List의 기능 및 스타일은 [샘플 링크](http://todomvc.com/examples/vue/)를 참고하여 작업해주세요.

**Todo 정보를 어떤 형식의 구조로 다룰 것인지에 대해 깊게 고민해보세요.**

## Pass vs Fail

아래 사항들이 충족되었다면 Pass입니다.

- 날짜 및 요일 확인 기능 (작년, 재작년, 내년 등 모두 포함)
- 날짜 선택 기능
- 선택된 날짜 표기 기능 (날짜 숫자색 변경)
- 날짜 선택시, 해당 날짜에 대한 Todo List 보여주기 기능
- Todo List에 Todo Item 추가 기능 (해당 날짜의 Todo Item으로 추가됨)

# 킹왕짱 투-두리스트!! (React 마이그레이션)

이 프로젝트는 Vanilla JS로 작성된 투두리스트를 React로 마이그레이션한 결과물입니다. 과제 지시사항을 바탕으로 React의 핵심 개념들을 어떻게 적용했는지 아래에 설명해 드립니다.

## 1. Todo CRUD 구현 (상태 및 UI 변경)

Vanilla JS에서는 `prompt()` 함수를 호출하여 브라우저 기본 팝업으로 수정 기능을 처리했지만, React에서는 상태(State) 기반으로 UI를 전환합니다.

- **`editingTodoId` 상태**:
  - `App.jsx`에서 `const [editingTodoId, setEditingTodoId] = useState(null);`로 선언되어 있습니다.
  - 이 값은 수정 중인 Todo의 ID를 저장합니다. `null`이면 아무것도 수정 중이지 않은 상태입니다.
  - 이 상태 값이 변경되면, `TodoList`와 `TodoItem` 컴포넌트가 다시 렌더링되며, `todo.id`와 `editingTodoId`가 일치하는 항목은 인라인 입력창(`<input>`)이 있는 수정 모드 UI로 전환됩니다.

- **컴포넌트 분리**:
  - `TodoItem` 컴포넌트 안에서 `isEditing` 변수(`editingTodoId === todo.id`)를 통해 수정 모드인지 아닌지 판단합니다. 상태 하나만 바뀌면 화면이 자동으로 업데이트되는 React의 선언적 렌더링의 특징을 잘 보여줍니다.

## 2. 상태별 필터링 기능

Vanilla JS에서는 `querySelectorAll`을 사용해 DOM 요소의 `display`나 `class`를 직접 조작했지만, React에서는 데이터(상태)를 기반으로 화면을 다시 그립니다.

- **`currentFilter` 상태**:
  - `App.jsx`에서 `const [currentFilter, setCurrentFilter] = useState('all');`로 관리됩니다. ('all', 'active', 'completed')
  - 사용자가 필터 탭을 클릭하면 `currentFilter` 값이 변경되고, App 컴포넌트가 다시 실행(리렌더링)됩니다.
  - 렌더링 과정에서 현재 날짜에 해당하는 `dateFilteredItems` 배열에 대해 자바스크립트의 `filter()` 메서드를 사용하여 `currentFilter` 조건에 맞는 새로운 배열을 만들고, 이를 `TodoList` 컴포넌트에 넘겨주어 화면에 알맞은 목록만 표시합니다.
  - 탭을 전환한 뒤에 새 항목을 추가해도, `todoItems`가 갱신되면서 다시 필터링을 거쳐 렌더링되기 때문에 필터가 자동으로 유지됩니다.

## 3. Todo 일간 뷰 기능 (날짜 변경)

선택된 날짜와 해당 날짜의 Todo 목록을 연결하기 위해 상태와 데이터 필터링을 함께 활용합니다.

- **날짜 상태 및 저장 형태**:
  - `currentDate` 상태를 `useState`로 관리하여 오늘 날짜 혹은 선택된 날짜를 보관합니다.
  - 각 Todo 아이템 객체 안에는 `date: "YYYY-MM-DD"` 형태의 속성이 포함되어 있습니다. Todo를 추가할 때 현재 `currentDate` 값을 문자열로 변환하여 저장합니다.
- **날짜 변경 시 동작**:
  - 사용자가 `WeekNavigator`나 `MonthModal`을 통해 날짜를 변경하면 `setCurrentDate`가 호출되어 `currentDate` 상태가 바뀝니다.
  - App 컴포넌트가 다시 렌더링될 때, 전체 `todoItems` 중에서 `item.date`가 현재 선택된 `currentDate`와 일치하는 항목만 추려내 화면에 보여주게 됩니다.

## 4. 로컬 스토리지 연동 (`useEffect` 활용)

Vanilla JS에서는 항목을 추가, 수정, 삭제할 때마다 `localStorage.setItem()`을 직접 호출하여 함수마다 중복 코드가 발생했습니다. React에서는 `useEffect` 훅을 사용하여 데이터의 부수 효과(Side Effect)를 한 곳에서 처리합니다.

- **`useEffect`를 통한 자동 저장**:
  ```jsx
  useEffect(() => {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
  }, [todoItems]);
  ```
  - **의존성 배열(`[todoItems]`)**: `useEffect`의 두 번째 인자인 이 배열에 들어있는 값(`todoItems`)이 변경될 때만 내부 코드가 실행됩니다.
  - 즉, 항목이 추가, 수정, 삭제되어 `todoItems` 상태가 바뀔 때마다 자동으로 로컬 스토리지에 최신 JSON 문자열이 저장됩니다.
  - 앱이 처음 렌더링될 때(`useState` 초기화 함수 안에서) 한 번 로컬 스토리지의 값을 읽어와 초기 상태로 설정하기 때문에, 새로고침해도 기존 데이터가 유지됩니다.

---
**💡 React 마이그레이션의 핵심 정리**
React는 "데이터(상태)가 바뀌면 화면은 알아서 바뀐다"는 철학을 가지고 있습니다. 기존 바닐라 JS처럼 "이 버튼을 누르면 저 요소를 찾아 숨겨라"라고 명령하는 방식(명령형)에서 벗어나, "상태에 따라 이 데이터를 보여줘라"라고 선언하는 방식(선언형)으로 코드가 훨씬 깔끔해지고 유지보수가 쉬워집니다.

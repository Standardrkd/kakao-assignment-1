# 킹왕짱 투-두리스트!! (Awesome Todo List)

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=flat-square&logo=vite&logoColor=FFD62E" alt="Vite">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/LocalStorage-Persisted-green?style=flat-square" alt="LocalStorage">
</p>

---

## 🌐 Language / 언어
* [English](#-english-version)
* [한국어](#-한국어-버전)

---

## 🏷️ Repository Tags (Topics)
If you are hosting this repository on GitHub, consider adding the following topics for better discoverability:
`react`, `vite`, `javascript`, `todo-list`, `calendar-view`, `productivity`, `localstorage`, `frontend`

---

## 🇺🇸 English Version

A clean, minimalist, and premium productivity Todo web application built with React.

### ⚡ Tech Stack
- **React (Hooks)** for component-based UI and reactive state management
- **Vite** for blazing fast local development and optimized builds
- **CSS3 (Vanilla CSS)** for custom, modern styling and micro-interactions
- **JavaScript (ES6+)** for application logic

### ✨ Key Features
- **Add Todo (Create)**: Create a new task by typing in the input field and clicking 'Add' or pressing `Enter`.
- **View Todos (Read)**: View all tasks beautifully organized in a card layout. An active counter displays remaining tasks.
- **Edit Todo (Update - Text)**: Click the 'Edit' button to turn the task card into an inline input field, make changes, and save immediately.
- **Complete Todo (Update - Completion)**: Toggle completion by clicking the 'Complete' button. Completed items show a strike-through text and are excluded from the active task count.
- **Delete Todo (Delete)**: Instantly remove tasks from your list with a click of the 'Delete' button.
- **Undo Functionality**: Toast notifications for Edit and Delete actions feature an 'Undo' button to quickly revert your action.
- **Status Filtering**: Filter your tasks smoothly using the *All*, *Active*, and *Completed* tabs.
- **Weekly View & Date Navigation**: Displays the current week's dates (Monday to Sunday) horizontally. Users can slide back and forth between previous or next weeks.
- **Quick Date Navigation Modal**: Click the calendar header to open a selection modal, allowing you to jump straight to any year, month, and day.
- **Task Indicator on Modal**: The date picker modal shows small violet dots (indicators) underneath both **Months** and **Days** that contain registered tasks, making schedule checks seamless.
- **Input Validation**: Prevent empty submissions. Trying to add or update an empty task triggers a neat toast notification at the bottom.
- **Data Persistence (Local Storage)**: All your tasks are stored locally in the browser's storage, maintaining data even after page reloads or browser restarts.

### 🎨 Design Highlights
- **Vibrant Accent Theme**: Uses `#672be0` (a premium, deep violet color palette) as the primary highlight color to present a professional yet energetic look.
- **Stable Layouts**: The application container is perfectly fixed in size to prevent visual jumps when typing or switching tabs.
- **Smooth Interactions**: Equipped with elegant card structures, micro-animations, and hover states. Modal windows implement a frosted-glass blur effect (`backdrop-filter: blur`).
- **Typography**: Built with Google Fonts' Inter typography for maximum legibility and a contemporary digital product aesthetic.

### 🚀 How to Use
1. **Installation**
   - Run `npm install` in the project directory to install all dependencies.
2. **Running the Application**
   - Run `npm run dev` to start the Vite development server.
   - Open `http://localhost:5173` in any modern browser.
3. **Navigating Dates**
   - Select dates from the horizontal weekly view to manage tasks for that day.
   - Click the left/right arrow buttons to shift weeks.
   - Click the center header (YYYY-MM) to go back to today's date.
   - Click the header again when already viewing today to open the date picker modal.
4. **Managing Tasks**
   - Use the text box and press `Enter` to add tasks.
   - Click edit to update. Press `ESC` or click cancel to abort editing.
   - Use the status filter tabs underneath the main input to display tasks matching specific criteria.
   - Take advantage of the Undo button in toast notifications if you accidentally delete or edit a task.

---

## 🇰🇷 한국어 버전

깔끔하고 미니멀하며 프리미엄한 스타일의 생산성 Todo 웹 애플리케이션입니다. **React** 기반으로 작성되었습니다.

### ⚡ 기술 스택
- **React (Hooks)**
- **Vite**
- **CSS3 (Vanilla CSS)**
- **JavaScript (ES6+)**

### ✨ 주요 기능
- **할 일 추가 (Create)**: 텍스트 입력 후 '추가' 버튼 클릭 또는 Enter 키를 통해 할 일을 새로 추가할 수 있습니다.
- **할 일 조회 (Read)**: 입력된 할 일 목록이 화면에 깔끔하게 카드형태로 정렬됩니다. 남은 할 일의 개수를 실시간으로 알려줍니다.
- **할 일 수정 (Update - Text)**: '수정' 버튼 클릭 시 인라인 입력 창으로 전환되며 할 일 내용을 바로 편집하고 저장할 수 있습니다.
- **할 일 완료 (Update - Completion)**: '완료' 버튼 클릭 시 텍스트에 취소선이 생기며 완료된 상태로 표시되며, 남은 할 일 수 카운트에서 제외됩니다.
- **할 일 삭제 (Delete)**: '삭제' 버튼 클릭 시 해당 할 일을 목록에서 즉시 지울 수 있습니다.
- **실행 취소(Undo)**: 할 일 삭제 및 수정 시 화면 하단에 토스트 팝업이 나타나며, '실행 취소' 버튼을 누르면 즉시 이전 상태로 복구됩니다.
- **상태별 필터링**: 전체, 진행 중, 완료 탭을 클릭하여 해당 상태의 Todo만 필터링하여 조회할 수 있습니다.
- **주간 뷰 및 날짜 변경**: 이번 주 월요일부터 일요일까지의 날짜를 가로로 나열하며, 이전 주차 및 다음 주차로 이동할 수 있습니다.
- **월/일 단위 신속 이동 팝업**: 오늘 날짜를 보고 있는 상태에서 달력 헤더를 한 번 더 누르면 모달이 열려 원하는 연도, 월, 일을 선택해 바로 이동할 수 있습니다.
- **할 일 등록 여부 표시**: 날짜 선택 모달창 내부의 '일(Day)' 뿐만 아니라 **'월(Month)' 단위에도 일정이 있으면 보라색 점(Indicator)으로 표시**하여 스케줄을 쉽게 파악할 수 있습니다.
- **입력 유효성 검증**: 입력값이 공백인 채로 추가하려고 하거나 수정하려고 하면, 토스트 메시지 안내가 화면 중앙 하단에 노출됩니다.
- **데이터 영속성 (Local Storage)**: 브라우저 새로고침이나 재접속 시에도 작성한 Todo 데이터가 유지됩니다.

### 🎨 디자인 포인트
- **메인 컬러**: `#672be0` (풍부한 보라색 계열)을 포인트 테마로 설정하여 세련되고 신뢰감 있는 생산성 툴 분위기를 냅니다.
- **크기 변동 방지 (레이아웃 고정)**: 텍스트 길이가 길어지거나 수정 모드로 전환해도 앱 전체의 가로/세로 크기가 흔들리지 않도록 완벽하게 틀이 고정되어 있습니다.
- **디자인 스타일**: 군더더기 없는 카드 레이아웃과 부드러운 호버 효과 및 마이크로 인터랙션을 가미하여 높은 사용성을 가집니다. 모달 팝업에는 흐릿한 유리 질감의 백드롭 필터(`backdrop-filter: blur`)가 적용되어 고급스러운 느낌을 더했습니다.
- **타이포그래피**: Google Fonts의 Inter 폰트를 탑재하여 가독성이 높고 모던한 느낌을 제공합니다.

### 🚀 사용법
1. **프로젝트 실행**
   - 패키지 설치: 터미널에서 `npm install`을 입력합니다.
   - 서버 구동: `npm run dev`를 입력하여 개발 서버를 실행합니다.
   - 브라우저에서 `http://localhost:5173`으로 접속합니다.
2. **날짜 선택 및 이동**
   - 화면 상단의 주간 날짜 그리드에서 원하는 요일을 클릭하여 해당 날짜의 Todo 목록으로 이동합니다.
   - 달력 상단의 좌우 화살표 버튼을 클릭하면 이전 주차 또는 다음 주차로 캘린더가 이동합니다.
   - 달력 상단 중앙의 'YYYY년 MM월' 표시를 클릭하면 오늘 날짜로 즉시 복귀합니다.
   - 이미 오늘 날짜를 조회 중인 상태에서 'YYYY년 무월' 표시를 한 번 더 클릭하면 연/월/일 선택 모달창이 나타납니다.
     - 1단계: 좌우 화살표로 연도를 선택하고, 원하는 월(1월~12월)을 클릭합니다. 할 일이 있는 월에는 보라색 점이 표시됩니다.
     - 2단계: 해당 월의 전체 날짜 그리드 중 원하는 일(1일~말일)을 선택합니다. 할 일이 있는 날짜 아래에도 점이 표시되어 있습니다.
3. **Todo 추가**
   - 입력란에 할 일을 입력하고 우측의 '추가' 버튼을 누르거나 키보드의 Enter 키를 입력합니다.
   - 빈 텍스트를 입력하고 추가 시 화면 하단에 에러 알림 토스트가 발생합니다.
4. **Todo 관리 (수정, 완료, 삭제, 취소)**
   - 목록 내 각 카드 우측의 '완료' 버튼을 누르면 할 일에 취소선이 적용되며 완료 상태로 표시됩니다.
   - '수정' 버튼을 누르면 카드 자체가 입력 필드로 전환됩니다. 내용을 고친 뒤 '저장' 버튼을 누르거나 Enter 키를 입력하면 수정 사항이 반영됩니다.
   - '삭제' 버튼을 누르면 해당 할 일이 목록에서 즉시 지워집니다.
   - 삭제나 수정을 한 직후에 나타나는 토스트 알림에서 '실행 취소' 버튼을 누르면 작업을 되돌릴 수 있습니다.
5. **필터링 활용**
   - 입력 창 아래의 '전체', '진행 중', '완료' 버튼을 통해 현재 날짜의 Todo들을 상태별로 필터링하여 손쉽게 관리할 수 있습니다.

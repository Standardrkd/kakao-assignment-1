# 킹왕짱 투-두리스트!! (Awesome Todo List)

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React">
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=flat-square&logo=vite&logoColor=FFD62E" alt="Vite">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black" alt="JavaScript">
</p>

---

## 🌐 Language / 언어
* [English](#-english-version)
* [한국어](#-한국어-버전)

---

## 🏷️ Repository Tags (Topics)
`react`, `vite`, `javascript`, `todo-list`, `calendar-view`, `productivity`, `localstorage`, `frontend`, `components`

---

## 🇺🇸 English Version

A clean, minimalist, and premium productivity Todo web application built with **React**. 

### ⚡ Tech Stack
- **React (Hooks)** for component-based UI and reactive state management
- **Vite** for blazing fast local development and optimized builds
- **CSS3 (Vanilla CSS)** for custom, modern styling and micro-interactions

### ✨ Key Features
- **Add Todo (Create)**: Create a new task by typing in the input field and clicking 'Add' or pressing `Enter`.
- **View Todos (Read)**: View all tasks beautifully organized in a card layout. 
- **Edit Todo (Update)**: Click the 'Edit' button to turn the task card into an inline input field, make changes, and save immediately.
- **Complete Todo (Complete)**: Toggle completion by clicking the 'Complete' button. Completed items show a strike-through text.
- **Delete Todo (Delete)**: Instantly remove tasks from your list with a click of the 'Delete' button.
- **Undo Functionality**: Toast notifications for Edit and Delete actions feature an 'Undo' button to quickly revert your action.
- **Weekly View & Date Navigation**: Displays the current week's dates horizontally. Navigate past and future weeks smoothly.
- **Month/Day Selection Modal**: Click the calendar header to open a modal. Select the year, month, and day directly.
- **Task Indicators**: Small violet dots appear under both **Months** and **Days** that contain scheduled tasks.
- **Status Filtering**: Filter your tasks smoothly using the *All*, *Active*, and *Completed* tabs.
- **Data Persistence (Local Storage)**: Data is automatically synced to `localStorage` via React `useEffect` hooks.

### 🎨 Design Highlights
- **Vibrant Accent Theme**: Uses `#672be0` as the primary highlight color.
- **Stable Layouts**: The application container is perfectly fixed in size (horizontally and vertically) to prevent visual jumps when typing or switching tabs.
- **Smooth Animations**: Elegant card hover states, slide-in lists, and a frosted-glass blur effect (`backdrop-filter: blur`) for the modal.

### 🚀 How to Use
1. **Installation**
   ```bash
   npm install
   ```
2. **Running the Application**
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

---

## 🇰🇷 한국어 버전

깔끔하고 미니멀하며 프리미엄한 스타일의 생산성 Todo 웹 애플리케이션입니다. **React** 기반으로 작성되었습니다.

### ⚡ 기술 스택
- **React (Hooks)**
- **Vite**
- **CSS3 (Vanilla CSS)**

### ✨ 주요 기능
- **할 일 추가 (Create)**: 텍스트 입력 후 '추가' 버튼 클릭 또는 Enter 키를 통해 할 일을 새로 추가할 수 있습니다.
- **할 일 조회 (Read)**: 입력된 할 일 목록이 화면에 깔끔하게 카드형태로 정렬됩니다.
- **할 일 수정 (Update)**: '수정' 버튼 클릭 시 인라인 입력 창으로 전환되며 할 일 내용을 바로 편집하고 저장할 수 있습니다.
- **할 일 완료 (Complete)**: '완료' 버튼 클릭 시 텍스트에 취소선이 생기며 완료된 상태로 표시됩니다.
- **할 일 삭제 (Delete)**: '삭제' 버튼 클릭 시 해당 할 일을 목록에서 즉시 지울 수 있습니다.
- **실행 취소(Undo)**: 할 일 삭제 및 수정 시 화면 하단에 토스트 팝업이 나타나며, '실행 취소' 버튼을 누르면 즉시 이전 상태로 복구됩니다.
- **주간 뷰 및 날짜 변경**: 가로 스크롤 형태의 주간 캘린더 컴포넌트 제공.
- **월/일 단위 신속 이동 모달**: 연도, 월, 일을 선택할 수 있는 직관적인 팝업을 지원합니다.
- **할 일 등록 여부 표시**: 달력 내 '일(Day)' 뿐만 아니라 **'월(Month)' 단위에도 일정이 있으면 점(Indicator)으로 표시**하여 스케줄 파악이 매우 용이합니다.
- **상태별 필터링**: 전체, 진행 중, 완료 탭을 통한 필터링을 지원합니다.
- **데이터 영속성 (Local Storage)**: 브라우저 새로고침 시에도 `localStorage`를 통해 데이터가 안전하게 유지됩니다.

### 🎨 디자인 포인트
- **메인 컬러**: `#672be0` (풍부한 보라색 계열) 기반의 세련된 UI
- **크기 변동 방지 (레이아웃 고정)**: 텍스트 길이가 길어지거나 수정 모드로 전환해도 앱 전체의 가로/세로 크기가 흔들리지 않도록 완벽하게 틀이 고정되어 있습니다.
- **애니메이션 & 마이크로 인터랙션**: 부드러운 토스트 팝업, 모달 창의 블러 효과(`backdrop-filter`), 아이템 추가 시의 자연스러운 슬라이드 애니메이션 적용.

### 🚀 사용법
1. **패키지 설치**
   해당 폴더 경로의 터미널에서 아래 명령어를 입력합니다.
   ```bash
   npm install
   ```
2. **개발 서버 구동**
   ```bash
   npm run dev
   ```
3. 브라우저에서 `http://localhost:5173` 으로 접속하여 이용합니다.

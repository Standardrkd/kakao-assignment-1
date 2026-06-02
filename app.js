/**
 * 킹왕짱 투-두리스트!! JS
 * 
 * 이 파일은 할 일(Todo) 목록의 CRUD 기능과 로컬 스토리지를 통한 데이터 영속성을 관리합니다.
 * '전체 / 진행 중 / 완료' 상태별 필터링 기능과 더불어,
 * 이번 주 월요일부터 일요일까지 가로로 나열되는 '주간 뷰' 기능을 지원합니다.
 * 추가로 오늘 날짜를 보는 상태에서 달력 타이틀을 클릭 시 '연/월 이동 팝업(모달)'을 노출하는 기능이 구현되어 있습니다.
 * 주요 함수와 변수명은 역할이 명확히 드러나도록 명명되었습니다.
 */

// ==========================================
// 1. 상태 관리 (State Management)
// ==========================================

// 현재 선택된 날짜 (기본값은 오늘)
let currentDate = new Date();

// 할 일 목록 데이터를 저장하는 배열 (로컬 스토리지에서 읽어오거나 빈 배열로 초기화)
let todoItems = JSON.parse(localStorage.getItem('todoItems')) || [];

// 기존 데이터 호환성 보장: date 속성이 없는 기존 데이터에 대해 현재 날짜 키 부여
const initialTodayKey = formatDateToKey(new Date());
todoItems = todoItems.map(item => {
    if (!item.date) {
        return { ...item, date: initialTodayKey };
    }
    return item;
});

// 수정 중인 항목의 ID를 추적하는 변수 (수정 모드 관리용)
let editingTodoId = null;

// 현재 선택된 필터 상태 ('all' | 'active' | 'completed')
let currentFilter = 'all';

// 모달에서 사용할 연도, 월 및 단계 상태 관리
let modalSelectedYear = currentDate.getFullYear();
let modalSelectedMonth = currentDate.getMonth(); // 0 ~ 11
let modalStep = 'month'; // 'month' | 'day'

// ==========================================
// 2. DOM 요소 참조
// ==========================================
const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const pendingCount = document.getElementById('pending-count');
const toastContainer = document.getElementById('toast-container');
const filterBtns = document.querySelectorAll('.filter-btn');

// 주간 네비게이터 관련 DOM
const currentMonthDisplay = document.getElementById('current-month-display');
const prevWeekBtn = document.getElementById('prev-week-btn');
const nextWeekBtn = document.getElementById('next-week-btn');
const weekDaysGrid = document.getElementById('week-days-grid');

// 월 선택 모달 팝업 관련 DOM
const monthModal = document.getElementById('month-modal');
const modalYearDisplay = document.getElementById('modal-year-display');
const prevYearBtn = document.getElementById('prev-year-btn');
const nextYearBtn = document.getElementById('next-year-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const monthSelectorBtns = document.querySelectorAll('.month-selector-btn');
const modalBackBtn = document.getElementById('modal-back-btn');
const modalHeaderSpacer = document.getElementById('modal-header-spacer');
const modalMonthsView = document.getElementById('modal-months-view');
const modalDaysView = document.getElementById('modal-days-view');

// ==========================================
// 3. 유틸리티 함수 (Utility Functions)
// ==========================================

/**
 * Date 객체를 "YYYY-MM-DD" 형태의 문자열 키로 변환합니다.
 * @param {Date} date - 변환할 Date 객체
 * @returns {string} YYYY-MM-DD 형식의 문자열
 */
function formatDateToKey(date) {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

/**
 * 데이터를 로컬 스토리지에 저장하고 UI를 갱신합니다.
 */
function saveAndRender() {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
    renderTodos();
}

/**
 * 사용자에게 안내 메시지(경고/성공 등)를 토스트 형태로 표시합니다.
 * @param {string} message - 표시할 안내 메시지
 * @param {string} type - 토스트 종류 ('error' | 'success')
 */
function showToast(message, type = 'error') {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerText = message;
    
    toastContainer.appendChild(toast);
    
    // 애니메이션이 끝나고 3초 후에 요소를 DOM에서 삭제
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

// ==========================================
// 4. 주간 뷰 핵심 기능 (Week Navigation & Rendering)
// ==========================================

/**
 * 주어진 날짜가 속한 주의 월요일 Date 객체를 계산하여 반환합니다.
 * @param {Date} date - 기준 Date 객체
 * @returns {Date} 해당 주의 월요일 Date 객체
 */
function getMondayOfDate(date) {
    const tempDate = new Date(date);
    const day = tempDate.getDay(); // 0: 일요일, 1: 월요일, ... 6: 토요일
    // 월요일 기준으로 가감해야 할 일 수를 구함 (일요일인 경우 6일을 빼고, 월요일은 0일, 화요일은 1일...)
    const difference = tempDate.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(tempDate.setDate(difference));
}

/**
 * 주간 네비게이터 그리드를 생성하고 각 날짜별 정보(요일, 숫자, Todo 수)를 렌더링합니다.
 */
function renderWeekNavigator() {
    // 1. 상단 타이틀 월 표시 업데이트 (현재 선택된 날짜 기준)
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    currentMonthDisplay.innerText = `${currentYear}년 ${currentMonth}월`;
    
    // 2. 이번 주 월요일 찾기
    const monday = getMondayOfDate(currentDate);
    
    // 3. 그리드 비우기
    weekDaysGrid.innerHTML = '';
    
    const dayNames = ['월', '화', '수', '목', '금', '토', '일'];
    const todayKey = formatDateToKey(new Date());
    const selectedKey = formatDateToKey(currentDate);
    
    // 4. 월요일부터 일요일까지 7일 순회하며 엘리먼트 생성
    for (let i = 0; i < 7; i++) {
        const targetDate = new Date(monday);
        targetDate.setDate(monday.getDate() + i);
        
        const dateKey = formatDateToKey(targetDate);
        const dayNum = targetDate.getDate();
        const dayName = dayNames[i];
        
        // 해당 날짜의 총 할 일 수 계산
        const dayTodoCount = todoItems.filter(item => item.date === dateKey).length;
        
        // 오늘 여부 및 선택 상태 파악
        const isToday = dateKey === todayKey;
        const isSelected = dateKey === selectedKey;
        
        // 날짜 선택용 카드 엘리먼트 생성
        const dayCard = document.createElement('div');
        dayCard.className = `day-card`;
        dayCard.title = `${targetDate.getFullYear()}년 ${targetDate.getMonth() + 1}월 ${dayNum}일`;
        
        // 클릭 이벤트 등록 (날짜 변경 및 리렌더링)
        dayCard.addEventListener('click', () => {
            currentDate = targetDate;
            editingTodoId = null; // 수정 중 상태 해제
            renderTodos();
        });
        
        // 요일 라벨 클래스 설정 (오늘인 경우 요일 색상 강조)
        const dayLabelClass = isToday ? 'day-label today-label' : 'day-label';
        
        // 날짜 숫자 클래스 설정
        let dayNumClass = 'day-number';
        if (isToday) dayNumClass += ' today';
        if (isSelected) dayNumClass += ' selected';
        
        // 개수 배지 클래스 설정 (할 일 개수에 따른 하이라이트)
        let countClass = 'day-todo-count';
        if (dayTodoCount > 0) countClass += ' has-todos';
        if (isSelected) countClass += ' count-selected';
        
        dayCard.innerHTML = `
            <span class="${dayLabelClass}">${dayName}</span>
            <span class="${dayNumClass}">${dayNum}</span>
            <span class="${countClass}">${dayTodoCount}</span>
        `;
        
        weekDaysGrid.appendChild(dayCard);
    }
}

/**
 * 선택된 주차를 오프셋(주 단위)만큼 가감하여 이동합니다.
 * @param {number} weekOffset - 가감할 주 단위 오프셋 (-1 또는 1)
 */
function changeWeek(weekOffset) {
    currentDate.setDate(currentDate.getDate() + (weekOffset * 7));
    editingTodoId = null;
    renderTodos();
}

/**
 * 오늘 날짜로 즉시 복귀합니다.
 */
function resetToToday() {
    currentDate = new Date();
    editingTodoId = null;
    showToast('오늘 날짜로 이동했습니다.', 'success');
    renderTodos();
}

// ==========================================
// 5. 달력 날짜 이동 팝업 핵심 기능 (Month & Day Selector Modal)
// ==========================================

/**
 * 월/일 선택 모달 팝업을 화면에 표시하고 단계를 초기화합니다.
 */
function openMonthModal() {
    modalSelectedYear = currentDate.getFullYear();
    modalSelectedMonth = currentDate.getMonth();
    modalStep = 'month'; // 항상 월 선택 1단계부터 시작
    updateModalView();
    monthModal.classList.remove('hidden');
}

/**
 * 월/일 선택 모달 팝업을 닫습니다.
 */
function closeMonthModal() {
    monthModal.classList.add('hidden');
}

/**
 * 현재 모달 단계(월 선택 또는 일 선택)에 맞춰 모달 UI 및 헤더를 제어합니다.
 */
function updateModalView() {
    if (modalStep === 'month') {
        // 1단계: 월 선택 모드
        modalMonthsView.classList.remove('hidden');
        modalDaysView.classList.add('hidden');
        
        // 헤더 연도 네비게이션 복구
        modalYearDisplay.innerText = `${modalSelectedYear}년`;
        prevYearBtn.classList.remove('hidden');
        nextYearBtn.classList.remove('hidden');
        
        // 뒤로가기 버튼과 우측 스페이서 숨김
        modalBackBtn.classList.add('hidden');
        modalHeaderSpacer.classList.add('hidden');
        
        highlightActiveMonthInModal();
    } else {
        // 2단계: 일 선택 모드
        modalMonthsView.classList.add('hidden');
        modalDaysView.classList.remove('hidden');
        
        // 헤더 텍스트를 연/월 형식으로 업데이트하고 연도 이동 화살표 숨김
        modalYearDisplay.innerText = `${modalSelectedYear}년 ${modalSelectedMonth + 1}월`;
        prevYearBtn.classList.add('hidden');
        nextYearBtn.classList.add('hidden');
        
        // 뒤로가기 버튼과 우측 스페이서 활성화 (연/월 텍스트 좌우에 대칭 배치되어 센터링 유지)
        modalBackBtn.classList.remove('hidden');
        modalHeaderSpacer.classList.remove('hidden');
        
        generateDaysInModal();
    }
}

/**
 * 현재 선택된 월에 해당하는 모달의 월 버튼을 강조 표시합니다.
 */
function highlightActiveMonthInModal() {
    const selectedMonth = currentDate.getMonth();
    const isSelectedYearSame = currentDate.getFullYear() === modalSelectedYear;
    
    monthSelectorBtns.forEach(btn => {
        const btnMonth = parseInt(btn.dataset.month);
        if (btnMonth === selectedMonth && isSelectedYearSame) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

/**
 * 1단계 월 선택 시 호출되며, 월 상태를 저장하고 일 선택 2단계로 뷰를 전환합니다.
 * @param {number} monthIndex - 선택한 월의 인덱스 (0 ~ 11)
 */
function selectMonthFromModal(monthIndex) {
    modalSelectedMonth = monthIndex;
    modalStep = 'day'; // 2단계(일 선택)로 전환
    updateModalView();
}

/**
 * 선택한 년/월에 따라 2단계 일(Day) 선택 그리드 내부 버튼들을 동적 생성합니다.
 */
function generateDaysInModal() {
    modalDaysView.innerHTML = '';
    
    // 선택한 연도/월의 일수 계산 (다음 달 0일의 date값)
    const maxDays = new Date(modalSelectedYear, modalSelectedMonth + 1, 0).getDate();
    
    // 현재 선택된 날짜 및 오늘 날짜 파악용 키
    const todayKey = formatDateToKey(new Date());
    const selectedKey = formatDateToKey(currentDate);
    
    for (let day = 1; day <= maxDays; day++) {
        const targetDate = new Date(modalSelectedYear, modalSelectedMonth, day);
        const dateKey = formatDateToKey(targetDate);
        
        // 해당 날짜에 등록된 할 일 개수 조회
        const dayTodoCount = todoItems.filter(item => item.date === dateKey).length;
        
        const dayBtn = document.createElement('button');
        dayBtn.className = 'day-selector-btn';
        
        // 오늘 날짜 및 선택 날짜 상태 하이라이트
        if (dateKey === todayKey) dayBtn.classList.add('today');
        if (dateKey === selectedKey) dayBtn.classList.add('active');
        
        // 날짜 숫자와 함께 할 일이 등록된 날짜면 하단에 점 표시기 추가
        dayBtn.innerHTML = `
            <span class="day-num-text">${day}</span>
            ${dayTodoCount > 0 ? '<span class="day-dot-indicator">•</span>' : ''}
        `;
        
        // 클릭 시 해당 날짜로 최종 이동 처리 및 모달 닫기
        dayBtn.addEventListener('click', () => {
            currentDate = targetDate;
            editingTodoId = null;
            closeMonthModal();
            renderTodos();
            showToast(`${modalSelectedYear}년 ${modalSelectedMonth + 1}월 ${day}일로 이동했습니다.`, 'success');
        });
        
        modalDaysView.appendChild(dayBtn);
    }
}

// ==========================================
// 6. 할 일 CRUD 핵심 기능
// ==========================================

/**
 * 새로운 할 일을 생성(Create)합니다.
 */
function createTodo() {
    const text = todoInput.value.trim();
    
    // 입력값 검증
    if (!text) {
        showToast('할 일을 입력해 주세요!', 'error');
        todoInput.focus();
        return;
    }
    
    // 새 할 일 객체 생성 (선택된 주간 뷰의 날짜 정보 포함)
    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        date: formatDateToKey(currentDate)
    };
    
    todoItems.unshift(newTodo);
    todoInput.value = '';
    
    showToast('할 일이 추가되었습니다.', 'success');
    saveAndRender();
}

/**
 * 할 일의 완료 여부를 토글(Update - Completion)합니다.
 */
function toggleTodoComplete(id) {
    todoItems = todoItems.map(item => {
        if (item.id === id) {
            const nextStatus = !item.completed;
            showToast(nextStatus ? '할 일을 완료했습니다.' : '할 일 완료를 취소했습니다.', 'success');
            return { ...item, completed: nextStatus };
        }
        return item;
    });
    saveAndRender();
}

/**
 * 할 일을 삭제(Delete)합니다.
 */
function deleteTodo(id) {
    todoItems = todoItems.filter(item => item.id !== id);
    showToast('할 일이 삭제되었습니다.', 'success');
    saveAndRender();
}

/**
 * 특정 할 일을 수정 모드로 전환합니다.
 */
function enterEditMode(id) {
    editingTodoId = id;
    renderTodos();
}

/**
 * 수정 모드를 취소합니다.
 */
function cancelEditMode() {
    editingTodoId = null;
    renderTodos();
}

/**
 * 수정된 내용을 저장(Update - Text)합니다.
 */
function saveTodoEdit(id, newText) {
    const trimmedText = newText.trim();
    
    if (!trimmedText) {
        showToast('내용은 비워둘 수 없습니다.', 'error');
        return;
    }
    
    todoItems = todoItems.map(item => {
        if (item.id === id) {
            return { ...item, text: trimmedText };
        }
        return item;
    });
    
    editingTodoId = null;
    showToast('수정이 완료되었습니다.', 'success');
    saveAndRender();
}

// ==========================================
// 7. 렌더링 및 필터링 함수 (Render HTML with Filters, Date & Week Navigator)
// ==========================================

/**
 * 현재 선택된 날짜와 필터 상태에 맞춰 화면에 렌더링(Read)합니다.
 */
function renderTodos() {
    // 1. 주간 네비게이터를 먼저 리렌더링하여 날짜 리스트 및 Todo 개수를 갱신합니다.
    renderWeekNavigator();

    // 2. 필터 버튼 활성화 상태를 동기화합니다.
    filterBtns.forEach(btn => {
        if (btn.dataset.filter === currentFilter) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // 3. 기존 목록 리스트를 비웁니다.
    todoList.innerHTML = '';
    
    // 4. 선택된 날짜("YYYY-MM-DD")에 해당하는 Todo 목록을 1차 필터링합니다.
    const selectedDateKey = formatDateToKey(currentDate);
    const dateFilteredItems = todoItems.filter(item => item.date === selectedDateKey);

    // 5. 남은 할 일 수 개수를 동적 집계합니다 (선택된 날짜 기준)
    const pendingTodos = dateFilteredItems.filter(item => !item.completed);
    pendingCount.innerText = pendingTodos.length;
    
    // 6. 상태 필터(전체/진행 중/완료)를 2차로 적용합니다.
    let finalFilteredItems = dateFilteredItems;
    if (currentFilter === 'active') {
        finalFilteredItems = dateFilteredItems.filter(item => !item.completed);
    } else if (currentFilter === 'completed') {
        finalFilteredItems = dateFilteredItems.filter(item => item.completed);
    }
    
    // 7. 필터링된 결과가 없을 때의 날짜별 안내 메시지 출력
    if (finalFilteredItems.length === 0) {
        let message = '이 날엔 등록된 할 일이 없습니다. 새로운 할 일을 추가해 보세요!';
        if (currentFilter === 'active') {
            message = '진행 중인 할 일이 없습니다. 홀가분한 하루네요!';
        } else if (currentFilter === 'completed') {
            message = '완료된 할 일이 없습니다. 차근차근 시작해 볼까요?';
        }
        
        todoList.innerHTML = `
            <li class="empty-list" style="text-align: center; color: var(--text-muted); padding: 30px 0; font-size: 0.95rem;">
                ${message}
            </li>
        `;
        return;
    }
    
    // 8. 최종 필터링된 목록을 화면에 동적으로 생성합니다.
    finalFilteredItems.forEach(item => {
        const todoLi = document.createElement('li');
        todoLi.className = `todo-item ${item.completed ? 'completed' : ''}`;
        
        // 수정 모드 마크업 처리
        if (editingTodoId === item.id) {
            todoLi.innerHTML = `
                <input 
                    type="text" 
                    class="todo-edit-input" 
                    id="edit-input-${item.id}" 
                    value="${escapeHtml(item.text)}"
                >
                <div class="btn-group">
                    <button class="btn btn-save" onclick="handleSaveClick(${item.id})">저장</button>
                    <button class="btn btn-cancel" onclick="cancelEditMode()">취소</button>
                </div>
            `;
            
            // 렌더링 후 포커스 및 엔터/ESC 이벤트 리스너 할당
            setTimeout(() => {
                const editInput = document.getElementById(`edit-input-${item.id}`);
                if (editInput) {
                    editInput.focus();
                    const len = editInput.value.length;
                    editInput.setSelectionRange(len, len);
                    
                    editInput.addEventListener('keydown', (e) => {
                        if (e.key === 'Enter') {
                            handleSaveClick(item.id);
                        } else if (e.key === 'Escape') {
                            cancelEditMode();
                        }
                    });
                }
            }, 0);
            
        } else {
            // 일반 읽기 모드 마크업 처리
            todoLi.innerHTML = `
                <span class="todo-content">${escapeHtml(item.text)}</span>
                <div class="btn-group">
                    <button class="btn btn-complete" onclick="toggleTodoComplete(${item.id})">
                        ${item.completed ? '취소' : '완료'}
                    </button>
                    <button class="btn btn-edit" onclick="enterEditMode(${item.id})">수정</button>
                    <button class="btn btn-delete" onclick="deleteTodo(${item.id})">삭제</button>
                </div>
            `;
        }
        
        todoList.appendChild(todoLi);
    });
}

/**
 * HTML 특수 문자를 이스케이프하여 XSS 공격을 방지합니다.
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function(m) { return map[m]; });
}

/**
 * 저장 버튼 클릭 또는 엔터 키 입력 시 수정을 처리하는 헬퍼 함수
 */
function handleSaveClick(id) {
    const editInput = document.getElementById(`edit-input-${id}`);
    if (editInput) {
        saveTodoEdit(id, editInput.value);
    }
}

// ==========================================
// 8. 이벤트 리스너 등록 & 초기화
// ==========================================

// 폼 서브밋 이벤트 리스너 등록
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    createTodo();
});

// 필터 탭 클릭 이벤트 리스너 등록
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// 주간 네비게이터 주차 이동 버튼 리스너 등록
prevWeekBtn.addEventListener('click', () => changeWeek(-1));
nextWeekBtn.addEventListener('click', () => changeWeek(1));

// 달력 타이틀 클릭 핸들러 (오늘이 아니면 오늘로 귀환, 오늘인 상태에서 클릭 시 연/월 선택 모달 팝업 노출)
currentMonthDisplay.addEventListener('click', () => {
    const todayKey = formatDateToKey(new Date());
    const selectedKey = formatDateToKey(currentDate);
    
    if (todayKey === selectedKey) {
        openMonthModal(); // 오늘인 상태에서 클릭 시 팝업 노출
    } else {
        resetToToday();   // 오늘이 아니면 오늘로 복귀
    }
});

// 모달 팝업의 연도 네비게이션 이벤트 핸들러 (월 선택 상태일 때만 동작)
prevYearBtn.addEventListener('click', () => {
    if (modalStep === 'month') {
        modalSelectedYear--;
        updateModalView();
    }
});
nextYearBtn.addEventListener('click', () => {
    if (modalStep === 'month') {
        modalSelectedYear++;
        updateModalView();
    }
});

// 모달 뒤로가기 버튼 핸들러 (일 선택 단계 -> 월 선택 단계)
modalBackBtn.addEventListener('click', () => {
    modalStep = 'month';
    updateModalView();
});

// 모달 닫기 버튼 핸들러
closeModalBtn.addEventListener('click', closeMonthModal);

// 모달 바깥 백드롭 영역 클릭 시 닫기 처리
monthModal.addEventListener('click', (e) => {
    if (e.target === monthModal) {
        closeMonthModal();
    }
});

// 모달의 개별 월 버튼 클릭 이벤트 바인딩 (클릭 시 일 선택 단계로 전환됨)
monthSelectorBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        selectMonthFromModal(parseInt(btn.dataset.month));
    });
});

// 초기화 시 기존 할 일 로드하여 화면에 표시
document.addEventListener('DOMContentLoaded', () => {
    renderTodos();
});

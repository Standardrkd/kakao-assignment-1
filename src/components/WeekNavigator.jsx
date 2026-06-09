import { getMondayOfDate, formatDateToKey } from '../utils';

export default function WeekNavigator({ currentDate, onChangeDate, onOpenModal, showToast, todos }) {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const monday = getMondayOfDate(currentDate);
  const dayNames = ['월', '화', '수', '목', '금', '토', '일'];
  const todayKey = formatDateToKey(new Date());
  const selectedKey = formatDateToKey(currentDate);

  const changeWeek = (offset) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (offset * 7));
    onChangeDate(newDate);
  };

  const handleTitleClick = () => {
    if (todayKey === selectedKey) {
      onOpenModal();
    } else {
      onChangeDate(new Date());
      showToast('오늘 날짜로 이동했습니다.', 'success');
    }
  };

  return (
    <div className="week-navigator">
      <div className="week-header">
        <button className="nav-btn-arrow" onClick={() => changeWeek(-1)} title="이전 주">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <h2 
          className="month-display" 
          onClick={handleTitleClick}
          title="오늘 날짜로 이동 / 오늘 날짜인 경우 클릭하여 월 이동"
        >
          {currentYear}년 {currentMonth}월
        </h2>
        <button className="nav-btn-arrow" onClick={() => changeWeek(1)} title="다음 주">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>
      
      <div className="week-days-grid">
        {Array.from({ length: 7 }).map((_, i) => {
          const targetDate = new Date(monday);
          targetDate.setDate(monday.getDate() + i);
          
          const dateKey = formatDateToKey(targetDate);
          const dayNum = targetDate.getDate();
          const dayName = dayNames[i];
          
          const dayTodoCount = todos.filter(item => item.date === dateKey).length;
          const isToday = dateKey === todayKey;
          const isSelected = dateKey === selectedKey;
          
          return (
            <div 
              key={dateKey} 
              className="day-card" 
              title={`${targetDate.getFullYear()}년 ${targetDate.getMonth() + 1}월 ${dayNum}일`}
              onClick={() => onChangeDate(targetDate)}
            >
              <span className={`day-label ${isToday ? 'today-label' : ''}`}>{dayName}</span>
              <span className={`day-number ${isToday ? 'today' : ''} ${isSelected ? 'selected' : ''}`}>{dayNum}</span>
              <span className={`day-todo-count ${dayTodoCount > 0 ? 'has-todos' : ''} ${isSelected ? 'count-selected' : ''}`}>{dayTodoCount}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { formatDateToKey } from '../utils';

export default function MonthModal({ isOpen, onClose, currentDate, onSelectDate, showToast, todoItems = [] }) {
  const [modalYear, setModalYear] = useState(currentDate.getFullYear());
  const [modalMonth, setModalMonth] = useState(currentDate.getMonth());
  const [modalStep, setModalStep] = useState('month');

  useEffect(() => {
    if (isOpen) {
      setModalYear(currentDate.getFullYear());
      setModalMonth(currentDate.getMonth());
      setModalStep('month');
    }
  }, [isOpen, currentDate]);

  if (!isOpen) return null;

  const handleMonthSelect = (monthIndex) => {
    setModalMonth(monthIndex);
    setModalStep('day');
  };

  const handleDaySelect = (day) => {
    const targetDate = new Date(modalYear, modalMonth, day);
    onSelectDate(targetDate);
    showToast(`${modalYear}년 ${modalMonth + 1}월 ${day}일로 이동했습니다.`, 'success');
    onClose();
  };

  const todayKey = formatDateToKey(new Date());
  const selectedKey = formatDateToKey(currentDate);

  // Generate days
  const maxDays = new Date(modalYear, modalMonth + 1, 0).getDate();
  const days = Array.from({ length: maxDays }, (_, i) => i + 1);

  const hasTodosInMonth = (monthIndex) => {
    const prefix = `${modalYear}-${String(monthIndex + 1).padStart(2, '0')}`;
    return todoItems.some(item => item.date.startsWith(prefix));
  };

  return (
    <div className="modal-backdrop" onClick={(e) => { if (e.target.className === 'modal-backdrop') onClose(); }}>
      <div className="modal-card">
        <div className="modal-header">
          <button 
            className={`nav-btn-arrow ${modalStep === 'month' ? 'hidden' : ''}`} 
            onClick={() => setModalStep('month')}
            title="이전 단계로 돌아가기"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
          </button>
          
          <div className="modal-title-wrapper">
            <button 
              className={`nav-btn-arrow ${modalStep === 'day' ? 'hidden' : ''}`} 
              onClick={() => setModalYear(y => y - 1)}
              title="이전 해"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
            <span className="year-display">
              {modalStep === 'month' ? `${modalYear}년` : `${modalYear}년 ${modalMonth + 1}월`}
            </span>
            <button 
              className={`nav-btn-arrow ${modalStep === 'day' ? 'hidden' : ''}`} 
              onClick={() => setModalYear(y => y + 1)}
              title="다음 해"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          </div>
          
          <div style={{ width: '32px' }} className={`header-spacer ${modalStep === 'month' ? 'hidden' : ''}`}></div>
        </div>
        
        <div className="modal-body">
          {modalStep === 'month' && (
            <div className="months-grid">
              {Array.from({ length: 12 }, (_, i) => {
                const hasTodos = hasTodosInMonth(i);
                return (
                  <button 
                    key={i}
                    className={`month-selector-btn ${i === currentDate.getMonth() && modalYear === currentDate.getFullYear() ? 'active' : ''}`}
                    onClick={() => handleMonthSelect(i)}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <span>{i + 1}월</span>
                    {hasTodos && <span className="day-dot-indicator" style={{ display: 'block', marginTop: '2px' }}>•</span>}
                  </button>
                );
              })}
            </div>
          )}
          
          {modalStep === 'day' && (
            <div className="days-grid">
              {days.map(day => {
                const targetDate = new Date(modalYear, modalMonth, day);
                const dateKey = formatDateToKey(targetDate);
                const isToday = dateKey === todayKey;
                const isSelected = dateKey === selectedKey;
                const dayHasTodos = todoItems.some(item => item.date === dateKey);
                
                return (
                  <button 
                    key={day}
                    className={`day-selector-btn ${isToday ? 'today' : ''} ${isSelected ? 'active' : ''}`}
                    onClick={() => handleDaySelect(day)}
                  >
                    <span className="day-num-text">{day}</span>
                    {dayHasTodos && <span className="day-dot-indicator">•</span>}
                  </button>
                );
              })}
            </div>
          )}
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-cancel" onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}

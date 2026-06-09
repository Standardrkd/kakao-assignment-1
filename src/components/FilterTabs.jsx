export default function FilterTabs({ currentFilter, onChangeFilter }) {
  return (
    <section className="filter-section">
      <div className="filter-group">
        <button 
          className={`filter-btn ${currentFilter === 'all' ? 'active' : ''}`} 
          onClick={() => onChangeFilter('all')}
        >
          전체
        </button>
        <button 
          className={`filter-btn ${currentFilter === 'active' ? 'active' : ''}`} 
          onClick={() => onChangeFilter('active')}
        >
          진행 중
        </button>
        <button 
          className={`filter-btn ${currentFilter === 'completed' ? 'active' : ''}`} 
          onClick={() => onChangeFilter('completed')}
        >
          완료
        </button>
      </div>
    </section>
  );
}

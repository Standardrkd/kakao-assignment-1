import TodoItem from './TodoItem';

export default function TodoList({ 
  todos, 
  currentFilter, 
  onToggle, 
  onDelete, 
  onEdit, 
  editingTodoId, 
  onStartEdit, 
  onCancelEdit 
}) {
  const pendingCount = todos.filter(t => !t.completed).length;

  let filteredTodos = todos;
  if (currentFilter === 'active') {
    filteredTodos = todos.filter(t => !t.completed);
  } else if (currentFilter === 'completed') {
    filteredTodos = todos.filter(t => t.completed);
  }

  let emptyMessage = (
    <>이 날엔 등록된 할 일이 없습니다.<br />새로운 할 일을 추가해 보세요!</>
  );
  if (currentFilter === 'active') {
    emptyMessage = (
      <>진행 중인 할 일이 없습니다.<br />홀가분한 하루네요!</>
    );
  } else if (currentFilter === 'completed') {
    emptyMessage = (
      <>완료된 할 일이 없습니다.<br />차근차근 시작해 볼까요?</>
    );
  }

  return (
    <section className="list-section">
      <div className="list-header">
        <span className="task-count">남은 할 일: <strong>{pendingCount}</strong>개</span>
      </div>
      <ul className="todo-list">
        {filteredTodos.length === 0 ? (
          <li className="empty-list" style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '40px 0', fontSize: '0.95rem', lineHeight: '1.6' }}>
            {emptyMessage}
          </li>
        ) : (
          filteredTodos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onToggle={onToggle}
              onDelete={onDelete}
              onEdit={onEdit}
              editingTodoId={editingTodoId}
              onStartEdit={onStartEdit}
              onCancelEdit={onCancelEdit}
            />
          ))
        )}
      </ul>
    </section>
  );
}

import { useState, useRef, useEffect } from 'react';

export default function TodoItem({ todo, onToggle, onDelete, onEdit, editingTodoId, onStartEdit, onCancelEdit }) {
  const isEditing = editingTodoId === todo.id;
  const [editText, setEditText] = useState(todo.text);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      const len = inputRef.current.value.length;
      inputRef.current.setSelectionRange(len, len);
    } else if (!isEditing) {
      setEditText(todo.text); // reset if canceled
    }
  }, [isEditing, todo.text]);

  const handleSave = () => {
    onEdit(todo.id, editText);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSave();
    } else if (e.key === 'Escape') {
      onCancelEdit();
    }
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <>
          <input 
            type="text" 
            className="todo-edit-input" 
            style={{ padding: '2px 8px', height: '28px', minWidth: 0 }}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onKeyDown={handleKeyDown}
            ref={inputRef}
          />
          <div className="btn-group">
            <button className="btn btn-save" onClick={handleSave}>저장</button>
            <button className="btn btn-cancel" onClick={onCancelEdit}>취소</button>
          </div>
        </>
      ) : (
        <>
          <span className="todo-content">{todo.text}</span>
          <div className="btn-group">
            <button className="btn btn-complete" onClick={() => onToggle(todo.id)}>
              {todo.completed ? '취소' : '완료'}
            </button>
            <button className="btn btn-edit" onClick={() => onStartEdit(todo.id)}>수정</button>
            <button className="btn btn-delete" onClick={() => onDelete(todo.id)}>삭제</button>
          </div>
        </>
      )}
    </li>
  );
}

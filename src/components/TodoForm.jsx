import { useState } from 'react';

export default function TodoForm({ onAdd }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(text);
    if (text.trim()) {
      setText('');
    }
  };

  return (
    <section className="input-section">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input 
            type="text" 
            id="todo-input" 
            placeholder="새로운 할 일을 입력하세요..." 
            autoComplete="off"
            maxLength="100"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <button type="submit" id="add-btn">
            <span>추가</span>
          </button>
        </div>
      </form>
    </section>
  );
}

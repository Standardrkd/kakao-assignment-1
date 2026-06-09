import { useState, useEffect } from 'react';
import WeekNavigator from './components/WeekNavigator';
import MonthModal from './components/MonthModal';
import TodoForm from './components/TodoForm';
import FilterTabs from './components/FilterTabs';
import TodoList from './components/TodoList';
import Toast from './components/Toast';
import { formatDateToKey } from './utils';

function App() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Initialize todos from localStorage
  const [todoItems, setTodoItems] = useState(() => {
    const saved = localStorage.getItem('todoItems');
    let items = saved ? JSON.parse(saved) : [];
    
    // Compatibility: add date to old items
    const initialTodayKey = formatDateToKey(new Date());
    return items.map(item => ({
      ...item,
      date: item.date || initialTodayKey
    }));
  });

  const [editingTodoId, setEditingTodoId] = useState(null);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Auto-save to localStorage whenever todoItems change
  useEffect(() => {
    localStorage.setItem('todoItems', JSON.stringify(todoItems));
  }, [todoItems]);

  const showToast = (message, type = 'error', hasUndo = false, onUndo = null) => {
    setToast({ id: Date.now(), message, type, hasUndo, onUndo });
  };

  const handleAddTodo = (text) => {
    if (!text.trim()) {
      showToast('할 일을 입력해 주세요!', 'error');
      return;
    }
    
    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      date: formatDateToKey(currentDate)
    };
    
    setTodoItems(prev => [newTodo, ...prev]);
    showToast('할 일이 추가되었습니다.', 'success');
  };

  const handleToggleTodo = (id) => {
    setTodoItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = !item.completed;
        showToast(nextStatus ? '할 일을 완료했습니다.' : '할 일 완료를 취소했습니다.', 'success');
        return { ...item, completed: nextStatus };
      }
      return item;
    }));
  };

  const handleDeleteTodo = (id) => {
    const itemToDelete = todoItems.find(t => t.id === id);
    const index = todoItems.findIndex(t => t.id === id);
    
    if (itemToDelete) {
      setTodoItems(prev => prev.filter(t => t.id !== id));
      showToast('할 일이 삭제되었습니다.', 'success', true, () => {
        setTodoItems(prev => {
          const newItems = [...prev];
          newItems.splice(index, 0, itemToDelete);
          return newItems;
        });
        showToast('삭제가 취소되었습니다.', 'success');
      });
    }
  };

  const handleEditTodo = (id, newText) => {
    const trimmedText = newText.trim();
    if (!trimmedText) {
      showToast('내용은 비워둘 수 없습니다.', 'error');
      return;
    }

    const originalItem = todoItems.find(item => item.id === id);
    if (originalItem && originalItem.text !== trimmedText) {
      setTodoItems(prev => prev.map(item => 
        item.id === id ? { ...item, text: trimmedText } : item
      ));
      
      showToast('수정이 완료되었습니다.', 'success', true, () => {
        setTodoItems(prev => prev.map(item => 
          item.id === id ? { ...item, text: originalItem.text } : item
        ));
        showToast('수정이 취소되었습니다.', 'success');
      });
    }
    
    setEditingTodoId(null);
  };

  const handleDateChange = (newDate) => {
    setCurrentDate(newDate);
    setEditingTodoId(null);
  };

  // Filter items by current date
  const selectedDateKey = formatDateToKey(currentDate);
  const dateFilteredItems = todoItems.filter(item => item.date === selectedDateKey);

  return (
    <>
      <div className="app-container">
        <header className="app-header">
          <h1 className="app-title">킹왕짱 투-두리스트!!</h1>
          <WeekNavigator 
            currentDate={currentDate} 
            onChangeDate={handleDateChange}
            onOpenModal={() => setIsModalOpen(true)}
            showToast={showToast}
            todos={todoItems}
          />
        </header>

        <TodoForm onAdd={handleAddTodo} />
        
        <FilterTabs 
          currentFilter={currentFilter} 
          onChangeFilter={setCurrentFilter} 
        />
        
        <TodoList 
          todos={dateFilteredItems}
          currentFilter={currentFilter}
          onToggle={handleToggleTodo}
          onDelete={handleDeleteTodo}
          onEdit={handleEditTodo}
          editingTodoId={editingTodoId}
          onStartEdit={setEditingTodoId}
          onCancelEdit={() => setEditingTodoId(null)}
        />
      </div>

      <MonthModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        currentDate={currentDate}
        onSelectDate={handleDateChange}
        showToast={showToast}
        todoItems={todoItems}
      />

      <Toast 
        toast={toast} 
        onClear={() => setToast(null)} 
      />
    </>
  );
}

export default App;

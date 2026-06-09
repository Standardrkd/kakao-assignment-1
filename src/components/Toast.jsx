import { useEffect } from 'react';

export default function Toast({ toast, onClear }) {
  useEffect(() => {
    if (toast) {
      const timeoutDuration = toast.hasUndo ? 5000 : 3000;
      const timer = setTimeout(() => {
        onClear();
      }, timeoutDuration);
      return () => clearTimeout(timer);
    }
  }, [toast, onClear]);

  if (!toast) return null;

  return (
    <div className="toast-container">
      <div key={toast.id} className={`toast ${toast.type} ${toast.hasUndo ? 'has-undo' : ''}`}>
        <span>{toast.message}</span>
        {toast.hasUndo && (
          <button className="toast-undo-btn" onClick={() => {
            toast.onUndo();
            onClear();
          }}>
            실행 취소
          </button>
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';

interface BudgetItem {
  category: string;
  spent: number;
  limit: number;
  color: string;
}

interface Props {
  items: BudgetItem[];
  onChange: (items: BudgetItem[]) => void;
}

const BudgetTracker = ({ items, onChange }: Props) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editLimit, setEditLimit] = useState('');

  const startEdit = (i: number) => {
    setEditingIndex(i);
    setEditLimit(String(items[i].limit));
  };

  const saveEdit = (i: number) => {
    const updated = items.map((item, idx) =>
      idx === i ? { ...item, limit: Math.max(1, parseInt(editLimit) || item.limit) } : item
    );
    onChange(updated);
    setEditingIndex(null);
  };

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-gray-800 mb-1">Budget Tracker</h3>
      <p className="text-xs text-gray-400 mb-4">Click limit to edit</p>
      <div className="flex flex-col gap-4">
        {items.map((item, i) => {
          const pct = Math.min(Math.round((item.spent / item.limit) * 100), 100);
          const isOver = pct >= 90;
          return (
            <div key={item.category}>
              <div className="flex justify-between text-xs mb-1.5 items-center">
                <span className="text-gray-500">{item.category}</span>
                <div className="flex items-center gap-1">
                  <span className={`font-medium ${isOver ? 'text-red-500' : 'text-gray-700'}`}>
                    ${item.spent.toLocaleString()} /
                  </span>
                  {editingIndex === i ? (
                    <input
                      autoFocus
                      type="number"
                      value={editLimit}
                      onChange={e => setEditLimit(e.target.value)}
                      onBlur={() => saveEdit(i)}
                      onKeyDown={e => e.key === 'Enter' && saveEdit(i)}
                      className="w-16 border border-gray-300 rounded px-1 py-0.5 text-xs text-right focus:outline-none focus:border-blue-400"
                    />
                  ) : (
                    <button
                      onClick={() => startEdit(i)}
                      className="font-medium text-gray-700 underline decoration-dashed underline-offset-2 hover:text-blue-500 transition-colors"
                    >${item.limit.toLocaleString()}</button>
                  )}
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-1.5">
                <div
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: isOver ? '#ef4444' : item.color }}
                />
              </div>
              <div className="text-right text-xs text-gray-400 mt-0.5">{pct}%</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BudgetTracker;
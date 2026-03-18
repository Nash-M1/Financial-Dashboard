import { useState, useEffect } from 'react';
import type { Transaction } from '../types';

interface Props {
  onAdd: (tx: Transaction) => void;
  onClose: () => void;
  editTx?: Transaction | null;
}

const ICONS: Record<string, string> = {
  Income: '💼', Housing: '🏠', Food: '🛒', Transport: '⛽',
  Subscriptions: '📺', Health: '🏋️', Utilities: '⚡', Entertainment: '🎮', Other: '💳',
};

const EXPENSE_CATEGORIES = ['Food', 'Housing', 'Transport', 'Subscriptions', 'Health', 'Utilities', 'Entertainment', 'Other'];
const INCOME_CATEGORIES = ['Income', 'Other'];

const AddTransactionModal = ({ onAdd, onClose, editTx }: Props) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [type, setType] = useState<'income' | 'expense'>('expense');
  const [date, setDate] = useState('Mar 18');

  useEffect(() => {
    if (editTx) {
      setName(editTx.name);
      setAmount(String(editTx.amount));
      setCategory(editTx.category);
      setType(editTx.type);
      setDate(editTx.date);
    }
  }, [editTx]);

  const handleTypeChange = (t: 'income' | 'expense') => {
    setType(t);
    setCategory(t === 'income' ? 'Income' : 'Food');
  };

  const handleSubmit = () => {
    if (!name || !amount) return;
    onAdd({
      id: editTx ? editTx.id : Date.now(),
      name,
      amount: parseFloat(amount),
      category,
      type,
      date,
      icon: ICONS[category] || '💳',
    });
    onClose();
  };

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES;
  const isEditing = !!editTx;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-base font-semibold text-gray-900">{isEditing ? 'Edit Transaction' : 'Add Transaction'}</h2>
          <button onClick={onClose} className="w-7 h-7 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 text-lg leading-none transition-colors">×</button>
        </div>

        <div className="flex gap-2 mb-4 p-1 bg-gray-100 rounded-xl">
          {(['expense', 'income'] as const).map((t) => (
            <button
              key={t}
              onClick={() => handleTypeChange(t)}
              className={`flex-1 py-1.5 rounded-lg text-sm font-medium capitalize transition-all ${
                type === t ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
              }`}
            >{t}</button>
          ))}
        </div>

        <div className="flex flex-col gap-3">
          <div>
            <label className="text-xs text-gray-500 mb-1 block font-medium">Name</label>
            <input
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
              placeholder="e.g. Grocery run"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block font-medium">Amount ($)</label>
            <input
              type="number"
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
              placeholder="0.00"
              value={amount}
              onChange={e => setAmount(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block font-medium">Category</label>
            <select
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 bg-white transition-colors"
              value={category}
              onChange={e => setCategory(e.target.value)}
            >
              {categories.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-xs text-gray-500 mb-1 block font-medium">Date</label>
            <input
              className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-gray-400 transition-colors"
              value={date}
              onChange={e => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-2 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors">Cancel</button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-medium hover:bg-gray-700 transition-colors"
          >{isEditing ? 'Save Changes' : 'Add'}</button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;
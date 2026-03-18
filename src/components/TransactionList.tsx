import React from "react";

interface Transaction {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  icon: string;
}

interface Props {
  transactions: Transaction[];
  onDelete: (id: number) => void;
  onEdit: (tx: Transaction) => void;
  onAdd: () => void;
}

const TransactionList = ({ transactions, onDelete, onEdit, onAdd }: Props) => {
  const incomes = transactions.filter(t => t.type === 'income');
  const expenses = transactions.filter(t => t.type === 'expense');

  const Section = ({ title, items, color }: { title: string; items: Transaction[]; color: string }) => (
    <div className="mb-4">
      <div className={`flex items-center gap-2 mb-2`}>
        <span className={`text-xs font-semibold uppercase tracking-widest ${color}`}>{title}</span>
        <div className="flex-1 h-px bg-gray-100" />
        <span className="text-xs text-gray-400">{items.length} items</span>
      </div>
      <div className="flex flex-col gap-1">
        {items.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between group hover:bg-gray-50 rounded-xl px-2 py-2 transition-all">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-base flex-shrink-0 group-hover:bg-white transition-all">
                {tx.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-800">{tx.name}</p>
                <p className="text-xs text-gray-400">{tx.date} · {tx.category}</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <span className={`text-sm font-semibold font-mono mr-1 ${tx.type === 'income' ? 'text-green-600' : 'text-red-500'}`}>
                {tx.type === 'income' ? '+' : '-'}${tx.amount.toLocaleString()}
              </span>
              {/* Edit button - always slightly visible */}
              <button
                onClick={() => onEdit(tx)}
                title="Edit"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-blue-500 hover:bg-blue-50 transition-all opacity-40 group-hover:opacity-100"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              {/* Delete button - always slightly visible */}
              <button
                onClick={() => onDelete(tx.id)}
                title="Delete"
                className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all opacity-40 group-hover:opacity-100"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>
                  <path d="M10 11v6M14 11v6"/>
                  <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              </button>
            </div>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-xs text-gray-300 px-2 py-2">None yet</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">Transactions</h3>
          <p className="text-xs text-gray-400 mt-0.5">Hover a row to edit or delete</p>
        </div>
        <button
          onClick={onAdd}
          className="flex items-center gap-1.5 text-xs bg-gray-900 text-white px-3 py-2 rounded-xl hover:bg-gray-700 transition-colors font-medium"
        >
          <span className="text-base leading-none">+</span> Add
        </button>
      </div>

      <Section title="Income" items={incomes} color="text-green-600" />
      <Section title="Expenses" items={expenses} color="text-red-500" />
    </div>
  );
};

export default TransactionList;
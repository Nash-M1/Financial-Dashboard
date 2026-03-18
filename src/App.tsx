import { useState, useMemo } from 'react';
import type { Transaction, BudgetItem } from './types';
import { initialTransactions, initialBudgetItems, monthlyDataByRange, spendingCategories } from './data/mockData';
import MetricCard from './components/MetricCard';
import TransactionList from './components/TransactionList';
import BudgetTracker from './components/BudgetTracker';
import SpendingChart from './components/SpendingChart';
import DonutChart from './components/DonutChart';
import AddTransactionModal from './components/AddTransactionModal';

const tabs = ['3M', '6M', '1Y'] as const;
type Tab = typeof tabs[number];

function App() {
  const [activeTab, setActiveTab] = useState<Tab>('6M');
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(initialBudgetItems);
  const [showModal, setShowModal] = useState(false);
  const [editTx, setEditTx] = useState<Transaction | null>(null);

  const totalIncome = useMemo(() => transactions.filter(t => t.type === 'income').reduce((s, t) => s + t.amount, 0), [transactions]);
  const totalExpenses = useMemo(() => transactions.filter(t => t.type === 'expense').reduce((s, t) => s + t.amount, 0), [transactions]);
  const balance = useMemo(() => totalIncome - totalExpenses, [totalIncome, totalExpenses]);
  const savingsRate = useMemo(() => totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome * 100).toFixed(1) : '0.0', [totalIncome, totalExpenses]);

  const chartData = useMemo(() => {
    const base = monthlyDataByRange[activeTab];
    return base.map((d, i) => i === base.length - 1 ? { ...d, income: totalIncome, expenses: totalExpenses } : d);
  }, [activeTab, totalIncome, totalExpenses]);

  const dynamicBudget = useMemo(() => {
    return budgetItems.map(item => {
      const spent = transactions.filter(t => t.type === 'expense' && t.category === item.category).reduce((s, t) => s + t.amount, 0);
      return { ...item, spent: spent > 0 ? spent : item.spent };
    });
  }, [budgetItems, transactions]);

  const handleAddOrEdit = (tx: Transaction) => {
    if (editTx) {
      setTransactions(prev => prev.map(t => t.id === tx.id ? tx : t));
    } else {
      setTransactions(prev => [tx, ...prev]);
    }
    setEditTx(null);
  };

  const handleDelete = (id: number) => setTransactions(prev => prev.filter(t => t.id !== id));

  const handleEdit = (tx: Transaction) => {
    setEditTx(tx);
    setShowModal(true);
  };

  const handleOpenAdd = () => {
    setEditTx(null);
    setShowModal(true);
  };

  const expTrend = totalExpenses > 3000 ? 'up' : 'down';

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900 tracking-tight">Finance Overview</h1>
            <p className="text-sm text-gray-400 mt-1">Personal dashboard — March 2026</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex gap-1 p-1 bg-white border border-gray-200 rounded-xl">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                    activeTab === tab ? 'bg-gray-900 text-white' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >{tab}</button>
              ))}
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <MetricCard label="Balance" value={`$${balance.toLocaleString()}`} badge={balance >= 0 ? '▲ positive' : '▼ negative'} trend={balance >= 0 ? 'up' : 'down'} />
          <MetricCard label="Income" value={`$${totalIncome.toLocaleString()}`} badge="▲ this month" trend="up" />
          <MetricCard label="Expenses" value={`$${totalExpenses.toLocaleString()}`} badge={expTrend === 'down' ? '▼ low' : '▲ high'} trend={expTrend} />
          <MetricCard label="Savings Rate" value={`${savingsRate}%`} badge={parseFloat(savingsRate) >= 20 ? '▲ on track' : '▼ low'} trend={parseFloat(savingsRate) >= 20 ? 'up' : 'down'} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="md:col-span-2">
            <SpendingChart data={chartData} activeTab={activeTab} />
          </div>
          <DonutChart data={spendingCategories} />
        </div>

        {/* Bottom */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <TransactionList
            transactions={transactions}
            onDelete={handleDelete}
            onEdit={handleEdit}
            onAdd={handleOpenAdd}
          />
          <BudgetTracker items={dynamicBudget} onChange={setBudgetItems} />
        </div>

      </div>

      {showModal && (
        <AddTransactionModal
          onAdd={handleAddOrEdit}
          onClose={() => { setShowModal(false); setEditTx(null); }}
          editTx={editTx}
        />
      )}
    </div>
  );
}

export default App;
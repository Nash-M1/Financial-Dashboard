import type { Transaction, BudgetItem, MonthlyData, SpendingCategory } from '../types';

export const initialTransactions: Transaction[] = [
  { id: 1, name: 'Salary', category: 'Income', amount: 5400, date: 'Mar 5', type: 'income', icon: '💼' },
  { id: 2, name: 'Freelance', category: 'Income', amount: 800, date: 'Mar 7', type: 'income', icon: '💻' },
  { id: 3, name: 'Rent', category: 'Housing', amount: 1200, date: 'Mar 1', type: 'expense', icon: '🏠' },
  { id: 4, name: 'Groceries', category: 'Food', amount: 184, date: 'Mar 8', type: 'expense', icon: '🛒' },
  { id: 5, name: 'Fuel', category: 'Transport', amount: 68, date: 'Mar 12', type: 'expense', icon: '⛽' },
  { id: 6, name: 'Netflix', category: 'Subscriptions', amount: 18, date: 'Mar 10', type: 'expense', icon: '📺' },
];

export const initialBudgetItems: BudgetItem[] = [
  { category: 'Housing', spent: 1200, limit: 1500, color: '#3266ad' },
  { category: 'Food', spent: 520, limit: 600, color: '#e2634a' },
  { category: 'Transport', spent: 280, limit: 400, color: '#f0b429' },
  { category: 'Subscriptions', spent: 42, limit: 80, color: '#2cb67d' },
  { category: 'Entertainment', spent: 190, limit: 200, color: '#a32d2d' },
];

export const monthlyDataByRange: Record<string, MonthlyData[]> = {
  '3M': [
    { month: "Jan '26", income: 5300, expenses: 3050 },
    { month: "Feb '26", income: 5400, expenses: 3100 },
    { month: "Mar '26", income: 6200, expenses: 3210 },
  ],
  '6M': [
    { month: "Oct '25", income: 5100, expenses: 3100 },
    { month: "Nov '25", income: 5200, expenses: 3400 },
    { month: "Dec '25", income: 5600, expenses: 3900 },
    { month: "Jan '26", income: 5300, expenses: 3050 },
    { month: "Feb '26", income: 5400, expenses: 3100 },
    { month: "Mar '26", income: 6200, expenses: 3210 },
  ],
  '1Y': [
    { month: "Apr '25", income: 4800, expenses: 3200 },
    { month: "May '25", income: 4900, expenses: 2900 },
    { month: "Jun '25", income: 5000, expenses: 3100 },
    { month: "Jul '25", income: 5100, expenses: 3300 },
    { month: "Aug '25", income: 5000, expenses: 3050 },
    { month: "Sep '25", income: 5200, expenses: 2980 },
    { month: "Oct '25", income: 5100, expenses: 3100 },
    { month: "Nov '25", income: 5200, expenses: 3400 },
    { month: "Dec '25", income: 5600, expenses: 3900 },
    { month: "Jan '26", income: 5300, expenses: 3050 },
    { month: "Feb '26", income: 5400, expenses: 3100 },
    { month: "Mar '26", income: 6200, expenses: 3210 },
  ],
};

export const spendingCategories: SpendingCategory[] = [
  { name: 'Housing', value: 35, color: '#3266ad' },
  { name: 'Food', value: 22, color: '#e2634a' },
  { name: 'Transport', value: 15, color: '#f0b429' },
  { name: 'Other', value: 28, color: '#2cb67d' },
];
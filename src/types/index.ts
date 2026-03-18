export interface Transaction {
  id: number;
  name: string;
  category: string;
  amount: number;
  date: string;
  type: 'income' | 'expense';
  icon: string;
}

export interface BudgetItem {
  category: string;
  spent: number;
  limit: number;
  color: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

export interface MetricCardProps {
  label: string;
  value: string;
  badge: string;
  trend: 'up' | 'down';
}

export interface SpendingCategory {
  name: string;
  value: number;
  color: string;
}
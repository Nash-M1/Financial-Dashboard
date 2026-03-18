import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
}

interface Props {
  data: MonthlyData[];
  activeTab: string;
}

const SpendingChart = ({ data, activeTab }: Props) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-gray-800 mb-1">Income vs Expenses</h3>
      <p className="text-xs text-gray-400 mb-4">Last {activeTab === '3M' ? '3 months' : activeTab === '6M' ? '6 months' : '12 months'}</p>
      <div className="flex gap-4 mb-4">
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: '#3266ad' }} />
          Income
        </span>
        <span className="flex items-center gap-1.5 text-xs text-gray-500">
          <span className="w-2.5 h-2.5 rounded-sm inline-block" style={{ background: '#e2634a' }} />
          Expenses
        </span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} barCategoryGap="30%" barGap={4}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fontSize: 11, fill: '#9ca3af' }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '0.5px solid #e5e7eb' }} />
          <Bar dataKey="income" fill="#3266ad" radius={[4, 4, 0, 0]} />
          <Bar dataKey="expenses" fill="#e2634a" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingChart;
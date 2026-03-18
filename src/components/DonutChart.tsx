import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface SpendingCategory {
  name: string;
  value: number;
  color: string;
}

interface Props {
  data: SpendingCategory[];
}

const DonutChart = ({ data }: Props) => {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-5">
      <h3 className="text-sm font-semibold text-gray-800 mb-1">Spending Breakdown</h3>
      <p className="text-xs text-gray-400 mb-2">By category</p>
      <ResponsiveContainer width="100%" height={160}>
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ fontSize: 12, borderRadius: 8, border: '0.5px solid #e5e7eb' }} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-col gap-1.5 mt-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-2 text-gray-500">
              <span className="w-2 h-2 rounded-sm inline-block" style={{ background: item.color }} />
              {item.name}
            </span>
            <span className="font-medium text-gray-700">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonutChart;
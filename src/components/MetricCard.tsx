interface MetricCardProps {
  label: string;
  value: string;
  badge: string;
  trend: 'up' | 'down';
}

const MetricCard = ({ label, value, badge, trend }: MetricCardProps) => {
  const isUp = trend === 'up';
  return (
    <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-1">
      <span className="text-xs text-gray-400 uppercase tracking-widest font-medium">{label}</span>
      <span className="text-2xl font-semibold text-gray-900 font-mono tracking-tight">{value}</span>
      <span className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full w-fit mt-1 ${
        isUp ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
      }`}>
        {badge}
      </span>
    </div>
  );
};

export default MetricCard;
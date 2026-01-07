
import React from 'react';
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, Layers } from 'lucide-react';

interface KPIProps {
  isLoading: boolean;
}

const KPICard: React.FC<{
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  isLoading: boolean;
}> = ({ title, value, change, isPositive, icon, isLoading }) => (
  <div className="bg-white border border-slate-200 p-6 rounded-xl shadow-sm transition-shadow hover:shadow-md">
    {isLoading ? (
      <div className="animate-pulse space-y-4">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 bg-slate-100 rounded-lg"></div>
          <div className="w-16 h-4 bg-slate-100 rounded"></div>
        </div>
        <div className="h-8 bg-slate-100 rounded w-1/2"></div>
        <div className="h-4 bg-slate-100 rounded w-3/4"></div>
      </div>
    ) : (
      <>
        <div className="flex justify-between items-start">
          <div className="p-2.5 bg-slate-50 text-slate-600 rounded-lg border border-slate-100">
            {icon}
          </div>
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
            isPositive ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
          }`}>
            {isPositive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
            {change}
          </div>
        </div>
        <div className="mt-4">
          <h3 className="text-slate-500 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
        </div>
      </>
    )}
  </div>
);

const KPISection: React.FC<KPIProps> = ({ isLoading }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <KPICard 
        title="Total Revenue" 
        value="$128,430" 
        change="+12.5%" 
        isPositive={true} 
        icon={<DollarSign size={20} />}
        isLoading={isLoading}
      />
      <KPICard 
        title="Active Projects" 
        value="42" 
        change="+4" 
        isPositive={true} 
        icon={<Layers size={20} />}
        isLoading={isLoading}
      />
      <KPICard 
        title="Active Users" 
        value="1,842" 
        change="-2.1%" 
        isPositive={false} 
        icon={<Users size={20} />}
        isLoading={isLoading}
      />
      <KPICard 
        title="System Uptime" 
        value="99.98%" 
        change="+0.02%" 
        isPositive={true} 
        icon={<Activity size={20} />}
        isLoading={isLoading}
      />
    </div>
  );
};

export default KPISection;

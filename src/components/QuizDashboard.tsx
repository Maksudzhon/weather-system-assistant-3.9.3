import React from 'react';
import { useTranslation } from 'react-i18next';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { CheckCircle2, XCircle, BarChart3, Calendar } from 'lucide-react';
import { cn } from '../utils';

interface QuizDashboardProps {
  stats: {
    total: number;
    correct: number;
    incorrect: number;
    daily: Record<string, { total: number; correct: number }>;
  };
  isDarkMode?: boolean;
}

export const QuizDashboard: React.FC<QuizDashboardProps> = ({ stats, isDarkMode }) => {
  const { t } = useTranslation();

  const pieData = [
    { name: t('correct_answers'), value: stats.correct, color: '#10b981' },
    { name: t('incorrect_answers'), value: stats.incorrect, color: '#ef4444' }
  ];

  const barData = Object.entries(stats.daily).map(([date, data]) => ({
    date: date.split('-').slice(1).join('/'),
    correct: data.correct,
    total: data.total
  })).slice(-7);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={cn(
          "p-6 rounded-3xl border transition-all",
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        )}>
          <div className="flex items-center gap-3 mb-4">
            <BarChart3 className="w-5 h-5 text-indigo-600" />
            <h4 className="font-bold">{t('total_questions')}</h4>
          </div>
          <p className="text-4xl font-black">{stats.total}</p>
        </div>
        <div className={cn(
          "p-6 rounded-3xl border transition-all",
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        )}>
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
            <h4 className="font-bold">{t('correct_answers')}</h4>
          </div>
          <p className="text-4xl font-black text-emerald-500">{stats.correct}</p>
        </div>
        <div className={cn(
          "p-6 rounded-3xl border transition-all",
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        )}>
          <div className="flex items-center gap-3 mb-4">
            <XCircle className="w-5 h-5 text-red-500" />
            <h4 className="font-bold">{t('incorrect_answers')}</h4>
          </div>
          <p className="text-4xl font-black text-red-500">{stats.incorrect}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className={cn(
          "p-8 rounded-[40px] border transition-all",
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        )}>
          <h4 className="text-xl font-bold mb-8">{t('daily_stats')}</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "#1e293b" : "#f1f5f9"} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{
                    borderRadius: '16px', 
                    border: 'none', 
                    backgroundColor: isDarkMode ? '#0f172a' : '#fff',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    color: isDarkMode ? '#fff' : '#000'
                  }}
                />
                <Bar dataKey="correct" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="total" fill="#4f46e5" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className={cn(
          "p-8 rounded-[40px] border transition-all",
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
        )}>
          <h4 className="text-xl font-bold mb-8">{t('quiz_dashboard')}</h4>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    borderRadius: '16px', 
                    border: 'none', 
                    backgroundColor: isDarkMode ? '#0f172a' : '#fff',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    color: isDarkMode ? '#fff' : '#000'
                  }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Users, 
  Activity, 
  UserCheck, 
  UserMinus, 
  Lock, 
  LogOut,
  TrendingUp,
  BarChart2,
  AlertCircle
} from 'lucide-react';
import { cn } from '../utils';
import { auth } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';

// Mock data for demonstration since we don't have a real backend database yet
const MOCK_STATS = {
  totalUsers: 1240,
  activeUsers: 850,
  inactiveUsers: 390,
  dailyActive: 420,
  growth: "+12%"
};

export const AdminPanel: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode }) => {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchStats();
    }
  }, [isAuthenticated]);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Fallback for local testing if Firebase is not yet configured
    if (!import.meta.env.VITE_FIREBASE_API_KEY) {
      if (email === 'shxnz@admin.com' || email === 'shxnz') {
        if (password === '140824') {
          setIsAuthenticated(true);
          return;
        }
      }
    }

    try {
      setLoading(true);
      // Ensure email format
      const loginEmail = email.includes('@') ? email : `${email}@admin.com`;
      await signInWithEmailAndPassword(auth, loginEmail, password);
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || 'Login failed. Check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto py-20">
        <div className={cn(
          "p-10 rounded-[40px] border text-center transition-all",
          isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-xl"
        )}>
          <div className={cn(
            "w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8",
            isDarkMode ? "bg-slate-800" : "bg-indigo-50"
          )}>
            <Lock className="w-10 h-10 text-indigo-600" />
          </div>
          <h3 className={cn("text-3xl font-black mb-6", isDarkMode ? "text-white" : "text-slate-900")}>{t('admin_panel')}</h3>
          
          {!import.meta.env.VITE_FIREBASE_API_KEY && (
            <div className={cn(
              "mb-6 p-4 border rounded-2xl flex items-start gap-3 text-left",
              isDarkMode ? "bg-amber-900/10 border-amber-900/20" : "bg-amber-50 border-amber-200"
            )}>
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className={cn("text-xs font-medium", isDarkMode ? "text-amber-400" : "text-amber-800")}>
                Firebase hali sozlanmagan. Hozircha "shxnz" va "140824" paroli bilan kirishingiz mumkin.
              </p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <input 
              type="text" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email or Username"
              className={cn(
                "w-full p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all",
                isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"
              )}
            />
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className={cn(
                "w-full p-4 rounded-2xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all",
                isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200"
              )}
            />
            {error && <p className="text-red-500 text-sm font-bold">{error}</p>}
            <button 
              type="submit"
              disabled={loading}
              className={cn(
                "w-full py-4 bg-indigo-600 text-white font-black rounded-2xl hover:bg-indigo-700 transition-all disabled:opacity-50",
                isDarkMode ? "" : "shadow-lg shadow-indigo-200"
              )}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <h3 className={cn("text-3xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>{t('admin_panel')}</h3>
        <button 
          onClick={handleLogout}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-xl font-bold transition-all",
            isDarkMode ? "bg-red-900/20 text-red-400 hover:bg-red-900/40" : "bg-red-50 text-red-600 hover:bg-red-100"
          )}
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Users} 
          label={t('user_count')} 
          value={stats?.totalUsers || 0} 
          trend="+12%"
          color="indigo"
          isDarkMode={isDarkMode}
        />
        <StatCard 
          icon={UserCheck} 
          label={t('active_users')} 
          value={stats?.activeUsers || 0} 
          color="emerald"
          isDarkMode={isDarkMode}
        />
        <StatCard 
          icon={UserMinus} 
          label="Inactive" 
          value={(stats?.totalUsers || 0) - (stats?.activeUsers || 0)} 
          color="amber"
          isDarkMode={isDarkMode}
        />
        <StatCard 
          icon={Activity} 
          label={t('daily_active')} 
          value={stats?.dailyActive || 0} 
          color="violet"
          isDarkMode={isDarkMode}
        />
      </div>

      <div className={cn(
        "p-10 rounded-[40px] border transition-all",
        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
      )}>
        <div className={cn("flex items-center gap-3 mb-8", isDarkMode ? "text-white" : "text-slate-900")}>
          <BarChart2 className="w-6 h-6 text-indigo-600" />
          <h4 className="text-xl font-bold">User Activity Overview</h4>
        </div>
        <div className="h-80 flex items-center justify-center text-slate-500 font-bold italic">
          [Activity Chart Placeholder]
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, trend, color, isDarkMode }: any) => (
  <div className={cn(
    "p-8 rounded-3xl border transition-all",
    isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200"
  )}>
    <div className="flex justify-between items-start mb-6">
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center",
        color === 'indigo' && (isDarkMode ? "bg-indigo-900/30 text-indigo-400" : "bg-indigo-50 text-indigo-600"),
        color === 'emerald' && (isDarkMode ? "bg-emerald-900/30 text-emerald-400" : "bg-emerald-50 text-emerald-600"),
        color === 'amber' && (isDarkMode ? "bg-amber-900/30 text-amber-400" : "bg-amber-50 text-amber-600"),
        color === 'violet' && (isDarkMode ? "bg-violet-900/30 text-violet-400" : "bg-violet-50 text-violet-600")
      )}>
        <Icon className="w-6 h-6" />
      </div>
      {trend && (
        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-xs font-bold flex items-center gap-1">
          <TrendingUp className="w-3 h-3" />
          {trend}
        </span>
      )}
    </div>
    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{label}</p>
    <p className={cn("text-3xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>{value.toLocaleString()}</p>
  </div>
);

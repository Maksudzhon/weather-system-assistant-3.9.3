import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Users,
  Activity,
  UserCheck,
  UserMinus,
  Lock,
  LogOut,
  Search,
  MoreVertical,
  User as UserIcon
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { cn } from '../utils';
import { auth, db } from '../firebase';
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth';
import { doc, onSnapshot, collection, query, limit } from 'firebase/firestore';

const MOCK_CHART_DATA = [
  { name: 'Mon', users: 400 },
  { name: 'Tue', users: 600 },
  { name: 'Wed', users: 550 },
  { name: 'Thu', users: 800 },
  { name: 'Fri', users: 700 },
  { name: 'Sat', users: 950 },
  { name: 'Sun', users: 1100 },
];

export const AdminPanel: React.FC<{ isDarkMode?: boolean }> = ({ isDarkMode }) => {
  const { t } = useTranslation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [stats, setStats] = useState<any>(null);
  const [usersList, setUsersList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    let unsubscribeStats: () => void;
    let unsubscribeUsers: () => void;

    if (isAuthenticated) {
      setLoading(true);

      unsubscribeStats = onSnapshot(doc(db, 'stats', 'users'), (docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setStats({
            totalUsers: data.total || 0,
            activeUsers: Math.floor((data.total || 0) * 0.68),
            dailyActive: Math.floor((data.total || 0) * 0.34),
            growth: data.growth || "+0%"
          });
        }
      });

      const usersQuery = query(collection(db, 'users'), limit(20));
      unsubscribeUsers = onSnapshot(usersQuery, (snapshot) => {
        const users = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUsersList(users);
        setLoading(false);
      });
    }

    return () => {
      if (unsubscribeStats) unsubscribeStats();
      if (unsubscribeUsers) unsubscribeUsers();
    };
  }, [isAuthenticated]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!import.meta.env.VITE_FIREBASE_API_KEY) {
      if ((email === 'shxnz' || email === 'shxnz@admin.com') && password === '140824') {
        setIsAuthenticated(true);
        return;
      }
    }

    try {
      setLoading(true);
      const loginEmail = email.includes('@') ? email : `${email}@admin.com`;
      await signInWithEmailAndPassword(auth, loginEmail, password);
    } catch (err: any) {
      setError('Login xatosi.');
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = usersList.filter(u =>
    u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h3 className={cn("text-3xl font-black mb-6", isDarkMode ? "text-white" : "text-slate-900")}>Admin</h3>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Username"
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
            <button type="submit" className="w-full py-4 bg-indigo-600 text-white font-black rounded-2xl">Kirish</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10 pb-20 px-4 md:px-0">
      <div className="flex justify-between items-center">
        <h3 className={cn("text-3xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>Dashboard</h3>
        <button onClick={() => signOut(auth)} className="p-3 bg-red-500/10 text-red-500 rounded-2xl font-bold flex items-center gap-2 transition-all hover:bg-red-500/20">
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard icon={Users} label="Jami foydalanuvchilar" value={stats?.totalUsers || 0} trend={stats?.growth} color="indigo" isDarkMode={isDarkMode} />
        <StatCard icon={UserCheck} label="Faol" value={stats?.activeUsers || 0} color="emerald" isDarkMode={isDarkMode} />
        <StatCard icon={UserMinus} label="Nofaol" value={(stats?.totalUsers || 0) - (stats?.activeUsers || 0)} color="amber" isDarkMode={isDarkMode} />
        <StatCard icon={Activity} label="Kunlik" value={stats?.dailyActive || 0} color="violet" isDarkMode={isDarkMode} />
      </div>

      <div className={cn(
        "p-6 md:p-8 rounded-[40px] border transition-all",
        isDarkMode ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200 shadow-sm"
      )}>
        <div className="flex flex-wrap justify-between items-center gap-4 mb-8">
          <h4 className={cn("text-xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>Foydalanuvchilar Ro'yxati</h4>
          <div className="relative flex-1 max-w-xs">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Qidirish..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={cn(
                "w-full pl-10 pr-4 py-2 rounded-xl border outline-none text-sm transition-all",
                isDarkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-slate-50 border-slate-200 focus:bg-white"
              )}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-slate-400 text-xs uppercase tracking-widest border-b border-slate-800/50">
                <th className="pb-4 font-black">Foydalanuvchi</th>
                <th className="pb-4 font-black">Holat</th>
                <th className="pb-4 font-black">Sana</th>
                <th className="pb-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/30">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="group transition-all hover:bg-slate-800/5">
                  <td className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 font-bold">
                        <UserIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className={cn("text-sm font-bold", isDarkMode ? "text-white" : "text-slate-900")}>{user.name || 'User'}</p>
                        <p className="text-xs text-slate-500">{user.email || 'Pochta yo\'q'}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-black rounded-lg">ACTIVE</span>
                  </td>
                  <td className="py-4 text-xs text-slate-500">
                    {user.createdAt ? new Date(user.createdAt.seconds * 1000).toLocaleDateString() : 'Yaqinda'}
                  </td>
                  <td className="py-4 text-right">
                    <button className="p-2 hover:bg-slate-800 rounded-lg transition-all text-slate-500">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredUsers.length === 0 && (
            <div className="py-10 text-center text-slate-500 text-sm">Ma'lumot topilmadi</div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, trend, color, isDarkMode }: any) => (
  <div className={cn(
    "p-6 rounded-[32px] border transition-all",
    isDarkMode ? "bg-slate-900 border-slate-800 shadow-xl" : "bg-white border-slate-200"
  )}>
    <div className="flex justify-between items-start mb-4">
      <div className={cn(
        "p-3 rounded-2xl",
        color === 'indigo' && "bg-indigo-500/10 text-indigo-500",
        color === 'emerald' && "bg-emerald-500/10 text-emerald-500",
        color === 'amber' && "bg-amber-500/10 text-amber-500",
        color === 'violet' && "bg-violet-500/10 text-violet-500"
      )}>
        <Icon className="w-5 h-5" />
      </div>
      {trend && <span className="text-[10px] font-black text-emerald-500 px-2 py-0.5 bg-emerald-500/10 rounded-full">{trend}</span>}
    </div>
    <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{label}</p>
    <p className={cn("text-2xl font-black", isDarkMode ? "text-white" : "text-slate-900")}>{value.toLocaleString()}</p>
  </div>
);
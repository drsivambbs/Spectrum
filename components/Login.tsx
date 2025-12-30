
import React, { useState } from 'react';
import { Shield, Key, User as UserIcon, AlertCircle, Eye, EyeOff, LogIn } from 'lucide-react';
import { User, Designation } from '../types';

interface LoginProps {
  onLogin: (user: Partial<User>) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const cleanId = userId.trim();
    const cleanPassword = password.trim();

    setTimeout(() => {
      const savedUsers = localStorage.getItem('usersphere_users');
      const users: User[] = savedUsers ? JSON.parse(savedUsers) : [];

      if (cleanId.toLowerCase() === 'admin' && cleanPassword === 'password123') {
        onLogin({
          id: 'admin',
          fullName: 'System Administrator',
          designation: Designation.NATIONAL_ADMIN,
        });
        return;
      }

      const foundUser = users.find(u => u.id === cleanId && u.password === cleanPassword);
      if (foundUser) {
        onLogin(foundUser);
      } else {
        setError('Verification failed. Invalid credentials.');
        setIsLoading(false);
      }
    }, 400);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-[340px] bg-white rounded-lg shadow-xl shadow-slate-200/50 border border-slate-200 overflow-hidden">
        <div className="p-6 text-center border-b border-slate-50">
          <div className="w-10 h-10 bg-slate-900 rounded mx-auto flex items-center justify-center mb-3">
            <Shield className="text-white" size={20} />
          </div>
          <h1 className="text-[15px] font-black text-slate-900 tracking-tight uppercase">Access Control</h1>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Spectrum Portal</p>
        </div>

        <form onSubmit={handleLogin} className="p-6 space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 rounded text-red-600 text-[11px] font-bold flex items-center gap-2">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Login ID</label>
            <div className="relative">
              <UserIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
              <input 
                required
                type="text" 
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded text-[13px] outline-none focus:border-slate-400 font-medium"
                placeholder="ID or 'admin'"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Secret</label>
            <div className="relative">
              <Key className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
              <input 
                required
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-8 pr-10 py-2 bg-slate-50 border border-slate-200 rounded text-[13px] outline-none focus:border-slate-400 font-medium"
                placeholder="Password"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500 p-1"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-slate-900 hover:bg-black text-white text-[12px] font-black py-2.5 rounded shadow-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-2 uppercase tracking-tight"
          >
            {isLoading ? (
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn size={16} />
                Authorize
              </>
            )}
          </button>
        </form>

        <div className="p-4 bg-slate-50/50 border-t border-slate-100 flex justify-center">
          <button 
            onClick={() => { setUserId('admin'); setPassword('password123'); }}
            className="text-[10px] font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest flex items-center gap-1"
          >
            Demo Admin Credentials
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

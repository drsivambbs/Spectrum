
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, Navigate } from 'react-router-dom';
import UserManagement from './components/UserManagement';
import Login from './components/Login';
import { 
  Users, 
  Settings, 
  Menu, 
  X, 
  Bell, 
  Search,
  UserCircle,
  LogOut,
  ShieldCheck
} from 'lucide-react';
import { User } from './types';
import './firebase/config'; // Initialize Firebase

const Sidebar = ({ isOpen, setIsOpen, user, onLogout }: { 
  isOpen: boolean; 
  setIsOpen: (val: boolean) => void;
  user: Partial<User> | null;
  onLogout: () => void;
}) => {
  const location = useLocation();
  
  const links = [
    { name: 'User Directory', path: '/users', icon: <Users size={16} /> },
    { name: 'Settings', path: '/settings', icon: <Settings size={16} /> },
  ];

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden" 
          onClick={() => setIsOpen(false)}
        />
      )}
      
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-56 bg-slate-900 text-white transform transition-transform duration-200 ease-out flex flex-col border-r border-slate-800
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0 md:static md:block
      `}>
        <div className="flex items-center justify-between p-4 h-14 border-b border-slate-800/50">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded flex items-center justify-center font-bold text-sm shadow-inner text-white">S</div>
            <span className="font-bold text-base tracking-tight text-slate-100">Spectrum</span>
          </div>
          <button className="md:hidden p-1 hover:bg-slate-800 rounded" onClick={() => setIsOpen(false)}>
            <X size={16} />
          </button>
        </div>

        <nav className="p-2 space-y-0.5 flex-1">
          {links.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-[13px] font-semibold
                ${location.pathname === link.path 
                  ? 'bg-slate-800 text-white border border-slate-700' 
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'}
              `}
            >
              <span className={location.pathname === link.path ? 'text-blue-400' : 'text-slate-500'}>
                {link.icon}
              </span>
              <span>{link.name}</span>
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-slate-800/50">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/30 border border-slate-800/50">
            <div className="h-8 w-8 rounded bg-slate-700 flex items-center justify-center shrink-0">
              <UserCircle className="text-slate-400" size={20} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold truncate text-slate-100 leading-none">{user?.fullName || 'Active User'}</p>
              <p className="text-[9px] text-slate-500 truncate uppercase tracking-tighter mt-1">{user?.designation || 'Member'}</p>
            </div>
            <button 
              onClick={onLogout}
              className="p-1.5 hover:bg-red-500/10 text-slate-500 hover:text-red-400 rounded transition-colors"
              title="Logout"
            >
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

const Header = ({ onToggleSidebar }: { onToggleSidebar: () => void }) => {
  return (
    <header className="h-14 bg-white border-b border-slate-200 flex items-center justify-between px-4 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} className="p-1.5 hover:bg-slate-100 rounded md:hidden">
          <Menu size={18} />
        </button>
        <div className="relative hidden sm:block">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input 
            type="text" 
            placeholder="Search records..." 
            className="pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-[13px] focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 w-48 lg:w-64 transition-all outline-none"
          />
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <button className="p-1.5 text-slate-500 hover:bg-slate-100 rounded relative transition-colors">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full border border-white"></span>
        </button>
        <div className="h-8 w-8 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center border border-slate-200 font-bold hover:bg-slate-200 transition-colors cursor-pointer">
          <UserCircle size={20} />
        </div>
      </div>
    </header>
  );
};

const App: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<User> | null>(null);
  const [isAuthChecking, setIsAuthChecking] = useState(true);

  useEffect(() => {
    const savedUser = sessionStorage.getItem('spectrum_auth');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (e) {
        sessionStorage.removeItem('spectrum_auth');
      }
    }
    setIsAuthChecking(false);
  }, []);

  const handleLogin = (user: Partial<User>) => {
    setCurrentUser(user);
    sessionStorage.setItem('spectrum_auth', JSON.stringify(user));
  };

  const handleLogout = () => {
    sessionStorage.clear();
    setCurrentUser(null);
  };

  if (isAuthChecking) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-blue-600/20 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <Router>
      {!currentUser ? (
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <div className="flex min-h-screen bg-slate-50">
          <Sidebar 
            isOpen={isSidebarOpen} 
            setIsOpen={setIsSidebarOpen} 
            user={currentUser} 
            onLogout={handleLogout} 
          />
          
          <div className="flex-1 flex flex-col min-w-0">
            <Header onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 max-w-7xl mx-auto w-full">
              <Routes>
                <Route path="/users" element={<UserManagement />} />
                <Route path="/settings" element={<div className="p-8 text-center text-slate-400 bg-white rounded border border-dashed border-slate-200 text-sm">Preferences interface pending.</div>} />
                <Route path="/" element={<Navigate to="/users" replace />} />
                <Route path="*" element={<Navigate to="/users" replace />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </Router>
  );
};

export default App;

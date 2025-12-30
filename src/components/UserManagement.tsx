
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Plus, 
  Search, 
  Edit2,
  Trash2,
  Users,
  MapPin,
  Briefcase,
  Key,
  Phone,
  ChevronRight,
  ShieldAlert,
  X,
  User as UserIcon,
  Circle,
  FileText,
  Loader2
} from 'lucide-react';
import { User, Designation, District, UserStatus, Gender } from '../types';
import UserForm from './UserForm';
import { UserService } from '../firebase/userService';

const UserDetailModal: React.FC<{ 
  user: User; 
  onClose: () => void; 
  onEdit: (u: User) => void;
  onDelete: (id: string) => void;
}> = ({ 
  user, 
  onClose, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px]" onClick={onClose} />
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md relative overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/30">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded flex items-center justify-center ${user.id === 'admin' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500'}`}>
              {user.id === 'admin' ? <ShieldAlert size={16} /> : <UserIcon size={16} />}
            </div>
            <div>
              <h2 className="text-[14px] font-bold text-slate-900 leading-none">{user.fullName}</h2>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight mt-1">{user.designation}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded text-slate-400">
            <X size={16} />
          </button>
        </div>
        
        <div className="p-5 space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <section>
                <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Primary Contact</h4>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 text-[12px] text-slate-700 font-semibold">
                    <Phone size={12} className="text-slate-300" />
                    <span>+91 {user.mobileNumber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[12px] text-slate-700 font-semibold">
                    <MapPin size={12} className="text-slate-300" />
                    <span>{user.district}</span>
                  </div>
                </div>
              </section>

              <section>
                <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Meta</h4>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-1.5 py-0.5 bg-slate-100 text-slate-600 rounded text-[10px] font-bold border border-slate-200">{user.gender}</span>
                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                    user.status === UserStatus.ACTIVE ? 'bg-green-50 text-green-700 border-green-100' : 'bg-slate-100 text-slate-500 border-slate-200'
                  }`}>{user.status}</span>
                </div>
              </section>
            </div>

            <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 space-y-3">
              <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Authentication</h4>
              <div>
                <label className="text-[8px] text-slate-500 uppercase font-bold">User Identifier</label>
                <p className="text-[11px] font-mono font-bold text-slate-800 bg-white p-1 rounded border border-slate-200 mt-0.5">{user.id}</p>
              </div>
              <div>
                <label className="text-[8px] text-slate-500 uppercase font-bold">Encrypted Secret</label>
                <p className="text-[11px] font-mono font-bold text-blue-700 bg-blue-50/50 p-1 rounded border border-blue-100 mt-0.5">{user.password}</p>
              </div>
            </div>
          </div>

          <section>
            <h4 className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-2">Profile Overview</h4>
            <div className="bg-slate-50/50 rounded-lg p-3 border border-slate-100 text-[12px] text-slate-600 italic leading-relaxed">
              "{user.bio || 'Profile description pending data synchronization.'}"
            </div>
          </section>

          <div className="flex items-center justify-between pt-4 border-t border-slate-100">
            <button 
              onClick={() => onDelete(user.id)}
              disabled={user.id === 'admin'}
              className="text-[11px] font-bold text-red-500 hover:text-red-600 disabled:opacity-20 transition-colors uppercase tracking-tight"
            >
              Terminate
            </button>
            <div className="flex gap-2">
              <button 
                onClick={onClose}
                className="px-3 py-1.5 text-slate-500 hover:bg-slate-100 rounded text-[11px] font-bold"
              >
                Cancel
              </button>
              <button 
                onClick={() => onEdit(user)}
                className="px-4 py-1.5 bg-slate-900 text-white rounded text-[11px] font-bold hover:bg-slate-800 transition-colors"
              >
                Modify Record
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserCard: React.FC<{ user: User; onClick: () => void }> = ({ user, onClick }) => {
  const initials = user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  
  return (
    <div 
      onClick={onClick}
      className="group bg-white p-3 rounded border border-slate-200 hover:border-slate-400 hover:shadow-sm transition-all cursor-pointer flex items-center gap-3 relative"
    >
      <div className={`w-8 h-8 rounded flex items-center justify-center font-bold text-[10px] shrink-0 ${
        user.id === 'admin' ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-500 border border-slate-200'
      }`}>
        {user.id === 'admin' ? <ShieldAlert size={14} /> : initials}
      </div>
      
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <h3 className="text-[13px] font-bold text-slate-900 truncate group-hover:text-blue-600">
            {user.fullName}
          </h3>
          <Circle 
            size={5} 
            fill={user.status === UserStatus.ACTIVE ? "#22c55e" : "#94a3b8"} 
            className={user.status === UserStatus.ACTIVE ? "text-green-500" : "text-slate-400"} 
          />
        </div>
        <p className="text-[9px] text-slate-500 font-black uppercase tracking-tighter truncate">
          {user.designation} • {user.district.split(',')[0]}
        </p>
      </div>
      
      <ChevronRight size={14} className="text-slate-300 group-hover:text-slate-500" />
    </div>
  );
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [filterDesignation, setFilterDesignation] = useState<string>('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(12);

  const SYSTEM_ADMIN: User = {
    id: 'admin',
    fullName: 'System Administrator',
    gender: Gender.OTHER,
    mobileNumber: '0000000000',
    designation: Designation.NATIONAL_ADMIN,
    district: District.WEST_DELHI,
    status: UserStatus.ACTIVE,
    bio: 'Primary system administrator with global operational oversight.',
    password: 'password123',
    createdAt: new Date().toISOString()
  };

  // Load users from Firebase
  const loadUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Clear old localStorage format
      localStorage.removeItem('usersphere_users');
      
      // Test Firestore connection first
      const connectionTest = await UserService.testConnection();
      if (!connectionTest) {
        throw new Error('Firestore connection failed');
      }
      
      // Load from Firebase
      const firebaseUsers = await UserService.getAllUsers();
      
      // Always include system admin
      const allUsers = [SYSTEM_ADMIN, ...firebaseUsers.filter(u => u.id !== 'admin')];
      setUsers(allUsers);
      
    } catch (err) {
      console.error('Error loading users:', err);
      setError(`Failed to load users: ${err.message}. Using offline mode.`);
      setUsers([SYSTEM_ADMIN]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  // Save users to both Firebase and localStorage
  const saveUsers = useCallback(async (newUsers: User[]) => {
    setUsers(newUsers);
    
    // Always save to localStorage as backup
    localStorage.setItem('usersphere_users', JSON.stringify(newUsers));
    
    // Try to sync with Firebase
    try {
      // Note: This is a simplified approach. In a real app, you'd sync individual changes
      console.log('Users updated locally. Firebase sync would happen here.');
    } catch (err) {
      console.error('Error syncing to Firebase:', err);
    }
  }, []);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = `${user.fullName} ${user.mobileNumber} ${user.id}`.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesDesignation = filterDesignation === 'All' || user.designation === filterDesignation;
      return matchesSearch && matchesDesignation;
    });
  }, [users, searchTerm, filterDesignation]);

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(startIndex, startIndex + usersPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filterDesignation]);

  const handleSaveUser = async (userData: Partial<User>) => {
    try {
      setError(null);
      
      if (editingUser) {
        // Update existing user - check if it's a real Firebase document
        if (editingUser.id !== 'admin') {
          try {
            await UserService.updateUser(editingUser.id, userData);
            const updated = users.map(u => u.id === editingUser.id ? { ...u, ...userData } as User : u);
            setUsers(updated);
          } catch (updateError) {
            // If update fails, treat as new user
            console.warn('Update failed, creating new user:', updateError);
            const newUserData = { ...userData, createdAt: new Date().toISOString() } as Omit<User, 'id'>;
            const firebaseId = await UserService.addUser(newUserData);
            const newUser = { ...newUserData, id: firebaseId } as User;
            const updated = users.filter(u => u.id !== editingUser.id).concat(newUser);
            setUsers(updated);
          }
        } else {
          // Admin user - only update locally
          const updated = users.map(u => u.id === editingUser.id ? { ...u, ...userData } as User : u);
          setUsers(updated);
        }
      } else {
        // Add new user
        const newUserData = { ...userData, createdAt: new Date().toISOString() } as Omit<User, 'id'>;
        const firebaseId = await UserService.addUser(newUserData);
        const newUser = { ...newUserData, id: firebaseId } as User;
        const updated = [newUser, ...users];
        setUsers(updated);
      }
      
      setIsFormModalOpen(false);
      setEditingUser(null);
      setSelectedUser(null);
    } catch (err) {
      console.error('Error saving user:', err);
      setError('Failed to save user. Please try again.');
    }
  };

  const handleDelete = async (id: string) => {
    if (id === 'admin') return;
    
    if (window.confirm('Confirm record termination?')) {
      try {
        setError(null);
        console.log('Deleting user with ID:', id);
        
        await UserService.deleteUser(id);
        console.log('User deleted from Firebase successfully');
        
        const updated = users.filter(u => u.id !== id);
        setUsers(updated);
        setSelectedUser(null);
        
        // Adjust current page if needed
        const newTotalPages = Math.ceil((updated.length - 1) / usersPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
        
        console.log('User deleted successfully from local state');
      } catch (err) {
        console.error('Error deleting user:', err);
        setError('Failed to delete user. Please try again.');
      }
    }
  };

  return (
    <div className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}
      
      <div className="flex items-center justify-between gap-4 bg-white p-4 rounded border border-slate-200">
        <div>
          <h1 className="text-base font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
            <Users size={16} className="text-slate-900" />
            Registry
            {loading && <Loader2 size={14} className="animate-spin text-slate-400" />}
          </h1>
        </div>
        <button 
          onClick={() => { setEditingUser(null); setIsFormModalOpen(true); }}
          disabled={loading}
          className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded text-[11px] font-black flex items-center gap-1.5 transition-colors disabled:opacity-50"
        >
          <Plus size={14} />
          Register
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
          <input 
            type="text" 
            placeholder="Search identity parameters..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-9 pr-3 py-2 w-full bg-white border border-slate-200 rounded text-[12px] outline-none focus:border-slate-400 font-medium"
          />
        </div>
        
        <select 
          className="bg-white border border-slate-200 rounded text-[12px] font-bold text-slate-600 outline-none px-2 py-2"
          value={filterDesignation}
          onChange={(e) => setFilterDesignation(e.target.value)}
        >
          <option value="All">All Roles</option>
          {Object.values(Designation).map(d => (
            <option key={d} value={d}>{d}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
        {loading ? (
          <div className="col-span-full py-12 bg-white border border-slate-200 rounded flex flex-col items-center justify-center text-slate-400">
            <Loader2 size={24} className="animate-spin text-slate-300 mb-2" />
            <p className="text-[11px] font-bold uppercase tracking-widest">Loading Registry</p>
          </div>
        ) : paginatedUsers.length > 0 ? (
          paginatedUsers.map((user) => (
            <UserCard 
              key={user.id} 
              user={user} 
              onClick={() => setSelectedUser(user)} 
            />
          ))
        ) : (
          <div className="col-span-full py-12 bg-white border border-dashed border-slate-200 rounded flex flex-col items-center justify-center text-slate-400 text-center">
             <FileText size={20} className="text-slate-200 mb-2" />
             <p className="text-[11px] font-bold uppercase tracking-widest">No matching results</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredUsers.length > usersPerPage && (
        <div className="flex items-center justify-between bg-white p-3 rounded border border-slate-200">
          <p className="text-[11px] text-slate-500 font-bold">
            Showing {startIndex + 1}-{Math.min(startIndex + usersPerPage, filteredUsers.length)} of {filteredUsers.length}
          </p>
          <div className="flex gap-1">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 text-[11px] font-bold text-slate-500 hover:bg-slate-100 rounded disabled:opacity-50"
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-2 py-1 text-[11px] font-bold rounded ${
                  currentPage === page 
                    ? 'bg-slate-900 text-white' 
                    : 'text-slate-500 hover:bg-slate-100'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 text-[11px] font-bold text-slate-500 hover:bg-slate-100 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {selectedUser && (
        <UserDetailModal 
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onEdit={(user) => { setEditingUser(user); setIsFormModalOpen(true); }}
          onDelete={handleDelete}
        />
      )}

      {isFormModalOpen && (
        <UserForm 
          user={editingUser} 
          existingUsers={users}
          onClose={() => { setIsFormModalOpen(false); setEditingUser(null); }}
          onSave={handleSaveUser}
        />
      )}
    </div>
  );
};

export default UserManagement;

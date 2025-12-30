
import React, { useState } from 'react';
import { X, Save, User as UserIcon, AlertCircle, Key } from 'lucide-react';
import { User, UserStatus, Gender, Designation, District } from '../types';

interface UserFormProps {
  user: User | null;
  onClose: () => void;
  onSave: (userData: Partial<User>) => void;
  existingUsers: User[];
}

const UserForm: React.FC<UserFormProps> = ({ user, onClose, onSave, existingUsers }) => {
  const [formData, setFormData] = useState<Partial<User>>(
    user || {
      fullName: '',
      gender: Gender.MALE,
      mobileNumber: '',
      designation: Designation.COUNSELLOR,
      status: UserStatus.ACTIVE,
      district: District.AMRITSAR,
      bio: '',
    }
  );
  
  const [error, setError] = useState<string | null>(null);

  const getAbbreviation = (designation: Designation): string => {
    switch (designation) {
      case Designation.NATIONAL_ADMIN: return 'NA';
      case Designation.HUB_MANAGER: return 'HM';
      case Designation.COUNSELLOR: return 'CO';
      case Designation.DOCTOR: return 'DO';
      default: return 'US';
    }
  };

  const generatePassword = (designation: Designation, phone: string) => {
    const abbr = getAbbreviation(designation);
    const lastThree = phone.slice(-3);
    return `${abbr}${lastThree}`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.mobileNumber || formData.mobileNumber.length !== 10 || !/^\d+$/.test(formData.mobileNumber)) {
      setError("Mobile number must be exactly 10 digits.");
      return;
    }

    const isDuplicate = existingUsers.some(u => u.mobileNumber === formData.mobileNumber && u.id !== user?.id);
    if (isDuplicate) {
      setError("This mobile number is already associated with an account.");
      return;
    }

    const finalData: Partial<User> = { 
      ...formData,
      id: formData.mobileNumber
    };

    if (!user || formData.mobileNumber !== user.mobileNumber || formData.designation !== user.designation) {
      finalData.password = generatePassword(formData.designation as Designation, formData.mobileNumber as string);
    }

    onSave(finalData);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] transition-opacity" onClick={onClose} />
      
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden flex flex-col max-h-[90vh] border border-slate-200">
        <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div>
            <h2 className="text-base font-black text-slate-900 uppercase tracking-tight">
              {user ? 'Update Profile' : 'New Registration'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-lg text-slate-400 transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
          {error && (
            <div className="p-3 bg-red-50 border border-red-100 text-red-600 text-[11px] rounded-lg font-bold flex items-center gap-2">
              <AlertCircle size={14} />
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Full Legal Name</label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
              <input 
                required
                type="text" 
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full pl-9 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 outline-none transition-all font-medium"
                placeholder="As per identification"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Gender</label>
              <select 
                value={formData.gender}
                onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as Gender }))}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 outline-none bg-slate-50 font-bold text-slate-700"
              >
                {Object.values(Gender).map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Contact Number</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[10px]">+91</span>
                <input 
                  required
                  type="text" 
                  maxLength={10}
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, mobileNumber: e.target.value.replace(/\D/g, '') }))}
                  className="w-full pl-11 pr-4 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 outline-none transition-all font-bold text-slate-800"
                  placeholder="10 digits"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Designation</label>
              <select 
                value={formData.designation}
                onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value as Designation }))}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 outline-none bg-slate-50 font-bold text-slate-700"
              >
                {Object.values(Designation).map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">District</label>
              <select 
                value={formData.district}
                onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value as District }))}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 outline-none bg-slate-50 font-bold text-slate-700"
              >
                {Object.values(District).map(dist => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Profile Summary</label>
            <textarea 
              rows={2}
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Brief professional background..."
              className="w-full px-4 py-3 border border-slate-200 rounded-xl text-sm focus:ring-4 focus:ring-blue-500/5 focus:border-blue-400 outline-none transition-all resize-none font-medium"
            />
          </div>

          <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-xl">
            <div className="flex items-start gap-2">
              <Key size={14} className="text-blue-600 mt-0.5" />
              <p className="text-[10px] text-blue-700 font-bold leading-tight uppercase tracking-tight">
                Secure Password auto-generated based on designation prefix and contact suffix.
              </p>
            </div>
          </div>

          <div className="flex gap-3 pt-4 sticky bottom-0 bg-white">
            <button 
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-3 px-4 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 shadow-xl shadow-slate-200 transition-all flex items-center justify-center gap-2"
            >
              <Save size={16} />
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;

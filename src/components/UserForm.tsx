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
      ...formData
    };

    if (!user || formData.mobileNumber !== user.mobileNumber || formData.designation !== user.designation) {
      finalData.password = generatePassword(formData.designation as Designation, formData.mobileNumber as string);
    }

    onSave(finalData);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-[2px]" onClick={onClose} />
      
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-[380px] relative overflow-hidden border border-slate-200">
        <div className="flex items-center justify-between p-4 border-b border-slate-100 bg-slate-50/30">
          <h2 className="text-[14px] font-bold text-slate-900 leading-none">
            {user ? 'Update Profile' : 'New Registration'}
          </h2>
          <button onClick={onClose} className="p-1.5 hover:bg-slate-100 rounded text-slate-400">
            <X size={16} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-3">
          {error && (
            <div className="p-2.5 bg-red-50 border border-red-100 text-red-600 text-[10px] rounded font-bold flex items-center gap-2">
              <AlertCircle size={12} />
              {error}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Full Name</label>
            <div className="relative">
              <UserIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
              <input 
                required
                type="text" 
                value={formData.fullName}
                onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                className="w-full pl-8 pr-3 py-2 border border-slate-200 rounded text-[13px] focus:border-slate-400 outline-none font-medium"
                placeholder="As per ID"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Gender</label>
              <select 
                value={formData.gender}
                onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value as Gender }))}
                className="w-full px-2.5 py-2 border border-slate-200 rounded text-[13px] focus:border-slate-400 outline-none bg-slate-50 font-medium text-slate-700"
              >
                {Object.values(Gender).map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Mobile</label>
              <div className="relative">
                <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-[10px]">+91</span>
                <input 
                  required
                  type="text" 
                  maxLength={10}
                  value={formData.mobileNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, mobileNumber: e.target.value.replace(/\D/g, '') }))}
                  className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded text-[13px] focus:border-slate-400 outline-none font-bold text-slate-800"
                  placeholder="10 digits"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Role</label>
              <select 
                value={formData.designation}
                onChange={(e) => setFormData(prev => ({ ...prev, designation: e.target.value as Designation }))}
                className="w-full px-2.5 py-2 border border-slate-200 rounded text-[13px] focus:border-slate-400 outline-none bg-slate-50 font-medium text-slate-700"
              >
                {Object.values(Designation).map(d => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">District</label>
              <select 
                value={formData.district}
                onChange={(e) => setFormData(prev => ({ ...prev, district: e.target.value as District }))}
                className="w-full px-2.5 py-2 border border-slate-200 rounded text-[13px] focus:border-slate-400 outline-none bg-slate-50 font-medium text-slate-700"
              >
                {Object.values(District).map(dist => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Bio</label>
            <textarea 
              rows={2}
              value={formData.bio}
              onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
              placeholder="Brief background..."
              className="w-full px-3 py-2 border border-slate-200 rounded text-[13px] focus:border-slate-400 outline-none resize-none font-medium"
            />
          </div>

          <div className="p-2.5 bg-blue-50/50 border border-blue-100 rounded">
            <div className="flex items-start gap-2">
              <Key size={12} className="text-blue-600 mt-0.5" />
              <p className="text-[9px] text-blue-700 font-bold leading-tight uppercase tracking-tight">
                Auto-generated secure password
              </p>
            </div>
          </div>

          <div className="flex gap-2 pt-3 border-t border-slate-100">
            <button 
              type="button"
              onClick={onClose}
              className="px-3 py-1.5 text-slate-500 hover:bg-slate-100 rounded text-[11px] font-bold"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="flex-1 py-1.5 px-4 bg-slate-900 text-white rounded text-[11px] font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-1.5"
            >
              <Save size={14} />
              Save Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;

import React, { useState } from 'react';
import { X, AlertCircle } from 'lucide-react';
import { Project } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (project: Project) => void;
}

const CreateProjectModal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    owner: 'Alex Rivers',
    budget: '',
    status: 'Active' as Project['status'],
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.budget) {
      setError('Please fill in all required fields.');
      return;
    }

    const newProject: Project = {
      id: Math.random().toString(36).substr(2, 9),
      name: formData.name,
      owner: formData.owner,
      budget: parseInt(formData.budget),
      status: formData.status,
      progress: 0,
      lastUpdated: 'Just now'
    };

    onSubmit(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Create New Project</h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-900 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-100 p-3 rounded-lg flex items-center gap-3 text-red-700 text-sm">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Project Name</label>
            <input 
              autoFocus
              type="text" 
              placeholder="e.g. Q4 Growth Strategy"
              className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:outline-none transition-all"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Budget ($)</label>
              <input 
                type="number" 
                placeholder="50000"
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:outline-none"
                value={formData.budget}
                onChange={e => setFormData({...formData, budget: e.target.value})}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700">Owner</label>
              <select 
                className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 focus:outline-none appearance-none"
                value={formData.owner}
                onChange={e => setFormData({...formData, owner: e.target.value})}
              >
                <option>Alex Rivers</option>
                <option>Sarah Chen</option>
                <option>Marcus Wright</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-slate-700">Initial Status</label>
            <div className="flex gap-4">
              {['Active', 'Paused', 'Archived'].map((status) => (
                <label key={status} className="flex-1 flex items-center justify-center p-3 rounded-lg border border-slate-200 bg-slate-50 cursor-pointer hover:bg-white transition-all peer-checked:border-blue-500 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 has-[:checked]:text-blue-700">
                  <input 
                    type="radio" 
                    name="status" 
                    className="hidden" 
                    checked={formData.status === status}
                    onChange={() => setFormData({...formData, status: status as Project['status']})}
                  />
                  <span className="text-xs font-semibold">{status}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3">
            <button 
              type="button" 
              onClick={onClose}
              className="px-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button 
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProjectModal;

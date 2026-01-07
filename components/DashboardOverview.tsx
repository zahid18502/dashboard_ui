
import React, { useState, useEffect } from 'react';
import KPISection from './KPISection';
import ChartsSection from './ChartsSection';
import DataTable from './DataTable';
import CreateProjectModal from './CreateProjectModal';
import { Plus, Download, RefreshCw } from 'lucide-react';
import { Project } from '../types';
import { getMockProjects } from '../services/mockData';

const DashboardOverview: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial data fetch
    const loadData = async () => {
      setIsLoading(true);
      setTimeout(() => {
        setProjects(getMockProjects());
        setIsLoading(false);
      }, 800);
    };
    loadData();
  }, []);

  const handleCreateProject = (newProject: Project) => {
    // Optimistic Update Implementation
    setProjects(prev => [newProject, ...prev]);
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setProjects(getMockProjects());
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="space-y-8">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">System Overview</h1>
          <p className="text-slate-500 text-sm mt-1">Monitor real-time infrastructure and project health.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRefresh}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all disabled:opacity-50"
            disabled={isLoading}
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Refresh
          </button>
          <button className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-all">
            <Download size={16} />
            Export Data
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 shadow-sm transition-all"
          >
            <Plus size={18} />
            New Project
          </button>
        </div>
      </div>

      {/* KPI Section */}
      <KPISection isLoading={isLoading} />

      {/* Charts Section */}
      <ChartsSection isLoading={isLoading} />

      {/* Projects Table */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">Active Projects</h2>
            <p className="text-xs text-slate-500 mt-0.5">Showing {projects.length} results</p>
          </div>
        </div>
        <DataTable data={projects} isLoading={isLoading} />
      </div>

      {isModalOpen && (
        <CreateProjectModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSubmit={handleCreateProject}
        />
      )}
    </div>
  );
};

export default DashboardOverview;

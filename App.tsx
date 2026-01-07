
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  FolderKanban, 
  BarChart3, 
  Settings, 
  LogOut,
  Bell,
  Search,
  Plus
} from 'lucide-react';
import { DashboardTab } from './types';
import DashboardOverview from './components/DashboardOverview';

const SidebarItem: React.FC<{ 
  icon: React.ReactNode; 
  label: string; 
  active?: boolean; 
  onClick: () => void 
}> = ({ icon, label, active, onClick }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${
      active 
        ? 'bg-blue-50 text-blue-600' 
        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
    }`}
  >
    {icon}
    {label}
  </button>
);

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>(DashboardTab.OVERVIEW);

  const renderContent = () => {
    switch (activeTab) {
      case DashboardTab.OVERVIEW:
        return <DashboardOverview />;
      case DashboardTab.PROJECTS:
        return (
          <div className="flex items-center justify-center h-full text-slate-400">
            Projects Management View (Placeholder)
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full text-slate-400">
            View coming soon...
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white flex flex-col shrink-0">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">Z</span>
            </div>
            <span className="text-lg font-semibold tracking-tight text-slate-900">Zenith</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          <div className="px-3 mb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Menu
          </div>
          <SidebarItem 
            icon={<LayoutDashboard size={20} />} 
            label="Overview" 
            active={activeTab === DashboardTab.OVERVIEW}
            onClick={() => setActiveTab(DashboardTab.OVERVIEW)}
          />
          <SidebarItem 
            icon={<FolderKanban size={20} />} 
            label="Projects" 
            active={activeTab === DashboardTab.PROJECTS}
            onClick={() => setActiveTab(DashboardTab.PROJECTS)}
          />
          <SidebarItem 
            icon={<BarChart3 size={20} />} 
            label="Analytics" 
            active={activeTab === DashboardTab.ANALYTICS}
            onClick={() => setActiveTab(DashboardTab.ANALYTICS)}
          />
        </nav>

        <div className="p-4 border-t border-slate-100">
          <SidebarItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            active={activeTab === DashboardTab.SETTINGS}
            onClick={() => setActiveTab(DashboardTab.SETTINGS)}
          />
          <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 transition-colors mt-1">
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
          <div className="flex items-center bg-slate-100 px-3 py-1.5 rounded-md border border-slate-200 w-96">
            <Search size={18} className="text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Search data, logs, or reports..." 
              className="bg-transparent border-none text-sm focus:outline-none w-full text-slate-900"
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-slate-900 rounded-full hover:bg-slate-100 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-right">
                <p className="text-sm font-medium text-slate-900">Alex Rivers</p>
                <p className="text-xs text-slate-500">Administrator</p>
              </div>
              <img 
                src="https://picsum.photos/seed/alex/40/40" 
                className="w-9 h-9 rounded-full ring-2 ring-transparent group-hover:ring-blue-100 transition-all"
                alt="Profile"
              />
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;

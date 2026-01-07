
import React, { useState, useMemo } from 'react';
import { 
  ChevronDown, 
  MoreHorizontal, 
  Trash2, 
  Archive, 
  CheckCircle2,
  Clock,
  ExternalLink,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Project } from '../types';

interface DataTableProps {
  data: Project[];
  isLoading: boolean;
}

const DataTable: React.FC<DataTableProps> = ({ data, isLoading }) => {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredData = useMemo(() => {
    return data.filter(item => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.owner.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const toggleAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      setSelectedRows(new Set(paginatedData.map(r => r.id)));
    }
  };

  const toggleRow = (id: string) => {
    const newSet = new Set(selectedRows);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setSelectedRows(newSet);
  };

  if (isLoading) {
    return (
      <div className="p-8 space-y-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-12 bg-slate-50 animate-pulse rounded-md w-full"></div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Search & Bulk Actions Bar */}
      <div className="px-6 py-4 flex items-center justify-between bg-slate-50/50 border-b border-slate-100">
        <input 
          type="text" 
          placeholder="Filter projects..."
          className="bg-white border border-slate-200 text-sm px-3 py-1.5 rounded-lg w-64 focus:outline-none focus:ring-2 focus:ring-blue-100 transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        
        {selectedRows.size > 0 && (
          <div className="flex items-center gap-2 animate-in fade-in slide-in-from-right-4">
            <span className="text-xs font-medium text-slate-500 mr-2">{selectedRows.size} selected</span>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-600 bg-white border border-slate-200 rounded-md hover:bg-slate-50">
              <Archive size={14} />
              Archive
            </button>
            <button className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-red-600 bg-white border border-slate-200 rounded-md hover:bg-red-50">
              <Trash2 size={14} />
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-100">
              <th className="px-6 py-4 w-12">
                <input 
                  type="checkbox" 
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                  checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                  onChange={toggleAll}
                />
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider cursor-pointer hover:text-slate-900 transition-colors">
                <div className="flex items-center gap-1">Project Name <ChevronDown size={14} /></div>
              </th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Owner</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Budget</th>
              <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Progress</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {paginatedData.map((project) => (
              <tr 
                key={project.id} 
                className={`group hover:bg-slate-50/80 transition-colors ${selectedRows.has(project.id) ? 'bg-blue-50/30' : ''}`}
              >
                <td className="px-6 py-4">
                  <input 
                    type="checkbox" 
                    className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                    checked={selectedRows.has(project.id)}
                    onChange={() => toggleRow(project.id)}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-slate-900">{project.name}</span>
                    <span className="text-xs text-slate-400">Updated {project.lastUpdated}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                    project.status === 'Active' ? 'bg-emerald-50 text-emerald-700' :
                    project.status === 'Paused' ? 'bg-amber-50 text-amber-700' :
                    'bg-slate-100 text-slate-600'
                  }`}>
                    {project.status === 'Active' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                    {project.status}
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{project.owner}</td>
                <td className="px-6 py-4 text-sm font-medium text-slate-900">${project.budget.toLocaleString()}</td>
                <td className="px-6 py-4 w-48">
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-blue-500 transition-all duration-500" 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs font-semibold text-slate-500">{project.progress}%</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-1.5 text-slate-400 hover:text-blue-600 rounded hover:bg-blue-50">
                      <ExternalLink size={16} />
                    </button>
                    <button className="p-1.5 text-slate-400 hover:text-slate-600 rounded hover:bg-slate-100">
                      <MoreHorizontal size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-white">
        <span className="text-xs text-slate-500">
          Showing <span className="font-semibold text-slate-900">{(currentPage - 1) * itemsPerPage + 1}</span> to <span className="font-semibold text-slate-900">{Math.min(currentPage * itemsPerPage, filteredData.length)}</span> of <span className="font-semibold text-slate-900">{filteredData.length}</span> results
        </span>
        <div className="flex items-center gap-2">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
            className="p-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronLeft size={16} />
          </button>
          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded text-xs font-semibold transition-colors ${
                  currentPage === i + 1 
                    ? 'bg-blue-600 text-white' 
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <button 
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
            className="p-1.5 rounded border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-30 disabled:hover:bg-transparent"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default DataTable;

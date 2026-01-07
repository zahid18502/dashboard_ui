
import { Project, ChartData } from '../types';

export const getMockProjects = (): Project[] => [
  { id: '1', name: 'Cloud Migration Sync', status: 'Active', budget: 120000, progress: 65, lastUpdated: '2h ago', owner: 'Sarah Chen' },
  { id: '2', name: 'Global CDN Overhaul', status: 'Paused', budget: 45000, progress: 12, lastUpdated: '1d ago', owner: 'Marcus Wright' },
  { id: '3', name: 'Legacy API Deprecation', status: 'Active', budget: 85000, progress: 88, lastUpdated: '4h ago', owner: 'Alex Rivers' },
  { id: '4', name: 'Security Audit Q3', status: 'Archived', budget: 22000, progress: 100, lastUpdated: '2w ago', owner: 'Sarah Chen' },
  { id: '5', name: 'Mobile App Refresh', status: 'Active', budget: 67000, progress: 45, lastUpdated: '1h ago', owner: 'Alex Rivers' },
  { id: '6', name: 'Enterprise Data Lake', status: 'Active', budget: 250000, progress: 30, lastUpdated: '10m ago', owner: 'Sarah Chen' },
  { id: '7', name: 'SRE Onboarding Tool', status: 'Paused', budget: 15000, progress: 5, lastUpdated: '3d ago', owner: 'Marcus Wright' },
  { id: '8', name: 'User Privacy Shield', status: 'Active', budget: 110000, progress: 72, lastUpdated: '6h ago', owner: 'Alex Rivers' },
  { id: '9', name: 'Vector Search Engine', status: 'Active', budget: 95000, progress: 20, lastUpdated: 'Yesterday', owner: 'Sarah Chen' },
];

export const getChartData = (): ChartData[] => [
  { name: 'Jan', revenue: 4000, expenses: 2400 },
  { name: 'Feb', revenue: 3000, expenses: 1398 },
  { name: 'Mar', revenue: 2000, expenses: 9800 },
  { name: 'Apr', revenue: 2780, expenses: 3908 },
  { name: 'May', revenue: 1890, expenses: 4800 },
  { name: 'Jun', revenue: 2390, expenses: 3800 },
  { name: 'Jul', revenue: 3490, expenses: 4300 },
];

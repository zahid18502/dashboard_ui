
export interface Project {
  id: string;
  name: string;
  status: 'Active' | 'Paused' | 'Archived';
  budget: number;
  progress: number;
  lastUpdated: string;
  owner: string;
}

export interface Metric {
  label: string;
  value: string;
  change: number;
  trend: 'up' | 'down' | 'neutral';
}

export interface ChartData {
  name: string;
  revenue: number;
  expenses: number;
}

export enum DashboardTab {
  OVERVIEW = 'overview',
  PROJECTS = 'projects',
  ANALYTICS = 'analytics',
  SETTINGS = 'settings'
}

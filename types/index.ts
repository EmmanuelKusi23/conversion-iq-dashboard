// Agent Types
export type AgentType =
  | 'marketing'
  | 'strategy'
  | 'operations'
  | 'account'
  | 'financial'
  | 'analytics';

export interface Agent {
  id: AgentType;
  name: string;
  icon: string;
  description: string;
  color: string;
  status: 'active' | 'idle' | 'warning' | 'error';
}

// Marketing Agent Types
export interface Campaign {
  id: string;
  name: string;
  platform: 'Meta' | 'Google' | 'TikTok';
  status: 'active' | 'paused' | 'ended';
  budget: number;
  spent: number;
  roas: number;
  cpa: number;
  ctr: number;
  conversions: number;
  startDate: Date;
  endDate?: Date;
}

export interface Creative {
  id: string;
  campaignId: string;
  type: 'image' | 'video' | 'carousel';
  url: string;
  performance: 'high' | 'medium' | 'low';
  impressions: number;
  clicks: number;
  conversions: number;
}

// Strategy Agent Types
export interface StrategyInsight {
  id: string;
  title: string;
  description: string;
  type: 'opportunity' | 'threat' | 'trend';
  priority: 'high' | 'medium' | 'low';
  actionItems: string[];
  date: Date;
}

export interface KPI {
  name: string;
  value: number;
  target: number;
  trend: 'up' | 'down' | 'stable';
  unit: string;
}

// Operations Agent Types
export interface Task {
  id: string;
  title: string;
  description: string;
  assignee: string;
  status: 'todo' | 'in-progress' | 'completed' | 'blocked';
  priority: 'high' | 'medium' | 'low';
  dueDate: Date;
  tags: string[];
}

export interface SOP {
  id: string;
  title: string;
  category: string;
  lastUpdated: Date;
  compliance: number;
}

// Account Management Types
export interface Client {
  id: string;
  name: string;
  logo?: string;
  industry: string;
  status: 'active' | 'onboarding' | 'churned';
  monthlyRevenue: number;
  startDate: Date;
  kpis: {
    installs: number;
    retention: number;
    clv: number;
  };
  nextReportDate: Date;
}

// Financial Operations Types
export interface Invoice {
  id: string;
  clientId: string;
  clientName: string;
  amount: number;
  currency: 'GHS' | 'USD';
  status: 'draft' | 'sent' | 'paid' | 'overdue';
  dueDate: Date;
  paidDate?: Date;
  type: 'monthly' | 'success-fee' | 'bonus';
}

export interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  method: 'MTN MoMo' | 'Vodafone Cash' | 'AirtelTigo' | 'Bank Transfer' | 'Card';
  status: 'pending' | 'completed' | 'failed';
  date: Date;
  reference: string;
}

// Analytics Types
export interface Metric {
  name: string;
  value: number;
  change: number;
  period: 'daily' | 'weekly' | 'monthly';
}

export interface ChartData {
  date: string;
  value: number;
  category?: string;
}

// Dashboard State Types
export interface DashboardState {
  activeAgent: AgentType | null;
  dateRange: {
    start: Date;
    end: Date;
  };
  filters: Record<string, any>;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: Date;
}

// Ghana-specific Types
export interface GhanaCompliance {
  gra: {
    lastFiling: Date;
    nextDue: Date;
    status: 'compliant' | 'pending' | 'overdue';
  };
  ssnit: {
    lastContribution: Date;
    amount: number;
    status: 'compliant' | 'pending' | 'overdue';
  };
  registrarGeneral: {
    lastRenewal: Date;
    nextDue: Date;
    status: 'active' | 'pending' | 'expired';
  };
}

// Team & Collaboration Types
export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'admin' | 'member' | 'viewer';
  department: 'marketing' | 'strategy' | 'operations' | 'account' | 'financial' | 'analytics';
  status: 'active' | 'invited' | 'inactive';
  joinedDate: Date;
  lastActive?: Date;
}

export interface Workspace {
  id: string;
  name: string;
  icon: string;
  members: TeamMember[];
  createdDate: Date;
  plan: 'free' | 'pro' | 'enterprise';
}

// Calendar & Events Types
export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  type: 'deadline' | 'meeting' | 'campaign-launch' | 'report-due' | 'compliance';
  startDate: Date;
  endDate?: Date;
  assignedTo: string[];
  agentId?: AgentType;
  priority: 'high' | 'medium' | 'low';
  status: 'upcoming' | 'in-progress' | 'completed' | 'overdue';
  reminders: number[]; // minutes before event
}

// Zoom Integration Types
export interface ZoomMeeting {
  id: string;
  topic: string;
  description?: string;
  startTime: Date;
  duration: number; // minutes
  joinUrl: string;
  password?: string;
  hostId: string;
  participants: string[];
  agendaItems?: string[];
  recordingUrl?: string;
  status: 'scheduled' | 'started' | 'ended';
}

// Activity & Notifications Types
export interface Activity {
  id: string;
  type: 'comment' | 'edit' | 'invite' | 'campaign' | 'invoice' | 'meeting';
  userId: string;
  userName: string;
  userAvatar?: string;
  action: string;
  target: string;
  timestamp: Date;
  agentId?: AgentType;
}

export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  timestamp: Date;
  actionUrl?: string;
}

// View Types
export type ViewType = 'dashboard' | 'calendar' | 'team' | 'settings' | AgentType;

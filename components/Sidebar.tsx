'use client';

import { useState } from 'react';
import { ViewType, AgentType, TeamMember } from '@/types';
import {
  Home,
  Calendar,
  Users,
  TrendingUp,
  Compass,
  Settings as SettingsIcon,
  DollarSign,
  BarChart3,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
  Briefcase
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onInviteMember: () => void;
  teamMembers: TeamMember[];
}

export default function Sidebar({ currentView, onViewChange, onInviteMember, teamMembers }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const agents = [
    { id: 'marketing' as AgentType, name: 'Marketing', icon: TrendingUp, color: '#3b82f6' },
    { id: 'strategy' as AgentType, name: 'Strategy', icon: Compass, color: '#8b5cf6' },
    { id: 'operations' as AgentType, name: 'Operations', icon: SettingsIcon, color: '#10b981' },
    { id: 'account' as AgentType, name: 'Accounts', icon: Briefcase, color: '#f59e0b' },
    { id: 'financial' as AgentType, name: 'Financial', icon: DollarSign, color: '#eab308' },
    { id: 'analytics' as AgentType, name: 'Analytics', icon: BarChart3, color: '#6366f1' },
  ];

  const mainNavItems = [
    { id: 'dashboard' as ViewType, name: 'Home', icon: Home },
    { id: 'calendar' as ViewType, name: 'Calendar', icon: Calendar },
    { id: 'team' as ViewType, name: 'Team', icon: Users },
  ];

  const activeMembers = teamMembers.filter(m => m.status === 'active' && m.lastActive);

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-white border-r border-gray-200 transition-all duration-300 z-40 shadow-sm ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Workspace Header */}
      <div className="h-14 border-b border-gray-100 flex items-center justify-between px-4">
        {!isCollapsed && (
          <div className="flex items-center gap-3 flex-1">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm">
              CQ
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-bold text-sm text-gray-900 truncate">
                Conversion IQ
              </h1>
              <p className="text-xs text-gray-500 truncate">Ghana Operations</p>
            </div>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 hover:bg-gray-100 rounded-md transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4 text-gray-600" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-gray-600" />
          )}
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="overflow-y-auto h-[calc(100vh-3.5rem)] pb-4">
        {/* Main Navigation */}
        <nav className="px-2 py-3 space-y-1">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentView === item.id
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
                title={isCollapsed ? item.name : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!isCollapsed && <span>{item.name}</span>}
              </button>
            );
          })}
        </nav>

        {/* Divider */}
        <div className="my-3 border-t border-gray-100 mx-2" />

        {/* Agents Section */}
        <div className="px-2">
          {!isCollapsed && (
            <h3 className="px-3 mb-2 text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Agents
            </h3>
          )}
          <nav className="space-y-1">
            {agents.map((agent) => {
              const Icon = agent.icon;
              return (
                <button
                  key={agent.id}
                  onClick={() => onViewChange(agent.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentView === agent.id
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  title={isCollapsed ? agent.name : undefined}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" style={{ color: currentView === agent.id ? agent.color : undefined }} />
                  {!isCollapsed && <span>{agent.name}</span>}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Divider */}
        <div className="my-3 border-t border-gray-100 mx-2" />

        {/* Active Team Members */}
        {!isCollapsed && activeMembers.length > 0 && (
          <div className="px-2">
            <div className="flex items-center justify-between px-3 mb-2">
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                Active Now
              </h3>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
            <div className="space-y-1">
              {activeMembers.slice(0, 5).map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="relative">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 flex items-center justify-center text-white text-xs font-semibold">
                      {member.name.charAt(0)}
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
                  </div>
                  <span className="text-sm font-medium text-gray-700 truncate flex-1">
                    {member.name.split(' ')[0]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bottom Actions */}
        <div className="mt-4 px-2 space-y-1">
          <button
            onClick={onInviteMember}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors"
            title={isCollapsed ? 'Invite Member' : undefined}
          >
            <UserPlus className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Invite Member</span>}
          </button>
          <button
            onClick={() => onViewChange('settings')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
              currentView === 'settings'
                ? 'bg-indigo-50 text-indigo-700'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
            title={isCollapsed ? 'Settings' : undefined}
          >
            <SettingsIcon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && <span>Settings</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}

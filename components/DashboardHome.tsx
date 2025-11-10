'use client';

import { Agent, Activity } from '@/types';
import { format } from 'date-fns';

interface DashboardHomeProps {
  agents: Agent[];
  activities: Activity[];
  onAgentClick: (agentId: string) => void;
}

export default function DashboardHome({ agents, activities, onAgentClick }: DashboardHomeProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Good morning, Team 👋
        </h1>
        <p className="text-lg text-gray-600">
          {format(new Date(), 'EEEE, MMMM d, yyyy')}
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="text-4xl">📈</div>
            <div className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
              +12%
            </div>
          </div>
          <div className="text-sm font-semibold text-gray-600 mb-1">Active Campaigns</div>
          <div className="text-3xl font-bold text-gray-900">12</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="text-4xl">💰</div>
            <div className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
              +8%
            </div>
          </div>
          <div className="text-sm font-semibold text-gray-600 mb-1">Monthly Revenue</div>
          <div className="text-3xl font-bold text-gray-900">GHS 45K</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="text-4xl">🎯</div>
            <div className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
              3.8x
            </div>
          </div>
          <div className="text-sm font-semibold text-gray-600 mb-1">Avg ROAS</div>
          <div className="text-3xl font-bold text-gray-900">3.8x</div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between mb-3">
            <div className="text-4xl">👥</div>
            <div className="px-2.5 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold">
              8
            </div>
          </div>
          <div className="text-sm font-semibold text-gray-600 mb-1">Active Clients</div>
          <div className="text-3xl font-bold text-gray-900">8</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1">
        {/* Agents Grid */}
        <div className="lg:col-span-2">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Agents</h2>
            <p className="text-sm text-gray-600">
              Specialized tools for each business function
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {agents.map((agent) => {
              const statusColors = {
                active: 'bg-green-500',
                idle: 'bg-gray-400',
                warning: 'bg-yellow-500',
                error: 'bg-red-500',
              };

              return (
                <button
                  key={agent.id}
                  onClick={() => onAgentClick(agent.id)}
                  className="group bg-white rounded-xl border-2 border-gray-200 p-6 hover:border-indigo-500 hover:shadow-xl transition-all text-left"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{agent.icon}</div>
                    <div className={`w-3 h-3 rounded-full ${statusColors[agent.status]} animate-pulse`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {agent.description}
                  </p>
                  <div className="mt-4 flex items-center text-sm font-semibold text-indigo-600">
                    <span>Open</span>
                    <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Recent Activity</h3>
              <button className="text-sm font-semibold text-indigo-600 hover:underline">
                View all
              </button>
            </div>

            <div className="space-y-4">
              {activities.slice(0, 8).map((activity) => {
                const typeIcons = {
                  comment: '💬',
                  edit: '✏️',
                  invite: '📧',
                  campaign: '📈',
                  invoice: '💰',
                  meeting: '📅',
                };

                return (
                  <div key={activity.id} className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                      {activity.userName.charAt(0)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-900 leading-relaxed">
                        <span className="font-bold">{activity.userName}</span>{' '}
                        <span className="text-gray-600">{activity.action}</span>{' '}
                        <span className="font-semibold">{activity.target}</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {format(new Date(activity.timestamp), 'MMM d, h:mm a')}
                      </p>
                    </div>
                    <div className="text-lg">{typeIcons[activity.type]}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
            <h3 className="text-lg font-bold mb-3">🚀 Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-4 py-3 text-left font-semibold transition-colors">
                <div className="flex items-center justify-between">
                  <span>Create Campaign</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </button>
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-4 py-3 text-left font-semibold transition-colors">
                <div className="flex items-center justify-between">
                  <span>Generate Report</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </button>
              <button className="w-full bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg px-4 py-3 text-left font-semibold transition-colors">
                <div className="flex items-center justify-between">
                  <span>Schedule Meeting</span>
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

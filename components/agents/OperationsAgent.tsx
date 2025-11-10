'use client';

import { Task, SOP } from '@/types';

const mockTasks: Task[] = [
  {
    id: '1',
    title: 'Review SwiftPay campaign creatives',
    description: 'Review and approve 5 new UGC videos for TikTok campaign',
    assignee: 'Creative Team',
    status: 'in-progress',
    priority: 'high',
    dueDate: new Date('2025-02-01'),
    tags: ['marketing', 'creative', 'urgent'],
  },
  {
    id: '2',
    title: 'Update client reporting template',
    description: 'Add new ROAS metrics and Ghana-specific insights section',
    assignee: 'Account Manager',
    status: 'todo',
    priority: 'medium',
    dueDate: new Date('2025-02-03'),
    tags: ['reporting', 'client'],
  },
  {
    id: '3',
    title: 'Onboard new freelance media buyer',
    description: 'Complete training on Meta Ads Manager and internal SOPs',
    assignee: 'Operations Lead',
    status: 'completed',
    priority: 'high',
    dueDate: new Date('2025-01-29'),
    tags: ['onboarding', 'training'],
  },
  {
    id: '4',
    title: 'Coordinate with influencer @KofiGH',
    description: 'Finalize content calendar and payment terms for Q1',
    assignee: 'Influencer Manager',
    status: 'blocked',
    priority: 'high',
    dueDate: new Date('2025-01-31'),
    tags: ['influencer', 'payment'],
  },
];

const mockSOPs: SOP[] = [
  { id: '1', title: 'Campaign Launch Checklist', category: 'Marketing', lastUpdated: new Date('2025-01-15'), compliance: 95 },
  { id: '2', title: 'Client Onboarding Process', category: 'Account Management', lastUpdated: new Date('2025-01-10'), compliance: 88 },
  { id: '3', title: 'Monthly Reporting SOP', category: 'Analytics', lastUpdated: new Date('2025-01-20'), compliance: 100 },
  { id: '4', title: 'Payment & Invoicing Workflow', category: 'Finance', lastUpdated: new Date('2025-01-25'), compliance: 92 },
];

export default function OperationsAgent() {
  return (
    <div className="space-y-6">
      {/* Task Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Tasks</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{mockTasks.length}</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">In Progress</div>
          <div className="text-2xl font-bold text-blue-600">
            {mockTasks.filter(t => t.status === 'in-progress').length}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">Completed</div>
          <div className="text-2xl font-bold text-green-600">
            {mockTasks.filter(t => t.status === 'completed').length}
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">Blocked</div>
          <div className="text-2xl font-bold text-red-600">
            {mockTasks.filter(t => t.status === 'blocked').length}
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Task Management</h3>
        </div>
        <div className="p-4 space-y-3">
          {mockTasks.map((task) => {
            const statusColors = {
              'todo': 'bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300',
              'in-progress': 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
              'completed': 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
              'blocked': 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
            };

            const priorityColors = {
              'high': 'text-red-600',
              'medium': 'text-yellow-600',
              'low': 'text-green-600',
            };

            return (
              <div
                key={task.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{task.title}</h4>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded ${statusColors[task.status]}`}>
                        {task.status.replace('-', ' ')}
                      </span>
                      <span className={`text-xs font-bold ${priorityColors[task.priority]}`}>
                        {task.priority.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{task.description}</p>
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className="text-gray-500">👤 {task.assignee}</span>
                      <span className="text-gray-500">📅 Due: {task.dueDate.toLocaleDateString()}</span>
                      <div className="flex gap-1">
                        {task.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* SOP Compliance */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">SOP Compliance</h3>
        </div>
        <div className="p-4 space-y-4">
          {mockSOPs.map((sop) => (
            <div key={sop.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{sop.title}</h4>
                  <p className="text-xs text-gray-500">
                    {sop.category} • Updated {sop.lastUpdated.toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${
                    sop.compliance >= 95 ? 'text-green-600' :
                    sop.compliance >= 80 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {sop.compliance}%
                  </div>
                  <div className="text-xs text-gray-500">Compliance</div>
                </div>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${
                    sop.compliance >= 95 ? 'bg-green-500' :
                    sop.compliance >= 80 ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${sop.compliance}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Team Coordination */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">👥</div>
          <div>
            <h4 className="font-semibold text-purple-900 dark:text-purple-200 mb-2">
              Team Coordination Hub
            </h4>
            <div className="space-y-1 text-sm text-purple-800 dark:text-purple-300">
              <p>• 3 team members online now</p>
              <p>• Next standup: Tomorrow at 9:00 AM</p>
              <p>• 2 pending approvals from Creative Team</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

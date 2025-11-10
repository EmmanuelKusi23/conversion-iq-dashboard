'use client';

import { Client } from '@/types';

const mockClients: Client[] = [
  {
    id: '1',
    name: 'SwiftPay',
    industry: 'FinTech',
    status: 'active',
    monthlyRevenue: 12000,
    startDate: new Date('2024-09-01'),
    kpis: {
      installs: 45200,
      retention: 41,
      clv: 87.5,
    },
    nextReportDate: new Date('2025-02-05'),
  },
  {
    id: '2',
    name: 'EduConnect Ghana',
    industry: 'EdTech',
    status: 'active',
    monthlyRevenue: 8500,
    startDate: new Date('2024-11-15'),
    kpis: {
      installs: 28400,
      retention: 38,
      clv: 62.3,
    },
    nextReportDate: new Date('2025-02-08'),
  },
  {
    id: '3',
    name: 'AgriTrade Platform',
    industry: 'Agriculture',
    status: 'onboarding',
    monthlyRevenue: 0,
    startDate: new Date('2025-01-20'),
    kpis: {
      installs: 0,
      retention: 0,
      clv: 0,
    },
    nextReportDate: new Date('2025-02-20'),
  },
  {
    id: '4',
    name: 'HealthHub GH',
    industry: 'HealthTech',
    status: 'active',
    monthlyRevenue: 6800,
    startDate: new Date('2024-10-10'),
    kpis: {
      installs: 19800,
      retention: 35,
      clv: 54.2,
    },
    nextReportDate: new Date('2025-02-06'),
  },
];

export default function AccountAgent() {
  const totalRevenue = mockClients.reduce((sum, c) => sum + c.monthlyRevenue, 0);
  const activeClients = mockClients.filter(c => c.status === 'active').length;
  const totalInstalls = mockClients.reduce((sum, c) => sum + c.kpis.installs, 0);
  const avgRetention = mockClients
    .filter(c => c.status === 'active')
    .reduce((sum, c) => sum + c.kpis.retention, 0) / activeClients;

  return (
    <div className="space-y-6">
      {/* Client Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Clients</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">{mockClients.length}</div>
          <div className="text-xs text-green-600">{activeClients} active</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">Monthly Revenue</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            GHS {totalRevenue.toLocaleString()}
          </div>
          <div className="text-xs text-green-600">+15% MoM</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">Total Installs</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {totalInstalls.toLocaleString()}
          </div>
          <div className="text-xs text-gray-600">Across all clients</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">Avg Retention</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {avgRetention.toFixed(0)}%
          </div>
          <div className="text-xs text-gray-600">Day-7 retention</div>
        </div>
      </div>

      {/* Client Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockClients.map((client) => {
          const statusColors = {
            active: 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300',
            onboarding: 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300',
            churned: 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300',
          };

          return (
            <div
              key={client.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700"
            >
              {/* Client Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-ciq-primary to-ciq-secondary rounded-lg flex items-center justify-center text-white font-bold text-lg">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {client.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{client.industry}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded capitalize ${statusColors[client.status]}`}>
                  {client.status}
                </span>
              </div>

              {/* KPIs */}
              {client.status === 'active' && (
                <div className="grid grid-cols-3 gap-3 mb-4">
                  <div className="text-center">
                    <div className="text-xs text-gray-600 dark:text-gray-400">Installs</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {client.kpis.installs.toLocaleString()}
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 dark:text-gray-400">Retention</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      {client.kpis.retention}%
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-xs text-gray-600 dark:text-gray-400">CLV</div>
                    <div className="text-lg font-bold text-gray-900 dark:text-white">
                      GHS {client.kpis.clv}
                    </div>
                  </div>
                </div>
              )}

              {/* Details */}
              <div className="space-y-2 text-sm border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Monthly Revenue:</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    GHS {client.monthlyRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Client Since:</span>
                  <span className="text-gray-900 dark:text-white">
                    {client.startDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Next Report:</span>
                  <span className="text-gray-900 dark:text-white">
                    {client.nextReportDate.toLocaleDateString()}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-2 px-3 bg-ciq-primary hover:bg-ciq-primary/90 text-white rounded-lg text-sm font-medium transition-colors">
                  View Report
                </button>
                <button className="flex-1 py-2 px-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-lg text-sm font-medium transition-colors">
                  Contact
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upcoming Reports */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Upcoming Client Reports
        </h3>
        <div className="space-y-3">
          {mockClients
            .filter(c => c.status === 'active')
            .sort((a, b) => a.nextReportDate.getTime() - b.nextReportDate.getTime())
            .map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-ciq-primary to-ciq-secondary rounded-lg flex items-center justify-center text-white font-bold">
                    {client.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white">{client.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Due: {client.nextReportDate.toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <button className="px-4 py-2 bg-ciq-primary hover:bg-ciq-primary/90 text-white rounded-lg text-sm font-medium transition-colors">
                  Generate
                </button>
              </div>
            ))}
        </div>
      </div>

      {/* Success Metrics */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
        <div className="flex items-start space-x-3">
          <div className="text-2xl">🎯</div>
          <div>
            <h4 className="font-semibold text-green-900 dark:text-green-200 mb-2">
              Success Metrics This Month
            </h4>
            <div className="space-y-1 text-sm text-green-800 dark:text-green-300">
              <p>• 100% on-time report delivery</p>
              <p>• Avg client satisfaction: 4.8/5</p>
              <p>• 2 upsell opportunities identified</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { Campaign } from '@/types';

// Mock data - replace with API calls
const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'SwiftPay App Install Campaign',
    platform: 'Meta',
    status: 'active',
    budget: 5000,
    spent: 3200,
    roas: 4.2,
    cpa: 12.5,
    ctr: 3.8,
    conversions: 256,
    startDate: new Date('2025-01-15'),
  },
  {
    id: '2',
    name: 'TikTok UGC Creator Campaign',
    platform: 'TikTok',
    status: 'active',
    budget: 3000,
    spent: 1800,
    roas: 3.6,
    cpa: 15.2,
    ctr: 4.2,
    conversions: 118,
    startDate: new Date('2025-01-20'),
  },
  {
    id: '3',
    name: 'Google Search - Finance Keywords',
    platform: 'Google',
    status: 'active',
    budget: 4000,
    spent: 2500,
    roas: 5.1,
    cpa: 9.8,
    ctr: 5.5,
    conversions: 255,
    startDate: new Date('2025-01-10'),
  },
];

export default function MarketingAgent() {
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | 'Meta' | 'Google' | 'TikTok'>('all');

  const filteredCampaigns = selectedPlatform === 'all'
    ? mockCampaigns
    : mockCampaigns.filter(c => c.platform === selectedPlatform);

  const totalSpend = mockCampaigns.reduce((sum, c) => sum + c.spent, 0);
  const avgROAS = mockCampaigns.reduce((sum, c) => sum + c.roas, 0) / mockCampaigns.length;
  const totalConversions = mockCampaigns.reduce((sum, c) => sum + c.conversions, 0);

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Spend</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            GHS {totalSpend.toLocaleString()}
          </div>
          <div className="text-xs text-gray-500 mt-1">This month</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Avg ROAS</div>
          <div className="text-2xl font-bold text-green-600">
            {avgROAS.toFixed(1)}x
          </div>
          <div className="text-xs text-gray-500 mt-1">+0.3 from last week</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Conversions</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {totalConversions}
          </div>
          <div className="text-xs text-gray-500 mt-1">+18% vs last month</div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Active Campaigns</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            {mockCampaigns.filter(c => c.status === 'active').length}
          </div>
          <div className="text-xs text-gray-500 mt-1">Across 3 platforms</div>
        </div>
      </div>

      {/* Platform Filter */}
      <div className="flex flex-wrap gap-2">
        {['all', 'Meta', 'Google', 'TikTok'].map((platform) => (
          <button
            key={platform}
            onClick={() => setSelectedPlatform(platform as any)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              selectedPlatform === platform
                ? 'bg-ciq-primary text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            {platform === 'all' ? 'All Platforms' : platform}
          </button>
        ))}
      </div>

      {/* Campaigns Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Active Campaigns</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Campaign
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Platform
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Budget
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Spent
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  ROAS
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  CPA
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  CTR
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Conversions
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredCampaigns.map((campaign) => (
                <tr key={campaign.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-4 py-4">
                    <div className="font-medium text-gray-900 dark:text-white">{campaign.name}</div>
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded">
                      {campaign.platform}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                    GHS {campaign.budget.toLocaleString()}
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-sm text-gray-900 dark:text-white">
                      GHS {campaign.spent.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500">
                      {((campaign.spent / campaign.budget) * 100).toFixed(0)}% used
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`text-sm font-semibold ${
                      campaign.roas >= 4 ? 'text-green-600' : campaign.roas >= 2 ? 'text-yellow-600' : 'text-red-600'
                    }`}>
                      {campaign.roas.toFixed(1)}x
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                    GHS {campaign.cpa.toFixed(2)}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900 dark:text-white">
                    {campaign.ctr.toFixed(1)}%
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900 dark:text-white">
                    {campaign.conversions}
                  </td>
                  <td className="px-4 py-4">
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 rounded capitalize">
                      {campaign.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Alerts */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <div className="flex items-start">
          <div className="text-2xl mr-3">⚠️</div>
          <div>
            <h4 className="font-semibold text-yellow-900 dark:text-yellow-200 mb-1">
              Performance Alert
            </h4>
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              2 creatives in "SwiftPay App Install Campaign" are underperforming. Consider replacing with new UGC content.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
